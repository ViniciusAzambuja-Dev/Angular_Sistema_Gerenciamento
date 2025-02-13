import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityHomeComponent } from './activity-home.component';

describe('ActivityHomeComponent', () => {
  let component: ActivityHomeComponent;
  let fixture: ComponentFixture<ActivityHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ActivityHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivityHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
