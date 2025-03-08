import { HourResponse } from "../../hour/HourResponse"

export interface ReportActivity {
  horasLancadas: HourResponse[],
  detalhes: {
    id: number,
    nome: string,
    data_registro: string,
    data_inicio : string,
    data_fim: string,
    status: string,
    quantidadeIntegrantes: number,
    totalHoras: number,
  }
}
