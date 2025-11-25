# Relatório de Testes Automatizados - Servidor Java

## 1. Visão Geral
Este documento descreve a implementação dos testes automatizados para o componente Servidor Java do projeto Corrige.AI, atendendo aos requisitos da disciplina de Projeto Integrador IV (PI IV).

O objetivo foi aplicar técnicas de Teste Orientado a Objetos (OO), cobrindo cenários Intraclasse (testes de unidade de classes de domínio) e Interclasse (testes de integração do fluxo principal).

## 2. Tecnologias Utilizadas
- **JUnit 5**: Framework de testes unitários.
- **Mockito**: Framework para criação de mocks e isolamento de dependências.
- **Maven**: Gerenciamento de dependências e execução dos testes.

## 3. Testes Intraclasse (Unidade)

Foram selecionadas duas classes do domínio da aplicação para testes unitários profundos.

### 3.1. Classe `MensagemChat`
- **Arquivo de Teste**: `src/test/java/com/corrigeai/servidor/comunicacao/MensagemChatTest.java`
- **Objetivo**: Validar o encapsulamento e a manipulação de dados da mensagem de chat.
- **Cenários Testados**:
    - **Construtor Vazio**: Verifica se a instância é criada sem erros e com campos nulos.
    - **Construtor Completo**: Verifica se todos os campos (`userId`, `userType`, `mensagem`, `timestamp`) são corretamente atribuídos e mapeados para o mapa interno `dados`.
    - **Getters e Setters**: Valida a consistência entre os métodos de acesso e o mapa de dados subjacente.

### 3.2. Classe `Parceiro`
- **Arquivo de Teste**: `src/test/java/com/corrigeai/servidor/ParceiroTest.java`
- **Objetivo**: Validar a lógica de conexão e gerenciamento de estado do usuário conectado.
- **Técnica**: Utilização de **Mocks** (Mockito) para simular as dependências externas (`Socket`, `ObjectInputStream`, `ObjectOutputStream`), isolando a lógica da classe.
- **Cenários Testados**:
    - **Validação de Construtor**: Garante que a classe rejeita argumentos nulos (`conexao`, `receptor`, `transmissor`) lançando exceções apropriadas.
    - **Gerenciamento de Estado**: Verifica se os atributos de identificação do usuário (`userId`, `userType`, `socketId`) são armazenados e recuperados corretamente.

## 4. Testes Interclasse (Integração)

Foi implementado um teste de integração para validar o fluxo principal do servidor.

### 4.1. Fluxo de Conexão (`AceitadoraDeConexao`)
- **Arquivo de Teste**: `src/test/java/com/corrigeai/servidor/ServidorIntegrationTest.java`
- **Objetivo**: Verificar se o servidor aceita conexões TCP e trata erros de inicialização corretamente.
- **Cenários Testados**:
    1.  **Cenário Normal (Sucesso)**:
        - Inicia o servidor em uma thread separada.
        - Um cliente TCP (`java.net.Socket`) tenta se conectar.
        - Valida se a conexão é estabelecida com sucesso (`isConnected()`).
    2.  **Variação 1 (Porta Inválida)**:
        - Tenta iniciar o servidor com uma porta inválida (ex: string não numérica).
        - Valida se a exceção "Porta invalida" é lançada.
    3.  **Variação 2 (Argumentos Nulos)**:
        - Tenta iniciar o servidor sem a lista de usuários.
        - Valida se a exceção "Usuarios ausentes" é lançada.

## 5. Execução dos Testes

Para executar todos os testes, utilize o comando Maven na raiz do diretório `servidor`:

```bash
mvn clean test
```

### Resultado Esperado
```
[INFO] Tests run: 11, Failures: 0, Errors: 0, Skipped: 0
[INFO] BUILD SUCCESS
```
