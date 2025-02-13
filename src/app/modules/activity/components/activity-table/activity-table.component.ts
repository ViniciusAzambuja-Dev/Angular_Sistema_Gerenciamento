import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss'
})
export class ActivityTableComponent {
  @Input() activities: Array<ActivityResponse> = [];
  @Output() activityExpanded = new EventEmitter<number>();

  public activitySelected!: ActivityResponse;

  getHour(activityId: number) {
    this.activityExpanded.emit(activityId)
  }
}
