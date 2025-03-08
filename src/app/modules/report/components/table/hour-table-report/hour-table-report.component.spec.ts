import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourTableReportComponent } from './hour-table-report.component';

describe('HourTableReportComponent', () => {
  let component: HourTableReportComponent;
  let fixture: ComponentFixture<HourTableReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HourTableReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourTableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
