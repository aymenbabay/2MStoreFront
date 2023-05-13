import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerByIdComponent } from './worker-by-id.component';

describe('WorkerByIdComponent', () => {
  let component: WorkerByIdComponent;
  let fixture: ComponentFixture<WorkerByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkerByIdComponent]
    });
    fixture = TestBed.createComponent(WorkerByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
