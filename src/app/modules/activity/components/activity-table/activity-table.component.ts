import { Component, EventEmitter, Input, Output } from '@angular/core';

import { ActivityEvent } from '../../../../models/enums/activity/ActivityEvent';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';
import { DeleteAction } from '../../../../models/interfaces/events/DeleteAction';
import { EventAction } from '../../../../models/interfaces/events/EventAction';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss'
})
export class ActivityTableComponent {
  @Input() activities: Array<ActivityResponse> = [];
  @Output() activityExpanded = new EventEmitter<number>();
  @Output() deleteActivityEvent = new EventEmitter<DeleteAction>
  @Output() activityEvent = new EventEmitter<EventAction>();
  @Output() dropdownEvent = new EventEmitter<string>();

  public dropdownDatas = [
    {type:'Todos'},
    {type:'Relacionados'}
  ];
  public activitySelected!: ActivityResponse;
  public addActivityEvent = ActivityEvent.ADD_ACTIVITY_EVENT;
  public editActivityEvent = ActivityEvent.EDIT_ACTIVITY_EVENT;

  getHour(activityId: number) {
    this.activityExpanded.emit(activityId)
  }

  handleActivityEvent(action: string, id?: number): void {
    if(action && action !== "") {
      const activityEventData = id ? {action, id} : {action};
      this.activityEvent.emit(activityEventData);
    }
  }

  handleDeleteActivity(id: number, name: string) {
    if(id && name !== '') {
      const activityEventData = {id, name};
      this.deleteActivityEvent.emit(activityEventData);
    }
  }

  handleDropdownEvent(event: any): void {
    if(event.value !== '') {
      const dropdownEventData = event.value;
      this.dropdownEvent.emit(dropdownEventData);
    }
  }

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
