package com.corrigeai.api.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import com.corrigeai.api.models.Redacao;
import com.corrigeai.api.repositories.RedacaoRepository;
import java.util.List;

@Service
public class RedacaoService {

    @Autowired // "dependencia" serve para conectar com a classe que  salva no Mongo
    private RedacaoRepository redacaoRepository; //lugar no qual os arquivos serão salvos

    public Redacao salvarRedacao(String conteudo, String userId) {
        if(conteudo == null || conteudo.trim().isEmpty()) throw new IllegalArgumentException("Conteúdo da redação não pode ser vazio");

        // criar o objeto Redacao
        Redacao novaRedacao = new Redacao();
        novaRedacao.setConteudo(conteudo);
        novaRedacao.setStatus("PENDENTE");
        novaRedacao.setDataEnvio(new Date());
        novaRedacao.setUserId(userId);

        // salvar no Mongo através da interface repository
        return redacaoRepository.save(novaRedacao);
    }

    public Redacao getRedacaoPorId(String id){
        // método padrão "findById" retorna classe wrapper "Optional" com o que você pediu dentro ou nada se n achou
        return redacaoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Redação não encontrada"));
    }

    public List<Redacao> listarRedacoesUser(String userId){
        return redacaoRepository.findByUserId(userId);
    }

}