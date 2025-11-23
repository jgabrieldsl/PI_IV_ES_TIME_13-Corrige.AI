package com.corrigeai.api.services;

import java.util.List;
import com.google.genai.Client;
import com.google.genai.types.Content; // ⬅️ Usando 'types' (o mais comum)
import com.google.genai.types.GenerateContentConfig;
import com.google.genai.types.Part;
import com.google.genai.types.GenerateContentResponse; 
import org.springframework.beans.factory.annotation.Value; 
import org.springframework.stereotype.Service;
import java.io.IOException;

@Service
public class GeminiAIService {

    private final Client geminiClient;
    private static final String MODEL_NAME = "gemini-2.5-flash"; 

    public GeminiAIService(@Value("${gemini.api.key}") String apiKey) {
        this.geminiClient = Client.builder()
                                .apiKey(apiKey)
                                .build();
    }

    public String avaliarRedacao(String textoRedacao) throws IOException {
        
        String instrucaoParaAvaliador = """
             Você é um avaliador de redações do ENEM extremamente rigoroso e experiente. Sua única 
             função é analisar o texto enviado e gerar uma resposta em formato JSON estrito.
             
             A resposta JSON DEVE conter as seguintes chaves:
             - "pontuacao_total": Pontuação de 0 a 1000, calculada pela soma das competências.
             - "feedback_geral": Um parágrafo de feedback construtivo sobre o texto em Português.
             - "detalhamento_competencias": Uma lista de 5 objetos JSON, um para cada competência do ENEM (C1 a C5), 
               contendo as chaves 'competencia', 'pontuacao' (0 a 200) e 'comentario' (em Português).
             
             Não inclua nenhum texto, saudações, ou explicação fora da estrutura JSON.
             """;
            
        // 1. Cria a parte do sistema (instrução)
        Part systemPart = Part.builder().text(instrucaoParaAvaliador).build();

        // 2. Cria a configuração de conteúdo (usando a instrução do sistema e forçando JSON)
        GenerateContentConfig config = GenerateContentConfig.builder()
            .systemInstruction(Content.builder().parts(List.of(systemPart)).build()) 
            .responseMimeType("application/json") 
            .build();
        
        String userPrompt = "Avalie a seguinte redação e me devolva o resultado no formato JSON estrito: \n\n" + textoRedacao;

        // 3. Cria a parte do usuário
        Part userTextPart = Part.builder().text(userPrompt).build();
        // Converte o Part em Content porque o SDK espera List<Content> como entrada
        Content userContent = Content.builder().parts(List.of(userTextPart)).build();
        
        // 4. Chamada à API — Passando uma lista de Content para o SDK.
        GenerateContentResponse response = geminiClient.models.generateContent(
            MODEL_NAME, 
            List.of(userContent),
            config
        );
        
        return response.text();
    }
}