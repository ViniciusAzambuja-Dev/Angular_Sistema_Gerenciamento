export interface ProjectUpdate {
  nome: string,
  descricao?: string,
  data_inicio: string,
  data_fim: string,
  status: string,
  prioridade: string,
  projetoId: number,
  usuarioId: number,
}
