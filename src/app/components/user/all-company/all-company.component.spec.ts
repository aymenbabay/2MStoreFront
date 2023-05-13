import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCompanyComponent } from './all-company.component';

describe('AllCompanyComponent', () => {
  let component: AllCompanyComponent;
  let fixture: ComponentFixture<AllCompanyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllCompanyComponent]
    });
    fixture = TestBed.createComponent(AllCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
