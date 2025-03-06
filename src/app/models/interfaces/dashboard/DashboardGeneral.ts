export interface DashboardGeneral {
  projetosPendentes: number,
  atividadesPendentes: number,
  totalHorasPorMes: number
  projPorPrioridade: [{
    prioridade: string,
    totalProjetos: number
  }],
  projPorStatus: [{
    status: string,
    totalProjetos: number
  }],
  ativPorStatus: [{
    status: string,
    totalAtividades: number
  }]
}
