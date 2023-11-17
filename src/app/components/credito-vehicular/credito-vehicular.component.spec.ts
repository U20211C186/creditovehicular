import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditoVehicularComponent } from './credito-vehicular.component';

describe('CreditoVehicularComponent', () => {
  let component: CreditoVehicularComponent;
  let fixture: ComponentFixture<CreditoVehicularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreditoVehicularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreditoVehicularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
