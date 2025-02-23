import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HourResponse } from '../../../../models/interfaces/hour/HourResponse';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { HourEvent } from '../../../../models/enums/hour/HourEvent';

@Component({
  selector: 'app-hour-table',
  templateUrl: './hour-table.component.html',
  styleUrl: './hour-table.component.scss'
})
export class HourTableComponent {
  @Input() hours: Array<HourResponse> = [];
  @Output() hourEvent = new EventEmitter<EventAction>();

   public hourSelected!: HourResponse;
   public addHourEvent = HourEvent.ADD_HOUR_EVENT;
   public editHourEvent = HourEvent.EDIT_HOUR_EVENT;

   handleHourEvent(action: string, id?: number) {
    if(action && action !== '') {
      const hourEventData = id ? {action, id} : {action};
      this.hourEvent.emit(hourEventData);
    }
   }
}
