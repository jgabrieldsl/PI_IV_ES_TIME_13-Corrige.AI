package com.corrigeai.api.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.corrigeai.api.models.Redacao;
import com.corrigeai.api.services.RedacaoService;
import java.util.List;

@RestController // retornar somente dados
@RequestMapping("/api/redacoes") //define o prefixo de URL para todas as rotas desse controller
public class RedacaoController{

    @Autowired
    private RedacaoService redacaoService;

    // endpoint de upload
    @PostMapping("/upload")
    public ResponseEntity<Redacao> uploadRedacao(@RequestParam("file") MultipartFile arquivoParaSalvar, @RequestParam("userId") String userId){
        try{
                Redacao redacaoSalva = redacaoService.salvarUpload(arquivoParaSalvar, userId);
                return ResponseEntity.ok(redacaoSalva);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{id}")
    // ResponseEntity conversa com o front retornando 200 (ok), 404(n achou) e 500(erro).
    // pathVariable diz que o id faz parte da url (semântica)
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
}