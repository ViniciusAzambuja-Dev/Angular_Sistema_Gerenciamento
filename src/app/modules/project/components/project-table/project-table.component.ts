import { Component, Input } from '@angular/core';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';

@Component({
  selector: 'app-project-table',
  templateUrl: './project-table.component.html',
  styleUrl: './project-table.component.scss'
})
export class ProjectTableComponent {
  @Input() projects: Array<ProjectResponse> = [];

  public projectSelected!: ProjectResponse;
}
