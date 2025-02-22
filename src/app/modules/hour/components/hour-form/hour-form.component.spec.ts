import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourFormComponent } from './hour-form.component';

describe('HourFormComponent', () => {
  let component: HourFormComponent;
  let fixture: ComponentFixture<HourFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HourFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
