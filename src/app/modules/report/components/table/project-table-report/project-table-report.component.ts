import { Component, Input } from '@angular/core';
import { ProjectResponse } from '../../../../../models/interfaces/project/ProjectResponse';

@Component({
  selector: 'app-project-table-report',
  templateUrl: './project-table-report.component.html',
  styleUrl: './project-table-report.component.scss'
})
export class ProjectTableReportComponent {
  @Input() projects: Array<ProjectResponse> = [];

  getSeverityStatus(status: string): "success" | "info" | "warning" | "danger" {
    const statusMap: { [key: string]: "success" | "info" | "warning" | "danger" } = {
      'PLANEJADO': 'info',
      'EM_ANDAMENTO': 'warning',
      'CONCLUIDO': 'success',
      'CANCELADO': 'danger'
    };
    return statusMap[status] || "info";
  }

  getSeverityPriority(priority: string): "info" | "warning" | "danger" {
    const priorityMap: { [key: string]: "info" | "warning" | "danger" } = {
      'ALTA': 'danger',
      'MEDIA': 'warning',
      'BAIXA': 'info',
    };
    return priorityMap[priority] || "info";
  }
}
