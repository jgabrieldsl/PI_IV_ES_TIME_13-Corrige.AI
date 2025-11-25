package com.corrigeai.servidor;

import org.junit.jupiter.api.Test;
import java.io.IOException;
import java.net.Socket;
import java.util.ArrayList;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import static org.junit.jupiter.api.Assertions.*;

class ServidorIntegrationTest {

    private static final String PORTA_TESTE = "3002"; // Porta diferente do padrão para evitar conflito

    @Test
    void testFluxoConexaoNormal() throws Exception {
        // 1. Iniciar Servidor em uma thread separada
        ArrayList<Parceiro> usuarios = new ArrayList<>();
        AceitadoraDeConexao aceitadora = new AceitadoraDeConexao(PORTA_TESTE, usuarios);
        aceitadora.start();

        // Aguardar servidor iniciar
        Thread.sleep(500);

        // 2. Cliente tenta conectar
        try (Socket clientSocket = new Socket("localhost", Integer.parseInt(PORTA_TESTE))) {
            assertTrue(clientSocket.isConnected(), "Cliente deve conseguir conectar ao servidor");
            
            // Aguardar processamento da conexão
            Thread.sleep(500);
            
            // Verificar se o servidor registrou o usuário (embora sem handshake completo, a conexão TCP existe)
            // Nota: O SupervisorDeConexao adiciona à lista 'usuarios' apenas após handshake? 
            // Verificando o código: SupervisorDeConexao adiciona a 'usuarios' no método run() após criar Parceiro.
            // Mas Parceiro precisa de ObjectStreams. O cliente precisa enviar/receber objetos.
            // Como este é um teste de integração simples de CONEXÃO TCP, validamos se a porta aceitou.
        }

        // Parar servidor (Aceitadora não tem método stop limpo, mas o teste encerra a JVM)
    }

    @Test
    void testConexaoPortaInvalida() {
        ArrayList<Parceiro> usuarios = new ArrayList<>();
        Exception e = assertThrows(Exception.class, () -> {
            new AceitadoraDeConexao("invalid", usuarios);
        });
        assertEquals("Porta invalida", e.getMessage());
    }

    @Test
    void testConexaoUsuariosNulos() {
        Exception e = assertThrows(Exception.class, () -> {
            new AceitadoraDeConexao("3005", null);
        });
        assertEquals("Usuarios ausentes", e.getMessage());
    }
}
