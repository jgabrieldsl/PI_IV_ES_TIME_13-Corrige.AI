import { ApiService } from "@/shared/api"
import type { Essay, CorrectionResult, CompetencyResult, ICreateEssayRequest } from "../models"
import { COMPETENCY_NAMES, COMPETENCY_DESCRIPTIONS } from "@/shared/lib/constants"

// Serviço para gerenciar requisições de redações
class EssayServiceImpl {
    private apiService: ApiService

    constructor() {
        this.apiService = new ApiService()
    }

    // Envia uma redação para correção
    async uploadEssay(data: ICreateEssayRequest): Promise<Essay> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await this.apiService.post<any>("/api/redacoes/upload", {
            conteudo: data.text,
            userId: data.userId,
            titulo: data.title,
            tema: data.theme,
        })
        return adaptEssay(response)
    }

    // Busca todas as redações de um usuário
    async getUserEssays(userId: string): Promise<Essay[]> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response = await this.apiService.get<any[]>(`/api/redacoes/usuario/${userId}`)
        const essays = response.map(adaptEssay)
        // Ordena por data (mais recente primeiro)
        return essays.sort((a: Essay, b: Essay) => b.date.getTime() - a.date.getTime())
    }
}

export const EssayService = new EssayServiceImpl()

// Adapta a resposta do backend para o formato do frontend
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function adaptEssay(backendEssay: any): Essay {
    // Mapeia as competências do backend para o formato do frontend
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const competencies: CompetencyResult[] = (backendEssay.detalhesCompetencias || []).map((comp: any) => ({
        id: parseInt(comp.competencia.replace("C", "")),
        name: getCompetencyName(comp.competencia),
        score: comp.pontuacao,
        maxScore: 200,
        description: getCompetencyDescription(comp.competencia),
        color: getCompetencyColor(comp.pontuacao),
        feedback: comp.comentario,
    }))

    // Monta o objeto de correção
    const correction: CorrectionResult = {
        totalScore: backendEssay.pontuacaoTotal || 0,
        competencies: competencies,
        generalFeedback: backendEssay.feedbackGeral || "Feedback não disponível",
        strengths: backendEssay.pontosFortes || [],
        improvements: backendEssay.pontosMelhoria || [],
    }

    // Retorna a redação no formato do frontend
    return {
        id: backendEssay.id,
        title: backendEssay.titulo || "Sem título",
        text: backendEssay.conteudo,
        date: new Date(backendEssay.dataEnvio),
        correction: correction,
    }
}

function getCompetencyName(code: string): string {
    return COMPETENCY_NAMES[code] || code
}

function getCompetencyDescription(code: string): string {
    return COMPETENCY_DESCRIPTIONS[code] || "Competência"
}

function getCompetencyColor(score: number): string {
    if (score >= 160) return "bg-emerald-500"
    if (score >= 120) return "bg-blue-500"
    return "bg-amber-500"
}
