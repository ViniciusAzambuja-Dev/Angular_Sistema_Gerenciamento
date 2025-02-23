import { HourResponse } from "../hour/HourResponse";

export interface ActivityResponse {
  id: number;
  nome: string;
  descricao: string;
  data_inicio: string;
  data_fim: string;
  status: string;
  nomeProjeto: string;
  nomeUsuario: string;
  horasLancadas?: HourResponse[];
}
