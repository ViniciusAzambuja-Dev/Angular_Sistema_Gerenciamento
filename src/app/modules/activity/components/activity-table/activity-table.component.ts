import { Component, Input } from '@angular/core';
import { ActivityResponse } from '../../../../models/interfaces/activity/ActivityResponse';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrl: './activity-table.component.scss'
})
export class ActivityTableComponent {
  @Input() activities: Array<ActivityResponse> = [];

  public activitySelected!: ActivityResponse;
}
