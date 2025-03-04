import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-report-home',
  templateUrl: './report-home.component.html',
  styleUrl: './report-home.component.scss'
})
export class ReportHomeComponent implements OnInit, OnDestroy{
  private destroy$ : Subject<void> = new Subject;

  constructor() {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
