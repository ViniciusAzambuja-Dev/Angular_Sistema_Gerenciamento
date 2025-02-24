import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { UserResponse } from '../../../../models/interfaces/user/UserResponse';
import { UserService } from '../../../../services/user/user.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.scss'
})
export class UserHomeComponent {
  private destroy$: Subject<void> = new Subject;
  public usersDatas: Array<UserResponse> = [];

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserDatas();
  }

  getUserDatas(): void {
    this.userService
    .getAllUsers()
    .pipe(takeUntil(this.destroy$))
    .subscribe({
      next: (response) => {
        if(response.length > 0) {
          this.usersDatas = response;
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: 'Erro ao buscar usuários',
          life: 2500,
        });
        this.router.navigate(['/dashboard']);
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
