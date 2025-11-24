package com.corrigeai.api.dtos;


// ➡️ DTO para cada item da lista de competências
public class CompetenciaDetalheDTO {
    
    private String competencia; // Ex: "C1"
    
    private Integer pontuacao; // Ex: 200
    
    private String comentario; // Feedback específico para a competência

    // Construtores, Getters e Setters

    public CompetenciaDetalheDTO() {}

    // Getters e Setters
    public String getCompetencia() {
        return competencia;
    }

    public void setCompetencia(String competencia) {
        this.competencia = competencia;
    }

    public Integer getPontuacao() {
        return pontuacao;
    }

    public void setPontuacao(Integer pontuacao) {
        this.pontuacao = pontuacao;
    }

    public String getComentario() {
        return comentario;
    }

    public void setComentario(String comentario) {
        this.comentario = comentario;
    }
}