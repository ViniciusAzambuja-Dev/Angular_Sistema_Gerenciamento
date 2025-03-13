import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityTableReportComponent } from './activity-table-report.component';

describe('ActivityTableReportComponent', () => {
  let component: ActivityTableReportComponent;
  let fixture: ComponentFixture<ActivityTableReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityTableReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityTableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
