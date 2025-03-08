import { ActivityResponse } from "../../activity/ActivityResponse";

export interface ReportProject {
  atividades: ActivityResponse[],
  dadosGraficoBarras: [{
    id: number,
    nome: string,
    totalHoras: number
  }],
  detalhes: {
    id: number,
    nome: string,
    data_inicio : string,
    data_fim: string,
    quantidadeIntegrantes: number,
    totalHoras: number,
    totalAtividades: number,
    atividadesConcluidas: number,
    atividadesEmAndamento: number,
    atividadesAbertas: number,
    atividadesPausadas: number
  }
}
