export interface ProjectRequest {
    nome: string,
    descricao?: string,
    data_inicio: string,
    data_fim: string,
    status: string,
    prioridade: string,
    usuarioId: number,
    integrantesIds: number[]
}
