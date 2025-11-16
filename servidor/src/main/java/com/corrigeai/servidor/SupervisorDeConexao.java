package com.corrigeai.servidor;

import com.corrigeai.servidor.comunicacao.Comunicado;
import com.corrigeai.servidor.comunicacao.PedidoDeConexao;
import com.corrigeai.servidor.comunicacao.RespostaDeConexao;
import com.corrigeai.servidor.comunicacao.PedidoDeMensagem;
import com.corrigeai.servidor.comunicacao.MensagemChat;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;
import java.util.ArrayList;
import java.util.UUID;

public class SupervisorDeConexao extends Thread {
    private Parceiro usuario;
    private Socket conexao;
    private ArrayList<Parceiro> usuarios;

    public SupervisorDeConexao(Socket conexao, ArrayList<Parceiro> usuarios) throws Exception {
        if (conexao == null)
            throw new Exception("Conexao ausente");
        if (usuarios == null)
            throw new Exception("Usuarios ausentes");

        this.conexao = conexao;
        this.usuarios = usuarios;
    }

    public void run() {        
        ObjectOutputStream transmissor;
        try {
            transmissor = new ObjectOutputStream(this.conexao.getOutputStream());
            transmissor.flush();
        } catch (Exception erro) { return; }

        ObjectInputStream receptor = null;
        try {
            receptor = new ObjectInputStream(this.conexao.getInputStream());
        } catch (Exception erro) {
            try { transmissor.close(); } catch (Exception falha) {}
            return;
        }

        try {
            this.usuario = new Parceiro(this.conexao, receptor, transmissor);
        } catch (Exception erro) { return; }

        try {
            for (;;) {
                Comunicado comunicado = this.usuario.envie();

                if (comunicado == null) {
                    break;
                }
                else if (comunicado instanceof PedidoDeConexao) {
                    PedidoDeConexao pedido = (PedidoDeConexao) comunicado;
                    
                    // Gera um socketId único
                    String socketId = UUID.randomUUID().toString();
                    long timestamp = System.currentTimeMillis();
                    
                    // Armazena informações do usuário
                    this.usuario.setUserId(pedido.getUserId());
                    this.usuario.setUserType(pedido.getUserType());
                    this.usuario.setSocketId(socketId);
                    
                    // Adiciona à lista de usuários
                    synchronized (this.usuarios) { this.usuarios.add(this.usuario); }
                    
                    int totalUsuarios = this.usuarios.size();
                    
                    
                    // Envia resposta de sucesso
                    RespostaDeConexao resposta = new RespostaDeConexao(socketId, timestamp, totalUsuarios);
                    this.usuario.receba(resposta);
                }
                else if (comunicado instanceof PedidoDeMensagem) {
                    PedidoDeMensagem pedido = (PedidoDeMensagem) comunicado;
                    
                    String mensagem = pedido.getMensagem();
                    long timestamp = System.currentTimeMillis();
                                        
                    // Cria mensagem de broadcast
                    MensagemChat chatMessage = new MensagemChat(
                        this.usuario.getUserId(),
                        this.usuario.getUserType(),
                        mensagem,
                        timestamp
                    );
                    
                    // Transmite para todos os usuários conectados
                    synchronized (this.usuarios) {
                        int enviadas = 0;
                        for (Parceiro parceiro : this.usuarios) {
                            try {
                                parceiro.receba(chatMessage);
                                enviadas++;
                            } catch (Exception e) {}
                        }

                        System.out.println("[CHAT] Mensagem transmitida para " + enviadas + " usuário(s)");
                    }
                }
            }
        } catch (Exception erro) {
            // Verifica se é um erro de socket fechado (desconexão normal)
            if (erro.getMessage() != null && 
                (erro.getMessage().contains("Connection reset") || 
                 erro.getMessage().contains("Erro de recepcao") ||
                 erro.getMessage().contains("Socket closed"))) {
                System.out.println("[SUPERVISOR] Cliente desconectado: " + 
                    (this.usuario.getSocketId() != null ? this.usuario.getSocketId() : "desconhecido"));
            } else {
                System.err.println("[SUPERVISOR] ERRO no loop principal: " + erro.getMessage());
                erro.printStackTrace();
            }
        } finally {
            // Limpa recursos
            synchronized (this.usuarios) {
                if (this.usuario != null) {
                    this.usuarios.remove(this.usuario);
                    System.out.println("[SUPERVISOR] Usuário removido. Total de conexões: " + this.usuarios.size());
                }
            }
            try {
                if (transmissor != null)
                    transmissor.close();
                if (receptor != null)
                    receptor.close();
                if (this.conexao != null && !this.conexao.isClosed())
                    this.conexao.close();
            } catch (Exception falha) {}
        }
    }
}
