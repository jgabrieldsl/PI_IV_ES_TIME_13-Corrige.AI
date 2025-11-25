package com.corrigeai.servidor;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.net.Socket;

import static org.junit.jupiter.api.Assertions.*;

@ExtendWith(MockitoExtension.class)
class ParceiroTest {

    @Mock
    private Socket socket;
    @Mock
    private ObjectInputStream in;
    @Mock
    private ObjectOutputStream out;

    @Test
    void testConstrutorComArgumentosValidos() {
        assertDoesNotThrow(() -> new Parceiro(socket, in, out));
    }

    @Test
    void testConstrutorComSocketNulo() {
        Exception e = assertThrows(Exception.class, () -> new Parceiro(null, in, out));
        assertEquals("Conexao ausente", e.getMessage());
    }

    @Test
    void testConstrutorComReceptorNulo() {
        Exception e = assertThrows(Exception.class, () -> new Parceiro(socket, null, out));
        assertEquals("Receptor ausente", e.getMessage());
    }

    @Test
    void testConstrutorComTransmissorNulo() {
        Exception e = assertThrows(Exception.class, () -> new Parceiro(socket, in, null));
        assertEquals("Transmissor ausente", e.getMessage());
    }

    @Test
    void testGettersAndSetters() throws Exception {
        Parceiro p = new Parceiro(socket, in, out);
        
        p.setUserId("u1");
        p.setUserType("ADMIN");
        p.setSocketId("s1");

        assertEquals("u1", p.getUserId());
        assertEquals("ADMIN", p.getUserType());
        assertEquals("s1", p.getSocketId());
    }
}
