import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTableReportComponent } from './project-table-report.component';

describe('ProjectTableReportComponent', () => {
  let component: ProjectTableReportComponent;
  let fixture: ComponentFixture<ProjectTableReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectTableReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProjectTableReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
