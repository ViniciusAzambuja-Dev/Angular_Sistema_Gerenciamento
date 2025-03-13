import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ProjectEvent } from '../../../../models/enums/project/ProjectEvent';
import { DeleteAction } from '../../../../models/interfaces/events/DeleteAction';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.scss'
})
export class ProjectTableComponent {
  @Input() projects: Array<ProjectResponse> = [];
  @Output() projectExpanded = new EventEmitter<number>();
  @Output() deleteProjectEvent = new EventEmitter<DeleteAction>
  @Output() projectEvent = new EventEmitter<EventAction>();
  @Output() dropdownEvent = new EventEmitter<string>();

  public dropdownDatas = [
    {type:'Todos'},
    {type:'Relacionados'}
  ];
  public projectSelected!: ProjectResponse;
  public addProjectEvent = ProjectEvent.ADD_PROJECT_EVENT;
  public editProjectEvent = ProjectEvent.EDIT_PROJECT_EVENT;

  handleProjectEvent(action: string, id?: number): void {
    if(action && action !== '') {
      const projectEventData = id ? {action, id} : {action};
      this.projectEvent.emit(projectEventData);
    }
  }

  handleDeleteProject(id: number, name: string) {
    if(id && name !== '') {
      const projectEventData = {id, name};
      this.deleteProjectEvent.emit(projectEventData);
    }
  }

  handleDropdownEvent(event: any): void {
    if(event.value !== '') {
      const dropdownEventData = event.value;
      this.dropdownEvent.emit(dropdownEventData);
    }
  }

  getActivity(projectId: number) {
    this.projectExpanded.emit(projectId)
  }

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
