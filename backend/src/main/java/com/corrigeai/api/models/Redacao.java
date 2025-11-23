package com.corrigeai.api.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.Date;
import java.util.List; // Importação necessária para a lista de competências
import com.corrigeai.api.dtos.CompetenciaDetalheDTO; // ⬅️ Importe a classe que representa o detalhe C1, C2, etc.

@Document(collection = "redacoes")
public class Redacao {
    @Id
    private String id; 
    private String conteudo; 
    private String status; // PENDENTE, CORRIGIDA
    
    // ➡️ CAMPO ADAPTADO: Usamos Integer/String para a pontuação total
    private Integer pontuacaoTotal; // Mapeia para pontuacao_total
    
    // ➡️ CAMPO EXISTENTE: Mantido e renomeado para ser mais específico se necessário
    private String feedbackGeral; 
    
    // ➡️ NOVO CAMPO: Para armazenar o detalhamento por competência
    private List<CompetenciaDetalheDTO> detalhesCompetencias; 
    
    private Date dataEnvio; 
    private String userId;

    // --- GETTERS E SETTERS ---

    public String getId(){
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
    
    // ➡️ GETTER E SETTER ADAPTADOS (Substituem get/setNota)
    public Integer getPontuacaoTotal() {
        return pontuacaoTotal;
    }

    public void setPontuacaoTotal(Integer pontuacaoTotal) {
        this.pontuacaoTotal = pontuacaoTotal;
    }
    
    // ➡️ GETTER E SETTER ADAPTADOS (Substituem get/setFeedbackIA)
    public String getFeedbackGeral() {
        return feedbackGeral;
    }

    public void setFeedbackGeral(String feedbackGeral) {
        this.feedbackGeral = feedbackGeral;
    }
    
    // ➡️ NOVO GETTER E SETTER
    public List<CompetenciaDetalheDTO> getDetalhesCompetencias() {
        return detalhesCompetencias;
    }

    public void setDetalhesCompetencias(List<CompetenciaDetalheDTO> detalhesCompetencias) {
        this.detalhesCompetencias = detalhesCompetencias;
    }

    public Date getDataEnvio() {
        return dataEnvio;
    }

    public void setDataEnvio(Date dataEnvio) {
        this.dataEnvio = dataEnvio;
    }

    public String getUserId(){
        return userId;
    }

    public void setUserId(String userId){
        this.userId = userId;
    }
}