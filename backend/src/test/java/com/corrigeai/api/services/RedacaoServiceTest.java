package com.corrigeai.api.services;

import com.corrigeai.api.models.Redacao;
import com.corrigeai.api.repositories.RedacaoRepository;
import com.corrigeai.api.dtos.AvaliacaoResultadoDTO; 
import com.fasterxml.jackson.databind.ObjectMapper;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any; 
import static org.mockito.ArgumentMatchers.eq; 

@ExtendWith(MockitoExtension.class)
class RedacaoServiceTest {
    
    @Mock
    private RedacaoRepository redacaoRepository;

    @Mock
    private GeminiAIService geminiService;

    @Mock
    private ObjectMapper objectMapper;

    @InjectMocks
    private RedacaoService redacaoService;

    private final String MOCK_JSON_IA = "{\"pontuacao_total\":920,\"feedback_geral\":\"Excelente redacao...\",\"detalhamento_competencias\":[],\"pontos_fortes\":[\"Forte 1\"],\"pontos_melhoria\":[\"Melhoria 1\"]}";
   
   
    @Test
    void testProcessarEavaliarRedacao_Sucesso() throws Exception {
        
        String conteudo = "Minha redação para o teste.";
        String userId = "user123";

        Redacao redacaoSalvaInicialmente = new Redacao(userId, conteudo, "Titulo Teste", "Tema Teste", "PENDENTE", null, null, null, null, null);
        redacaoSalvaInicialmente.setId("ID_FICTICIO"); 
        
        AvaliacaoResultadoDTO resultadoSimulado = new AvaliacaoResultadoDTO(920, "Excelente redacao...", Collections.emptyList(), List.of("Forte 1"), List.of("Melhoria 1"));

       
        Mockito.when(redacaoRepository.save(any(Redacao.class)))
               .thenReturn(redacaoSalvaInicialmente);

     
        Mockito.when(geminiService.avaliarRedacao(conteudo))
               .thenReturn(MOCK_JSON_IA);

   
        Mockito.when(objectMapper.readValue(
               eq(MOCK_JSON_IA), 
               any(Class.class)) 
        )
        .thenReturn(resultadoSimulado);
        
        Mockito.when(redacaoRepository.save(Mockito.argThat(r -> r.getStatus().equals("CORRIGIDA"))))
               .thenReturn(redacaoSalvaInicialmente); 

        Redacao resultadoFinal = redacaoService.processarEavaliarRedacao(conteudo, userId, "Titulo Teste", "Tema Teste");

        assertEquals("CORRIGIDA", resultadoFinal.getStatus(), "O status deve ser 'CORRIGIDA'");
        assertEquals(920, resultadoFinal.getPontuacaoTotal(), "A pontuação deve ser a do DTO simulado");
        assertEquals(List.of("Forte 1"), resultadoFinal.getPontosFortes(), "Pontos fortes devem coincidir");
        assertEquals(List.of("Melhoria 1"), resultadoFinal.getPontosMelhoria(), "Pontos de melhoria devem coincidir");
        
        Mockito.verify(objectMapper, Mockito.times(1)).readValue(
            any(String.class), 
            eq(AvaliacaoResultadoDTO.class) 
        );
        
        Mockito.verify(redacaoRepository, Mockito.times(2)).save(any(Redacao.class));
        Mockito.verify(geminiService, Mockito.times(1)).avaliarRedacao(conteudo);
    }

    @Test
    void testProcessarEavaliarRedacao_ConteudoVazio_DeveLancarExcecao() throws Exception {
        String conteudo = "";
        String userId = "user123";

        Exception exception = assertThrows(IllegalArgumentException.class, () -> {
            redacaoService.processarEavaliarRedacao(conteudo, userId, "Titulo", "Tema");
        });

        assertTrue(exception.getMessage().contains("Conteúdo da redação não pode ser vazio"));
        
        Mockito.verify(redacaoRepository, Mockito.never()).save(any());
        Mockito.verify(geminiService, Mockito.never()).avaliarRedacao(any());
        Mockito.verify(objectMapper, Mockito.never()).readValue(any(String.class), any(Class.class));
    }
}