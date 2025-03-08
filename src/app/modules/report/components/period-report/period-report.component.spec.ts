import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeriodReportComponent } from './period-report.component';

describe('PeriodReportComponent', () => {
  let component: PeriodReportComponent;
  let fixture: ComponentFixture<PeriodReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeriodReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeriodReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
