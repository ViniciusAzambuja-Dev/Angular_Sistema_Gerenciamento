import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserResponse } from '../../../../models/interfaces/user/UserResponse';
import { EventAction } from '../../../../models/interfaces/events/EventAction';
import { UserEvent } from '../../../../models/enums/user/UserEvent';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  @Input() users: Array<UserResponse> = [];
  @Output() userEvent = new EventEmitter<EventAction>();

  public userSelected!: UserResponse;

  public addUserEvent = UserEvent.ADD_USER_EVENT;
  public editUserEvent = UserEvent.EDIT_USER_EVENT;

  handleUserEvent(action: string, id?: number) {
   if(action && action !== '') {
     const userEventData = id ? {action, id} : {action};
     this.userEvent.emit(userEventData);
   }
  }
}
