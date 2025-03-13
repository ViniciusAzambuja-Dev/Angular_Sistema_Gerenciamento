import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourHomeComponent } from './hour-home.component';

describe('HourHomeComponent', () => {
  let component: HourHomeComponent;
  let fixture: ComponentFixture<HourHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HourHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HourHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
