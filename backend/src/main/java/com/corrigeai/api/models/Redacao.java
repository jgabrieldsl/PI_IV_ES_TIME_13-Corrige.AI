package com.corrigeai.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List;
import com.corrigeai.api.dtos.CompetenciaDetalheDTO; 

@Document(collection = "redacoes")
public class Redacao {
    @Id
    private String id; 
    private String conteudo; 
    private String status; 
    private Integer pontuacaoTotal; 
    private String feedbackGeral; 
    private List<CompetenciaDetalheDTO> detalhesCompetencias; 
    private Date dataEnvio; 
    private String userId;

    public Redacao() {}
    
    
    public Redacao(String userId, String conteudo, String status, Integer pontuacaoTotal, String feedbackGeral, List<CompetenciaDetalheDTO> detalhesCompetencias) {
        this.userId = userId;
        this.conteudo = conteudo;
        this.status = status;
        this.pontuacaoTotal = pontuacaoTotal;
        this.feedbackGeral = feedbackGeral;
        this.detalhesCompetencias = detalhesCompetencias;
        this.dataEnvio = new Date(); 
    }

    public String getId(){ return id; }
    public void setId(String id) { this.id = id; }

    public String getConteudo() { return conteudo; }
    public void setConteudo(String conteudo) { this.conteudo = conteudo; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    
    public Integer getPontuacaoTotal() { return pontuacaoTotal; }
    public void setPontuacaoTotal(Integer pontuacaoTotal) { this.pontuacaoTotal = pontuacaoTotal; }
    
    public String getFeedbackGeral() { return feedbackGeral; }
    public void setFeedbackGeral(String feedbackGeral) { this.feedbackGeral = feedbackGeral; }
    
    public List<CompetenciaDetalheDTO> getDetalhesCompetencias() { return detalhesCompetencias; }
    public void setDetalhesCompetencias(List<CompetenciaDetalheDTO> detalhesCompetencias) { this.detalhesCompetencias = detalhesCompetencias; }

    public Date getDataEnvio() { return dataEnvio; }
    public void setDataEnvio(Date dataEnvio) { this.dataEnvio = dataEnvio; }

    public String getUserId(){ return userId; }
    public void setUserId(String userId){ this.userId = userId; }
}