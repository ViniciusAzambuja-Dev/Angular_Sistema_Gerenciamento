import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HourResponse } from '../../../../models/interfaces/hour/HourResponse';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { HourEvent } from '../../../../models/enums/hour/HourEvent';
import { DeleteAction } from '../../../../models/interfaces/events/DeleteAction';

@Component({
  selector: 'app-hour-table',
  templateUrl: './hour-table.component.html',
  styleUrl: './hour-table.component.scss'
})
export class HourTableComponent {
  @Input() hours: Array<HourResponse> = [];
  @Output() hourEvent = new EventEmitter<EventAction>();
  @Output() deleteHourEvent = new EventEmitter<DeleteAction>

   public hourSelected!: HourResponse;
   public addHourEvent = HourEvent.ADD_HOUR_EVENT;
   public editHourEvent = HourEvent.EDIT_HOUR_EVENT;

   handleHourEvent(action: string, id?: number) {
    if(action && action !== '') {
      const hourEventData = id ? {action, id} : {action};
      this.hourEvent.emit(hourEventData);
    }
   }

   handleDeleteHour(id: number) {
    if(id) {
      const hourEventData = {id};
      this.deleteHourEvent.emit(hourEventData);
    }
  }
}
