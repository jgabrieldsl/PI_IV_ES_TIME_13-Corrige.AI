package com.corrigeai.api.repositories;
import com.corrigeai.api.models.Redacao;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;
// interface que conversa com o MongoDB, Spring boot que cuidará disso
public interface RedacaoRepository extends MongoRepository<Redacao, String> {

    //personalizado para buscar dentro de redacoes todas com o id do usuário
    List<Redacao> findByUserId(String userId);
}