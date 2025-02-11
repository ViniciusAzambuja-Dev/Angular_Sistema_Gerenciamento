export interface ProjectResponse {
  id: number,
  nome: string,
  descricao: string,
  data_inicio: string,
  data_fim: string,
  status: string,
  prioridade: string,
  usuario: {
    id: number,
    nome: string,
    perfil: string,
  }
}
