package com.corrigeai.api.dtos;

public class RedacaoRequestDTO {
    private String conteudo;
    private String userId;

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
