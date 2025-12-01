# Backend - Corrige.ai
Backend da plataforma Corrige.ai, desenvolvido em Java com Spring Boot, focado em resolver a dor do usuário relacionada à demora, ansiedade e falta de acesso a feedbacks de redação. O sistema atua como intermediário entre o aluno e a IA, garantindo análises rápidas e feedbacks detalhados das redações.

## Tecnologias Principais (MVP)
- **Java 17**
- **Spring Boot 3.1.5**
- **Spring Web** (REST API + SSE)
- **Spring Data MongoDB** (Persistência)
- **Lombok** (Redução de boilerplate)
- **Maven** (Gerenciamento de dependências)


## Estrutura do Projeto
```
backend/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/corrigeai/api/
│   │   │       ├── controllers/     # REST Controllers
│   │   │       │   ├── ChatController.java
│   │   │       │   ├── ConnectionController.java
│   │   │       │   └── RedacaoController.java
│   │   │       ├── services/        # Lógica de negócio
│   │   │       │   ├── GeminiAIService.java
│   │   │       │   ├── RedacaoService.java
│   │   │       │   ├── ServerCommunicationService.java
│   │   │       │   ├── SocketClientService.java
│   │   │       │   ├── SocketConnectionManager.java
│   │   │       │   └── SocketService.java
│   │   │       ├── dtos/            # DTOs usados pela API e IA
│   │   │       │   ├── AvaliacaoResultadoDTO.java
│   │   │       │   ├── CompetenciaDetalheDTO.java
│   │   │       │   └── RedacaoRequestDTO.java
│   │   │       ├── models/          # Entidades / documentos MongoDB
│   │   │       │   ├── ConnectRequest.java
│   │   │       │   ├── ConnectResponse.java
│   │   │       │   ├── Redacao.java
│   │   │       │   └── SocketResponse.java
│   │   │       ├── repositories/    # Acesso MongoDB
│   │   │       │   ├── RedacaoRepository.java
│   │   │       │   └── SocketResponseRepository.java
│   │   │       ├── config/          # Configurações
│   │   │       │   ├── CorsConfig.java
│   │   │       │   └── JacksonConfig.java
│   │   │       └── CorrigeAiApplication.java
│   │   └── resources/
│   │       └── application.yml      # Configuração MongoDB
│   └── test/                        # Testes (JUnit, Mockito)
├── pom.xml
```

### Executar o projeto
```bash
cd backend

# Via Maven
mvn spring-boot:run

# Ou compilar e executar
mvn clean compile
mvn exec:java -Dexec.mainClass="com.corrigeai.api.CorrigeAiApplication"
```

## Funcionalidades Implementadas

### 1. API de Correção de Redações (IA)
- `POST /api/redacoes/upload`: Envia redação para correção via Gemini AI
  ```json
  {
    "conteudo": "Texto da redação...",
    "userId": "user123",
    "titulo": "Título da Redação",
    "tema": "Tema da Redação"
  }
  ```
- `GET /api/redacoes/{id}`: Busca redação específica
- `GET /api/redacoes/usuario/{userId}`: Busca histórico de redações do usuário

### 2. Sistema de Chat em Tempo Real
- `POST /api/chat/send`: Envia mensagem de chat
- `GET /api/chat/stream/{socketId}`: Stream SSE para receber mensagens
  - Retorna eventos `chat-message` com dados da mensagem
  - Conexão persistente para push em tempo real

### 3. Sistema de Conexão Socket
- `POST /api/connect`: Estabelece conexão com servidor socket
- `GET /api/connections`: Lista todas as conexões ativas
- `DELETE /api/connections/{socketId}`: Desconecta socket específico

### Persistência MongoDB
- **Collections**:
  - `redacoes`: Armazena redações, correções e feedbacks
  - `socket_responses`: Dados de conexões ativas
- **Repositories**: `RedacaoRepository`, `SocketResponseRepository`

## Arquitetura de Comunicação

### 1. Correção de Redação
1. **Frontend** → `POST /api/redacoes/upload` → **Backend**
2. **Backend** → API Gemini AI (Google) → **Backend**
3. **Backend** processa resposta JSON e salva no **MongoDB**
4. **Backend** retorna objeto `Redacao` completo para o Frontend

### 2. Chat em Tempo Real
1. **Frontend** → `POST /api/chat/send` → **Backend**
2. **Backend** → `PedidoDeMensagem` → **Servidor TCP**
3. **Servidor TCP** faz broadcast da `MensagemChat` para todos
4. **Backend** recebe mensagem e envia via SSE para Frontend

### Componentes Principais

#### 1. `RedacaoService`
Gerencia o fluxo de correção:
- Recebe texto do controller
- Chama `GeminiAIService` para análise
- Converte resposta da IA em objetos Java
- Salva no MongoDB via `RedacaoRepository`

#### 2. `GeminiAIService`
Integração com Google Gemini:
- Monta prompt especializado para correção ENEM
- Envia requisição HTTP para API do Google
- Retorna JSON estruturado com notas e feedbacks

#### 3. `SocketConnectionManager`
Gerencia conexões TCP e SSE:
- Mantém pool de conexões com servidor Java
- Gerencia emissores SSE (Server-Sent Events)
- Realiza deduplicação de mensagens de chat