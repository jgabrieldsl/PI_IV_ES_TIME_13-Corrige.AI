package com.corrigeai.api.repositories;

import com.corrigeai.api.models.RegistroConexao;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RegistroConexaoRepository extends MongoRepository<RegistroConexao, String> {

}