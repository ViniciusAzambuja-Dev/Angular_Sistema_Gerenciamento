export interface DashboardAdmin {
  projetosConcluidos: number,
  projetosPendentes: number,
  projetosPlanejados: number,
  projetosCancelados: number,
  atividadesConcluidas: number,
  atividadesPendentes: number,
  atividadesAbertas: number,
  atividadesPausadas: number,
  usuariosAtivos: number,
  totalHorasPorMes: number
  dadosGraficoBarras: [{
    id: number,
    nome: string,
    totalHoras: number
  }]
}
