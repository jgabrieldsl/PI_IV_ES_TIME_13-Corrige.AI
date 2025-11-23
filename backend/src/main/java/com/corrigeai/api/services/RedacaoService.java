package com.corrigeai.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper; 
import java.util.Date;
import java.util.List;

// ⚠️ Não é necessário importar o GeminiAIService aqui se ele estiver no mesmo pacote 'services'
// Se o VS Code/IDE exigir o import, use: import com.corrigeai.api.services.GeminiAIService; 

import com.corrigeai.api.models.Redacao;
import com.corrigeai.api.repositories.RedacaoRepository;
import com.corrigeai.api.dtos.AvaliacaoResultadoDTO; 

@Service
public class RedacaoService {

    @Autowired
    private RedacaoRepository redacaoRepository; 

    @Autowired // ⬅️ Injeção do Serviço da IA
    private GeminiAIService geminiService; // Spring encontrará a classe no mesmo pacote

    /**
     * Inicia o processo: salva, chama a IA para avaliar e atualiza.
     */
    public Redacao processarEavaliarRedacao(String conteudo, String userId) throws Exception {
        if(conteudo == null || conteudo.trim().isEmpty()) {
            throw new IllegalArgumentException("Conteúdo da redação não pode ser vazio");
        }

        // 1. Salva a Redação inicialmente (Status: PENDENTE)
        Redacao novaRedacao = new Redacao();
        novaRedacao.setConteudo(conteudo);
        novaRedacao.setStatus("PENDENTE");
        novaRedacao.setDataEnvio(new Date());
        novaRedacao.setUserId(userId);

        Redacao redacaoInicial = redacaoRepository.save(novaRedacao);
        
        // 2. Chama a IA para avaliação (Recebe JSON como String)
        // O método geminiService.avaliarRedacao deve lançar uma exceção em caso de falha.
        String jsonAvaliacao = geminiService.avaliarRedacao(conteudo);
        
        // 3. Desserializa o JSON e atualiza o objeto Redacao
        ObjectMapper objectMapper = new ObjectMapper();
        
        // A classe AvaliacaoResultadoDTO deve mapear o JSON exato retornado pela IA.
        AvaliacaoResultadoDTO resultado = objectMapper.readValue(jsonAvaliacao, AvaliacaoResultadoDTO.class);

        // 4. Atualiza a Redação com os resultados
        // Nota: Assumimos que os getters do DTO (getPontuacaoTotal, etc.) estão corretos.
        redacaoInicial.setPontuacaoTotal(resultado.getPontuacaoTotal());
        redacaoInicial.setFeedbackGeral(resultado.getFeedbackGeral());
        redacaoInicial.setDetalhesCompetencias(resultado.getDetalhamentoCompetencias()); 
        redacaoInicial.setStatus("CORRIGIDA"); 

        // 5. Salva (Atualiza) a Redação no Mongo com os resultados da IA
        return redacaoRepository.save(redacaoInicial);
    }

    /**
     * Busca uma redação por ID.
     */
    public Redacao getRedacaoPorId(String id){
        return redacaoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Redação não encontrada"));
    }

    /**
     * Lista todas as redações de um usuário específico.
     */
    public List<Redacao> listarRedacoesUser(String userId){
        return redacaoRepository.findByUserId(userId);
    }
}