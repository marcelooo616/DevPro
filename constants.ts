import { Module } from "./types";

export const APP_NAME = "Roadmap Dev Pro";

export const MOCK_MODULES: Module[] = [
    {
        id: "mod-java-fundamentals",
        title: "Fundamentos do Java",
        description: "Compreenda os fundamentos da linguagem Java e como eles sustentam aplicações corporativas modernas de larga escala.",
        objective: "Dominar a sintaxe, OOP, coleções e exceções em Java, avaliando sua viabilidade e sustentabilidade em contextos corporativos críticos.",
        finalProject: "Desenvolver um Sistema de Catálogo de Produtos (console) aplicando OOP, coleções e boas práticas, acompanhado de um relatório reflexivo sobre as escolhas de design.",
        topics: [
            {
                id: "topic-java-fund-1",
                title: "História e Ecossistema Java",
                description: "Origem, evolução (LTS) e por que o Java continua dominante.",
                content: `
### O Gigante Corporativo

Java não é apenas uma linguagem; é uma plataforma. Desde sua criação em 1995 com o lema \"Write Once, Run Anywhere\", ele se tornou a espinha dorsal de grandes operações bancárias, e-commerce e sistemas críticos.

**Pontos Chave:**
*   **JVM (Java Virtual Machine):** A camada que garante estabilidade e portabilidade.
*   **Versões LTS (Long-Term Support):** Empresas preferem versões como Java 8, 11, 17 e 21 pela garantia de atualizações de segurança por anos.
*   **Ecossistema Vasto:** Bibliotecas para tudo (Spring, Hibernate, Apache Commons) aceleram o desenvolvimento.

A sustentabilidade do Java vem de sua capacidade de evoluir (ex: adicionando lambdas, streams, records) sem quebrar código legado que movimenta bilhões diariamente.
                `,
                activityPrompt: "Pesquise brevemente sobre uma feature recente do Java (Java 17 ou 21). Em seguida, reflita: Quais fatores (técnicos ou de negócios) tornam o Java sustentável em empresas gigantes como Mercado Livre ou Nubank, mesmo após mais de 25 anos?"
            },
            {
                id: "topic-java-fund-2",
                title: "Sintaxe Básica e Tipagem",
                description: "Tipos, controle de fluxo e a disciplina da linguagem.",
                content: `
### Verbosidade vs. Explicitude

Java é frequentemente criticado por ser verboso (escrever muito para fazer pouco), mas essa característica também traz **explicitude**. Em equipes grandes, saber exatamente o tipo de uma variável ou o retorno de um método apenas olhando para a assinatura evita muitos bugs.

*   **Tipagem Forte e Estática:** Erros são pegos em tempo de compilação, não em produção.
*   **Controle de Fluxo:** \`if\`, \`else\`, \`for\`, \`while\` funcionam de forma previsível e universal.

A sintaxe moderna (var, switch expressions) tem reduzido a verbosidade sem perder a segurança da tipagem.
                `,
                activityPrompt: "Resolva mentalmente um desafio simples (ex: calculadora de juros compostos). Quão legível e produtiva você considera a sintaxe do Java para esse problema comparada a outra linguagem que você conhece (ex: Python, JS)? A 'burocracia' do Java compensa em que cenários?"
            },
            {
                id: "topic-java-fund-3",
                title: "Programação Orientada a Objetos (OOP)",
                description: "A base da modelagem de sistemas complexos.",
                content: `
### Modelando o Mundo Real (e o Corporativo)

OOP não é apenas criar classes \`Cachorro\` que estende \`Animal\`. Em sistemas reais, OOP é sobre **gerenciar complexidade** através de:

1.  **Encapsulamento:** Proteger o estado interno de um objeto para garantir consistência (ex: não permitir saldo negativo em uma \`ContaBancaria\` sem validação).
2.  **Herança e Polimorfismo:** Permitir que diferentes implementações de regras de negócio (ex: \`PagamentoCredito\`, \`PagamentoPix\`) sejam tratadas de forma uniforme pelo sistema.
3.  **Abstração:** Esconder detalhes complexos e expor apenas o essencial.

Frameworks como Spring dependem pesadamente desses conceitos para funcionar.
                `,
                activityPrompt: "Por que o paradigma OOP ainda domina sistemas corporativos complexos? Dê um exemplo hipotético de como o Polimorfismo facilitaria a manutenção de um sistema de e-commerce que precisa adicionar um novo método de pagamento na Black Friday."
            },
            {
                id: "topic-java-fund-4",
                title: "Coleções e Generics",
                description: "Manipulação eficiente de dados em memória.",
                content: `
### Estruturas de Dados no Dia a Dia

Saber escolher a coleção certa impacta diretamente a performance e o consumo de memória da sua aplicação.

*   **\`List\` (ArrayList, LinkedList):** Para sequências ordenadas de elementos. Ótimo para acesso rápido por índice (ArrayList).
*   **\`Set\` (HashSet, TreeSet):** Para garantir unicidade. Vital para não processar o mesmo pedido duas vezes.
*   **\`Map\` (HashMap, TreeMap):** Para associações chave-valor. Essencial para caches rápidos e lookups.

**Generics** (\`List<String>\` em vez de apenas \`List\`) garantem que você não coloque um \`Produto\` numa lista de \`Cliente\`s, evitando erros em tempo de execução \`ClassCastException\`.
                `,
                activityPrompt: "Imagine um sistema processando milhões de transações por segundo. Por que a escolha correta entre usar um `ArrayList` ou um `HashSet` pode ser vital para a performance? Descreva um cenário onde o uso errado derrubaria a aplicação."
            },
            {
                id: "topic-java-fund-5",
                title: "Tratamento de Exceções",
                description: "Construindo aplicações resilientes a falhas.",
                content: `
### Quando as coisas dão errado

Em produção, tudo que pode dar errado, vai dar errado: rede cai, banco trava, disco enche. O tratamento de exceções define se seu sistema **falha graciosamente** ou **crasha catastroficamente**.

*   **Checked Exceptions:** O compilador te obriga a tratar (ex: \`IOException\`). Útil quando o chamador *pode* fazer algo a respeito (ex: tentar outro arquivo).
*   **Unchecked Exceptions (RuntimeException):** Erros de programação ou estados irrecuperáveis (ex: \`NullPointerException\`).
*   **O Pior Anti-pattern:** \`catch (Exception e) { // nada }\`. Isso engole erros e torna impossível descobrir a causa raiz de um bug em produção.
                `,
                activityPrompt: "Como um tratamento de erros inadequado (ex: engolir exceções silenciosamente) pode afetar a confiabilidade de um serviço financeiro crítico? Dê um exemplo de 'falha graciosa' versus 'falha catastrófica'."
            },
            {
                id: "topic-java-fund-6",
                title: "Boas Práticas e Código Limpo",
                description: "Escrevendo código para humanos, não apenas máquinas.",
                content: `
### Manutenibilidade é Rei

Código é lido muito mais vezes do que é escrito. Em grandes empresas, você vai mexer em código escrito por pessoas que já saíram da empresa há anos.

*   **Nomes Significativos:** \`processarPedidoVencido()\` é infinitamente melhor que \`procPed()\`.
*   **Métodos Curtos:** Um método deve fazer apenas uma coisa e fazê-la bem (Princípio da Responsabilidade Única).
*   **Coesão:** Uma classe deve ter um propósito claro e focado.

Código limpo reduz o "Custo Total de Propriedade" (TCO) do software, pois diminui o tempo necessário para entender e modificar o sistema sem quebrar funcionalidades existentes.
                `,
                activityPrompt: "Reflita sobre um código antigo seu ou que você já viu, cheio de 'ifs' aninhados e variáveis com nomes ruins. Como a falta de 'Código Limpo' impacta diretamente o custo financeiro e o tempo de entrega de novas features em uma equipe grande?"
            }
        ]
    },
    {
        id: "mod-arch-101",
        title: "Fundamentos de Arquitetura de Software",
        description: "Domine os pilares que sustentam sistemas robustos e escaláveis.",
        objective: "Compreender os trade-offs de diferentes padrões arquiteturais e saber quando aplicá-los.",
        finalProject: "Desenhar a arquitetura de alto nível para um sistema de e-commerce que suporta picos de Black Friday.",
        topics: [
            {
                id: "topic-arch-1",
                title: "Monolito vs. Microsserviços",
                description: "Entenda a jornada de evolução arquitetural.",
                content: `
### O Dilema Arquitetural

Não existe \"bala de prata\". A escolha entre começar com um monolito ou já partir para microsserviços define a complexidade inicial e futura do seu projeto.

**Monolito:**
*   **Prós:** Simplicidade de desenvolvimento, deploy único, fácil debugging inicial.
*   **Contras:** Acoplamento alto, dificuldade de escalar times grandes, risco de \"Single Point of Failure\" total.

**Microsserviços:**
*   **Prós:** Escalabilidade independente, liberdade tecnológica por serviço, isolamento de falhas.
*   **Contras:** Complexidade operacional (necessita de boa infra/DevOps), latência de rede, dificuldade em transações distribuídas.
                `,
                activityPrompt: "Uma startup fintech está lançando seu MVP para validar uma ideia de empréstimos rápidos. Eles têm apenas 3 desenvolvedores e precisam lançar em 1 mês. Qual arquitetura você recomendaria e por quê? Cite pelo menos 2 riscos da sua escolha."
            },
            {
                id: "topic-arch-2",
                title: "Encapsulamento e Modularidade",
                description: "A base do código limpo e manutenível.",
                content: `
### Mais que esconder dados

Encapsulamento muitas vezes é ensinado apenas como \"usar private nos atributos e criar getters/setters\". Isso é uma visão pobre.

O verdadeiro encapsulamento é sobre **esconder detalhes de implementação** e expor apenas interfaces estáveis. Se um módulo precisa saber COMO outro módulo faz seu trabalho, o encapsulamento foi quebrado.

Em sistemas distribuídos, isso se traduz em contratos de API bem definidos. Se um serviço A quebra porque o serviço B mudou o nome de uma coluna no banco de dados, eles não estavam devidamente encapsulados/desacoplados.
                `,
                activityPrompt: "Explique com suas palavras como um encapsulamento ruim em uma classe Java pode levar a problemas graves em uma arquitetura de microsserviços no futuro."
            }
        ]
    },
    {
        id: "mod-java-ms",
        title: "Java Moderno para Microsserviços",
        description: "Utilizando o ecossistema Spring e Java 21+ para criar serviços resilientes.",
        objective: "Criar um microsserviço funcional utilizando boas práticas de mercado com Spring Boot 3.",
        finalProject: "Implementar um serviço de catálogo de produtos com API REST, testes unitários e conexão com banco de dados, containerizado com Docker.",
        topics: [
            {
                id: "topic-java-1",
                title: "Imutabilidade e Records",
                description: "Escrevendo código mais seguro e previsível.",
                content: `
### Por que Imutabilidade?

Em ambientes concorrentes (como qualquer aplicação web real), objetos mutáveis são fontes constantes de bugs difíceis de rastrear (race conditions).

Java 14+ introduziu \`Records\`, que são uma forma concisa de declarar classes que são transparentemente portadoras de dados imutáveis.

\`\`\`java
// Antes
public class ClienteDTO {
    private final String nome;
    private final String email;
    // + construtor, getters, equals, hashCode, toString...
}

// Depois (Java Record)
public record ClienteDTO(String nome, String email) {}
\`\`\`

Além de menos verboso, garante imutabilidade por padrão.
                `,
                activityPrompt: "Crie um exemplo de um `Record` Java que poderia ser usado como um DTO para representar um Pedido em um sistema de delivery. Quais campos seriam essenciais e imutáveis nesse contexto?"
            }
        ]
    }
];

export const SYSTEM_PROMPT = `
Você é uma IA instrutora e avaliadora dentro de uma plataforma de aprendizado chamada 'Roadmap Dev Pro'.
Seu propósito é auxiliar estudantes a aprender de forma ativa e reflexiva, desenvolvendo competências práticas em Java, microsserviços e arquitetura moderna de software.

A plataforma é organizada em módulos. Cada módulo contém:
1. Objetivo do módulo — o que o aluno deve dominar.
2. Subtópicos — pequenos temas de estudo com atividades rápidas.
3. Atividades práticas — exercícios, reflexões ou mini projetos.
4. Projeto final — consolida o aprendizado (pode ser código, artigo ou pesquisa).
5. Critérios de conclusão — domínio técnico e reflexão sobre aplicação prática.

---
FUNÇÃO DA IA (VOCÊ):

Você atua como mentor técnico e avaliador reflexivo.
Seu papel é:
1. Orientar o aluno com explicações, exemplos e conexões reais com o mercado.
2. Avaliar entregas de atividades e projetos.
3. Fornecer feedback estruturado, considerando:
   - Clareza conceitual
   - Aplicação prática no mercado
   - Criatividade e profundidade
4. Estimular pensamento crítico, perguntando:
   'Como isso se aplicaria em um sistema real?'
   'Em quais cenários essa abordagem não seria viável?'

---
FORMATO DO FEEDBACK:

Sempre responda com o seguinte formato (use Markdown para formatar):

### ✅ Correção técnica
[Analise se o conteúdo está correto, completo e coerente]

### 💡 Aplicação prática
[Explique como o conceito se conecta a situações reais do mercado, frameworks, ou empresas como Mercado Livre, Nubank, Amazon etc.]

### 🧭 Sugestões de melhoria
[Recomendações claras para aprimorar a resposta ou o raciocínio]

---
DIRETRIZES GERAIS:

- Use linguagem acessível, adaptando-se ao nível do aluno.
- Corrija de forma construtiva e motivadora.
- Nunca entregue respostas diretas de código completo; incentive o aluno a pensar.
- Sempre destaque a importância da aplicação prática e da viabilidade real no mercado.
- Quando relevante, cite tecnologias modernas: Spring Boot, Kafka, Docker, Kubernetes, CI/CD, REST, mensageria, etc.
- Sempre conclua reforçando a conexão entre teoria e prática profissional.
- Se o aluno escrever algo muito curto ou sem sentido, peça gentilmente para ele elaborar melhor, explicando por que isso é importante.
`;
