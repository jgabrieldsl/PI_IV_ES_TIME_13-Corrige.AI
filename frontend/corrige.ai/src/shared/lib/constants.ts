export const ESSAY_THEMES = [
    { value: "", label: "Selecione um tema" },
    { value: "desafios-saude-mental-jovens", label: "Desafios da saúde mental entre jovens brasileiros" },
    { value: "impactos-redes-sociais", label: "Impactos das redes sociais na sociedade" },
    { value: "democratizacao-acesso-educacao", label: "Democratização do acesso à educação no Brasil" },
    { value: "mudancas-climaticas", label: "Mudanças climáticas e responsabilidade ambiental" },
    { value: "violencia-urbana", label: "Violência urbana e segurança pública" },
    { value: "fake-news-desinformacao", label: "Fake news e desinformação na era digital" },
    { value: "mobilidade-urbana", label: "Mobilidade urbana nas grandes cidades" },
    { value: "inclusao-pessoas-deficiencia", label: "Inclusão de pessoas com deficiência" },
    { value: "cultura-cancelamento", label: "Cultura do cancelamento e liberdade de expressão" },
    { value: "outros", label: "Outros (digite o tema)" },
]

export const COMPETENCY_NAMES: Record<string, string> = {
    C1: "Domínio da Norma Culta",
    C2: "Compreensão do Tema",
    C3: "Seleção e Organização",
    C4: "Coesão Textual",
    C5: "Proposta de Intervenção",
}

export const COMPETENCY_DESCRIPTIONS: Record<string, string> = {
    C1: "Gramática e ortografia",
    C2: "Interpretação e abordagem",
    C3: "Argumentos e estrutura",
    C4: "Conectivos e fluidez",
    C5: "Solução detalhada",
}
