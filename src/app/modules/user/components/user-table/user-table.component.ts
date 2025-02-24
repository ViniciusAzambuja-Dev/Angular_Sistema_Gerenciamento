import { Component, Input } from '@angular/core';
import { UserResponse } from '../../../../models/interfaces/user/UserResponse';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss'
})
export class UserTableComponent {
  @Input() users: Array<UserResponse> = [];

  public userSelected!: UserResponse;
}
