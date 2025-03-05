import { Component } from '@angular/core';

@Component({
  selector: 'app-activity-table-report',
  templateUrl: './activity-table-report.component.html',
  styleUrl: './activity-table-report.component.scss'
})
export class ActivityTableReportComponent {
  getSeverityStatus(status: string): "success"  | "info" | "warning" | "danger" {
    const statusMap: { [key: string]: "success" | "info" | "warning" | "danger" } = {
      'ABERTA': 'info',
      'PAUSADA': 'danger',
      'EM_ANDAMENTO': 'warning',
      'CONCLUIDA': 'success',
    };
    return statusMap[status] || "info";
  }
}
