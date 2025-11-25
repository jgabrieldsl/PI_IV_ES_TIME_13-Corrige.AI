package com.corrigeai.api.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.fasterxml.jackson.databind.ObjectMapper; 
import java.util.Date;
import java.util.List;

import com.corrigeai.api.models.Redacao;
import com.corrigeai.api.repositories.RedacaoRepository;
import com.corrigeai.api.dtos.AvaliacaoResultadoDTO; 

@Service
public class RedacaoService {

@Autowired
 private RedacaoRepository redacaoRepository; 

@Autowired 
 private GeminiAIService geminiService; 
    
@Autowired
    private ObjectMapper objectMapper;

    public Redacao processarEavaliarRedacao(String conteudo, String userId) throws Exception {
        if(conteudo == null || conteudo.trim().isEmpty()) {
            throw new IllegalArgumentException("Conteúdo da redação não pode ser vazio");
        }
Redacao novaRedacao = new Redacao();
novaRedacao.setConteudo(conteudo);
novaRedacao.setStatus("PENDENTE");
novaRedacao.setDataEnvio(new Date());
novaRedacao.setUserId(userId);

Redacao redacaoInicial = redacaoRepository.save(novaRedacao);

String jsonAvaliacao = geminiService.avaliarRedacao(conteudo);
 
 AvaliacaoResultadoDTO resultado = objectMapper.readValue(jsonAvaliacao, AvaliacaoResultadoDTO.class);

 redacaoInicial.setPontuacaoTotal(resultado.getPontuacaoTotal());
 redacaoInicial.setFeedbackGeral(resultado.getFeedbackGeral());
 redacaoInicial.setDetalhesCompetencias(resultado.getDetalhamentoCompetencias()); 
 redacaoInicial.setStatus("CORRIGIDA"); 
        return redacaoRepository.save(redacaoInicial);
    }

    public Redacao getRedacaoPorId(String id){
     return redacaoRepository.findById(id)
 .orElseThrow(() -> new RuntimeException("Redação não encontrada"));
 }

public List<Redacao> listarRedacoesUser(String userId){
 return redacaoRepository.findByUserId(userId);
 }
}