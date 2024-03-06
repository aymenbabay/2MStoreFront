import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentByIdComponent } from './payment-by-id.component';

describe('PaymentByIdComponent', () => {
  let component: PaymentByIdComponent;
  let fixture: ComponentFixture<PaymentByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentByIdComponent]
    });
    fixture = TestBed.createComponent(PaymentByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
