export interface DashboardGeneral {
  projetosPendentes: number,
  atividadesPendentes: number,
  totalHorasPorMes: number
  projPorPrioridade: [{
    dados: string,
    total: number
  }],
  projPorStatus: [{
    dados: string,
    total: number
  }],
  ativPorStatus: [{
    dados: string,
    total: number
  }]
}
