import { ActivityResponse } from "../activity/ActivityResponse";

export interface ProjectResponse {
  id: number,
  nome: string,
  descricao: string,
  data_inicio: string,
  data_fim: string,
  status: string,
  prioridade: string,
  nomeUsuario: string
  atividades?: ActivityResponse[];
}
