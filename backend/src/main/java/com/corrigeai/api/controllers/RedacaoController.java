package com.corrigeai.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.corrigeai.api.dtos.RedacaoRequestDTO;
import com.corrigeai.api.models.Redacao;
import com.corrigeai.api.services.RedacaoService;
import java.util.List;

@RestController
@RequestMapping("/api/redacoes")
public class RedacaoController{

    @Autowired
    private RedacaoService redacaoService;

    // Endpoint de upload adaptado para processar e avaliar
    @PostMapping("/upload")
    public ResponseEntity<Redacao> uploadRedacao(@RequestBody RedacaoRequestDTO redacaoRequest){
        try{
                // ⬅️ Chama o novo método que inclui a IA
                Redacao redacaoProcessada = redacaoService.processarEavaliarRedacao(
                    redacaoRequest.getConteudo(), 
                    redacaoRequest.getUserId()
                );
                // Retorna 200 OK com a redação já corrigida pela IA
                return ResponseEntity.ok(redacaoProcessada);
        } catch (IllegalArgumentException e) {
             // Retorna erro 400 Bad Request se o conteúdo for inválido
             return ResponseEntity.badRequest().build();
        } catch (Exception e) {
             // Captura erros da comunicação com a IA ou outros erros internos
            return ResponseEntity.internalServerError().build();
        }
    }

    // ... (Os outros métodos permanecem os mesmos) ...
    @GetMapping("/{id}")
    public ResponseEntity<Redacao> getRedacaoPorId(@PathVariable String id){
        try{
            Redacao redacaoDoDB = redacaoService.getRedacaoPorId(id);
            return ResponseEntity.ok(redacaoDoDB);
        } catch (RuntimeException e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<List<Redacao>> getRedacoesUser(@PathVariable String userId){
        try{
            List<Redacao> redacoes = redacaoService.listarRedacoesUser(userId);

            return ResponseEntity.ok(redacoes);
            
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    // ...
}