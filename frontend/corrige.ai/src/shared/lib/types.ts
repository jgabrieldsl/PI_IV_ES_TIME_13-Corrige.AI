export type AppView = "home" | "history" | "essay-detail"

export interface CompetencyResult {
  id: number
  name: string
  score: number
  maxScore: number
  description: string
  color: string
  feedback: string
}

export interface CorrectionResult {
  totalScore: number
  competencies: CompetencyResult[]
  generalFeedback: string
  strengths: string[]
  improvements: string[]
}

export interface Essay {
  id: string
  title: string
  text: string
  date: Date
  correction: CorrectionResult
}

// Mock data for recent essays
export const mockEssays: Essay[] = [
  {
    id: "1",
    title: "Desafios da educação digital no Brasil",
    text: "A educação digital no Brasil enfrenta diversos desafios que precisam ser superados para garantir o acesso igualitário ao conhecimento. Primeiramente, a infraestrutura tecnológica ainda é precária em muitas regiões do país, especialmente nas áreas rurais e periferias urbanas. Além disso, a formação de professores para o uso de tecnologias educacionais ainda é insuficiente, o que compromete a qualidade do ensino híbrido e a distância. É fundamental que políticas públicas sejam implementadas para democratizar o acesso à internet e capacitar educadores.",
    date: new Date("2025-01-30"),
    correction: {
      totalScore: 820,
      competencies: [
        {
          id: 1,
          name: "Domínio da Norma Culta",
          score: 180,
          maxScore: 200,
          description: "Gramática e ortografia",
          color: "bg-emerald-500",
          feedback: "Excelente domínio da norma culta com mínimos desvios.",
        },
        {
          id: 2,
          name: "Compreensão do Tema",
          score: 160,
          maxScore: 200,
          description: "Interpretação e abordagem",
          color: "bg-blue-500",
          feedback: "Boa compreensão, mas poderia aprofundar mais.",
        },
        {
          id: 3,
          name: "Seleção e Organização",
          score: 180,
          maxScore: 200,
          description: "Argumentos e estrutura",
          color: "bg-purple-500",
          feedback: "Argumentação bem estruturada.",
        },
        {
          id: 4,
          name: "Coesão Textual",
          score: 160,
          maxScore: 200,
          description: "Conectivos e fluidez",
          color: "bg-amber-500",
          feedback: "Boa coesão entre parágrafos.",
        },
        {
          id: 5,
          name: "Proposta de Intervenção",
          score: 140,
          maxScore: 200,
          description: "Solução detalhada",
          color: "bg-pink-500",
          feedback: "Proposta presente, mas pouco detalhada.",
        },
      ],
      generalFeedback: "Redação bem estruturada com argumentos consistentes sobre educação digital.",
      strengths: ["Argumentação sólida", "Boa estrutura textual", "Domínio da língua"],
      improvements: ["Detalhar proposta de intervenção", "Incluir mais dados estatísticos"],
    },
  },
  {
    id: "2",
    title: "Mudanças climáticas e responsabilidade social",
    text: "As mudanças climáticas representam um dos maiores desafios da humanidade no século XXI. O aquecimento global, causado principalmente pela emissão de gases de efeito estufa, tem provocado eventos climáticos extremos em todo o planeta. É necessário que governos, empresas e cidadãos assumam sua responsabilidade na mitigação desses impactos ambientais.",
    date: new Date("2025-01-29"),
    correction: {
      totalScore: 760,
      competencies: [
        {
          id: 1,
          name: "Domínio da Norma Culta",
          score: 160,
          maxScore: 200,
          description: "Gramática e ortografia",
          color: "bg-emerald-500",
          feedback: "Bom domínio com alguns desvios pontuais.",
        },
        {
          id: 2,
          name: "Compreensão do Tema",
          score: 160,
          maxScore: 200,
          description: "Interpretação e abordagem",
          color: "bg-blue-500",
          feedback: "Compreensão adequada do tema.",
        },
        {
          id: 3,
          name: "Seleção e Organização",
          score: 160,
          maxScore: 200,
          description: "Argumentos e estrutura",
          color: "bg-purple-500",
          feedback: "Boa seleção de argumentos.",
        },
        {
          id: 4,
          name: "Coesão Textual",
          score: 140,
          maxScore: 200,
          description: "Conectivos e fluidez",
          color: "bg-amber-500",
          feedback: "Poderia variar mais os conectivos.",
        },
        {
          id: 5,
          name: "Proposta de Intervenção",
          score: 140,
          maxScore: 200,
          description: "Solução detalhada",
          color: "bg-pink-500",
          feedback: "Proposta genérica, precisa de mais detalhes.",
        },
      ],
      generalFeedback: "Boa abordagem do tema ambiental com argumentação consistente.",
      strengths: ["Tema relevante bem explorado", "Vocabulário adequado"],
      improvements: ["Expandir a proposta de intervenção", "Adicionar mais conectivos"],
    },
  },
  {
    id: "3",
    title: "Saúde mental na sociedade contemporânea",
    text: "A saúde mental tem ganhado destaque nas discussões contemporâneas, especialmente após a pandemia de COVID-19. O aumento de casos de ansiedade e depressão evidencia a necessidade de políticas públicas mais efetivas e de conscientização social sobre o tema.",
    date: new Date("2025-01-27"),
    correction: {
      totalScore: 720,
      competencies: [
        {
          id: 1,
          name: "Domínio da Norma Culta",
          score: 160,
          maxScore: 200,
          description: "Gramática e ortografia",
          color: "bg-emerald-500",
          feedback: "Domínio adequado da norma culta.",
        },
        {
          id: 2,
          name: "Compreensão do Tema",
          score: 140,
          maxScore: 200,
          description: "Interpretação e abordagem",
          color: "bg-blue-500",
          feedback: "Boa compreensão inicial.",
        },
        {
          id: 3,
          name: "Seleção e Organização",
          score: 140,
          maxScore: 200,
          description: "Argumentos e estrutura",
          color: "bg-purple-500",
          feedback: "Estrutura pode ser melhorada.",
        },
        {
          id: 4,
          name: "Coesão Textual",
          score: 140,
          maxScore: 200,
          description: "Conectivos e fluidez",
          color: "bg-amber-500",
          feedback: "Coesão razoável.",
        },
        {
          id: 5,
          name: "Proposta de Intervenção",
          score: 140,
          maxScore: 200,
          description: "Solução detalhada",
          color: "bg-pink-500",
          feedback: "Proposta precisa ser mais específica.",
        },
      ],
      generalFeedback: "Redação com tema atual e relevante, mas precisa de maior desenvolvimento.",
      strengths: ["Tema atual e importante", "Boa introdução"],
      improvements: ["Desenvolver mais os argumentos", "Proposta mais detalhada"],
    },
  },
  {
    id: "4",
    title: "Tecnologia e privacidade de dados",
    text: "Na era digital, a privacidade de dados tornou-se uma preocupação central. Com o avanço das tecnologias de coleta e análise de informações pessoais, surge a necessidade de regulamentações mais rígidas para proteger os cidadãos.",
    date: new Date("2025-01-23"),
    correction: {
      totalScore: 680,
      competencies: [
        {
          id: 1,
          name: "Domínio da Norma Culta",
          score: 140,
          maxScore: 200,
          description: "Gramática e ortografia",
          color: "bg-emerald-500",
          feedback: "Alguns desvios gramaticais encontrados.",
        },
        {
          id: 2,
          name: "Compreensão do Tema",
          score: 140,
          maxScore: 200,
          description: "Interpretação e abordagem",
          color: "bg-blue-500",
          feedback: "Compreensão básica do tema.",
        },
        {
          id: 3,
          name: "Seleção e Organização",
          score: 140,
          maxScore: 200,
          description: "Argumentos e estrutura",
          color: "bg-purple-500",
          feedback: "Argumentação pode ser mais robusta.",
        },
        {
          id: 4,
          name: "Coesão Textual",
          score: 120,
          maxScore: 200,
          description: "Conectivos e fluidez",
          color: "bg-amber-500",
          feedback: "Faltam conectivos em alguns trechos.",
        },
        {
          id: 5,
          name: "Proposta de Intervenção",
          score: 140,
          maxScore: 200,
          description: "Solução detalhada",
          color: "bg-pink-500",
          feedback: "Proposta incompleta.",
        },
      ],
      generalFeedback: "Tema relevante, mas a redação precisa de maior desenvolvimento.",
      strengths: ["Tema contemporâneo", "Linguagem clara"],
      improvements: ["Ampliar argumentação", "Melhorar coesão", "Completar proposta"],
    },
  },
]
