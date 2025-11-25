package com.corrigeai.servidor.comunicacao;

import org.junit.jupiter.api.Test;
import java.util.HashMap;
import java.util.Map;
import static org.junit.jupiter.api.Assertions.*;

class MensagemChatTest {

    @Test
    void testConstrutorVazio() {
        MensagemChat msg = new MensagemChat();
        assertNull(msg.getTipo());
        assertNull(msg.getDados());
    }

    @Test
    void testConstrutorCompleto() {
        long now = System.currentTimeMillis();
        MensagemChat msg = new MensagemChat("user1", "STUDENT", "Hello", now);
        
        assertEquals("CHAT_MESSAGE", msg.getTipo());
        assertNotNull(msg.getDados());
        assertEquals("user1", msg.getUserId());
        assertEquals("STUDENT", msg.getUserType());
        assertEquals("Hello", msg.getMensagem());
        assertEquals(now, msg.getTimestamp());
    }

    @Test
    void testSettersAndGetters() {
        MensagemChat msg = new MensagemChat();
        msg.setTipo("CUSTOM_TYPE");
        
        Map<String, Object> dados = new HashMap<>();
        dados.put("userId", "user2");
        dados.put("mensagem", "World");
        msg.setDados(dados);

        assertEquals("CUSTOM_TYPE", msg.getTipo());
        assertEquals("user2", msg.getUserId());
        assertEquals("World", msg.getMensagem());
        assertNull(msg.getUserType()); // Not set in map
    }
}
