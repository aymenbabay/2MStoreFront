import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderModalComponent } from './bon-decommand-modal.component';

describe('BonDecommandModalComponent', () => {
  let component: PurchaseOrderModalComponent;
  let fixture: ComponentFixture<PurchaseOrderModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseOrderModalComponent]
    });
    fixture = TestBed.createComponent(PurchaseOrderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
