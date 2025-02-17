import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { ActivityEvent } from '../../../../models/enums/activity/ActivityEvent';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss'
})
export class ActivityTableComponent {
  @Input() activities: Array<ActivityResponse> = [];
  @Output() activityExpanded = new EventEmitter<number>();
  @Output() activityEvent = new EventEmitter<EventAction>();

  public activitySelected!: ActivityResponse;
  public addActivityEvent = ActivityEvent.ADD_ACTIVITY_EVENT;
  public editActivityEvent = ActivityEvent.EDIT_ACTIVITY_EVENT;

  getHour(activityId: number) {
    this.activityExpanded.emit(activityId)
  }

  handleActivityEvent(action: string, id?: string): void {
    if(action && action !== "") {
      const activityEventData = id && id !== "" ? {action, id} : {action};
      this.activityEvent.emit(activityEventData);
    }
  }
}
