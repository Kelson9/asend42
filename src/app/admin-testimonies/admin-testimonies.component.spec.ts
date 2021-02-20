import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTestimoniesComponent } from './admin-testimonies.component';

describe('AdminTestimoniesComponent', () => {
  let component: AdminTestimoniesComponent;
  let fixture: ComponentFixture<AdminTestimoniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTestimoniesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTestimoniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
