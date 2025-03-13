import { Component, Input } from '@angular/core';

import { ActivityResponse } from '../../../../../models/interfaces/activity/ActivityResponse';

@Component({
  selector: 'app-activity-table-report',
  templateUrl: './activity-table-report.component.html',
  styleUrl: './activity-table-report.component.scss'
})
export class ActivityTableReportComponent {
  @Input() activities: Array<ActivityResponse> = [];

  getSeverityStatus(status: string): "success" | "info" | "warning" | "danger" {
    const statusMap: { [key: string]: "success" | "info" | "warning" | "danger" } = {
      'ABERTA': 'info',
      'EM_ANDAMENTO': 'warning',
      'CONCLUIDA': 'success',
      'PAUSADA': 'danger'
    };
    return statusMap[status] || "info";
  }
}
