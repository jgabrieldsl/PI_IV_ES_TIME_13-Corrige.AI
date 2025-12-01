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

    @JsonProperty("pontos_fortes")
    private List<String> pontosFortes;

    @JsonProperty("pontos_melhoria")
    private List<String> pontosMelhoria;

    
    public AvaliacaoResultadoDTO() {}

    public AvaliacaoResultadoDTO(Integer pontuacaoTotal, String feedbackGeral, List<CompetenciaDetalheDTO> detalhamentoCompetencias, List<String> pontosFortes, List<String> pontosMelhoria) {
        this.pontuacaoTotal = pontuacaoTotal;
        this.feedbackGeral = feedbackGeral;
        this.detalhamentoCompetencias = detalhamentoCompetencias;
        this.pontosFortes = pontosFortes;
        this.pontosMelhoria = pontosMelhoria;
    }
 
    public Integer getPontuacaoTotal() { return pontuacaoTotal; }
    public void setPontuacaoTotal(Integer pontuacaoTotal) { this.pontuacaoTotal = pontuacaoTotal; }

    public String getFeedbackGeral() { return feedbackGeral; }
    public void setFeedbackGeral(String feedbackGeral) { this.feedbackGeral = feedbackGeral; }

    public List<CompetenciaDetalheDTO> getDetalhamentoCompetencias() { return detalhamentoCompetencias; }
    public void setDetalhamentoCompetencias(List<CompetenciaDetalheDTO> detalhamentoCompetencias) { this.detalhamentoCompetencias = detalhamentoCompetencias; }

    public List<String> getPontosFortes() { return pontosFortes; }
    public void setPontosFortes(List<String> pontosFortes) { this.pontosFortes = pontosFortes; }

    public List<String> getPontosMelhoria() { return pontosMelhoria; }
    public void setPontosMelhoria(List<String> pontosMelhoria) { this.pontosMelhoria = pontosMelhoria; }
}