import { Component, Input } from '@angular/core';
import { HourResponse } from '../../../../models/interfaces/hour/HourResponse';

@Component({
  selector: 'app-hour-table',
  templateUrl: './hour-table.component.html',
  styleUrl: './hour-table.component.scss'
})
export class HourTableComponent {
  @Input() hours: Array<HourResponse> = [];

   public hourSelected!: HourResponse;
}
