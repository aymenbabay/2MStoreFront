import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandLineModalComponent } from './command-line-modal.component';

describe('CommandLineModalComponent', () => {
  let component: CommandLineModalComponent;
  let fixture: ComponentFixture<CommandLineModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommandLineModalComponent]
    });
    fixture = TestBed.createComponent(CommandLineModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
