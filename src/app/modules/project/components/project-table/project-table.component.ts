import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.scss'
})
export class ProjectTableComponent {
  @Input() projects: Array<ProjectResponse> = [];
  @Output() projectExpanded = new EventEmitter<number>();

  public projectSelected!: ProjectResponse;

  getActivity(projectId: number) {
    this.projectExpanded.emit(projectId)
  }
}
