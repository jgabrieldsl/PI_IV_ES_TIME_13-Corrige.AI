package com.corrigeai.api.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class AvaliacaoResultadoDTO {
    
    @JsonProperty("pontuacao_total")
    private Integer pontuacaoTotal;

    @JsonProperty("feedback_geral")
    private String feedbackGeral;

    @JsonProperty("detalhamento_competencias")
    private List<CompetenciaDetalheDTO> detalhamentoCompetencias;

    
    public AvaliacaoResultadoDTO() {}

    public AvaliacaoResultadoDTO(Integer pontuacaoTotal, String feedbackGeral, List<CompetenciaDetalheDTO> detalhamentoCompetencias) {
        this.pontuacaoTotal = pontuacaoTotal;
        this.feedbackGeral = feedbackGeral;
        this.detalhamentoCompetencias = detalhamentoCompetencias;
    }
 
    public Integer getPontuacaoTotal() { return pontuacaoTotal; }
    public void setPontuacaoTotal(Integer pontuacaoTotal) { this.pontuacaoTotal = pontuacaoTotal; }

    public String getFeedbackGeral() { return feedbackGeral; }
    public void setFeedbackGeral(String feedbackGeral) { this.feedbackGeral = feedbackGeral; }

    public List<CompetenciaDetalheDTO> getDetalhamentoCompetencias() { return detalhamentoCompetencias; }
    public void setDetalhamentoCompetencias(List<CompetenciaDetalheDTO> detalhamentoCompetencias) { this.detalhamentoCompetencias = detalhamentoCompetencias; }
}