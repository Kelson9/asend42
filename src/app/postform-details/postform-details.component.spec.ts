import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostformDetailsComponent } from './postform-details.component';

describe('PostformDetailsComponent', () => {
  let component: PostformDetailsComponent;
  let fixture: ComponentFixture<PostformDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostformDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostformDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
