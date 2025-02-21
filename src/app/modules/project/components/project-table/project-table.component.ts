import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProjectResponse } from '../../../../models/interfaces/project/ProjectResponse';
import { ProjectEvent } from '../../../../models/enums/project/ProjectEvent';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { DeleteAction } from '../../../../models/interfaces/events/DeleteAction';

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

  public projectSelected!: ProjectResponse;
  public addProjectEvent = ProjectEvent.ADD_PROJECT_EVENT;
  public editProjectEvent = ProjectEvent.EDIT_PROJECT_EVENT;

  handleProjectEvent(action: string, id?: string): void {
    if(action && action !== '') {
      const projectEventData = id && id !== "" ? {action, id} : {action};
      this.projectEvent.emit(projectEventData);
    }
  }

  handleDeleteProject(id: number, name: string) {
    if(id && name !== '') {
      const projectEventData = {id, name};
      this.deleteProjectEvent.emit(projectEventData);
    }
  }

  getActivity(projectId: number) {
    this.projectExpanded.emit(projectId)
  }
}
