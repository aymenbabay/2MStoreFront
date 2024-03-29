import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentsComponent } from './parents.component';

describe('BranshesComponent', () => {
  let component: ParentsComponent;
  let fixture: ComponentFixture<ParentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParentsComponent]
    });
    fixture = TestBed.createComponent(ParentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
