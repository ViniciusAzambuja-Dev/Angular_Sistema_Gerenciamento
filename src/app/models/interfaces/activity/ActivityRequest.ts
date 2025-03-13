export interface ActivityRequest {
  nome: string,
  descricao?: string,
  data_inicio: string,
  data_fim: string,
  status: string,
  projetoId: number,
  usuarioId: number,
  integrantesIds: number[]
}
