package com.corrigeai.api.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

// ➡️ DTO principal para o JSON de saída da IA
public class AvaliacaoResultadoDTO {
    
    // Mapeia "pontuacao_total"
    @JsonProperty("pontuacao_total")
    private Integer pontuacaoTotal;

    // Mapeia "feedback_geral"
    @JsonProperty("feedback_geral")
    private String feedbackGeral;

    // Mapeia "detalhamento_competencias"
    @JsonProperty("detalhamento_competencias")
    private List<CompetenciaDetalheDTO> detalhamentoCompetencias;

    // Construtores, Getters e Setters são essenciais para o Jackson

    public AvaliacaoResultadoDTO() {}

    // Getters e Setters
    public Integer getPontuacaoTotal() {
        return pontuacaoTotal;
    }

    public void setPontuacaoTotal(Integer pontuacaoTotal) {
        this.pontuacaoTotal = pontuacaoTotal;
    }

    public String getFeedbackGeral() {
        return feedbackGeral;
    }

    public void setFeedbackGeral(String feedbackGeral) {
        this.feedbackGeral = feedbackGeral;
    }

    public List<CompetenciaDetalheDTO> getDetalhamentoCompetencias() {
        return detalhamentoCompetencias;
    }

    public void setDetalhamentoCompetencias(List<CompetenciaDetalheDTO> detalhamentoCompetencias) {
        this.detalhamentoCompetencias = detalhamentoCompetencias;
    }
}