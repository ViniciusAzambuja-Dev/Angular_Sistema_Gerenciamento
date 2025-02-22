export interface ActivityUpdate {
  nome: string,
  descricao?: string,
  data_inicio: string,
  data_fim: string,
  status: string,
  atividadeId: number,
  projetoId: number,
  usuarioId: number,
}
