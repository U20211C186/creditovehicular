import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefinanciamientoComponent } from './refinanciamiento.component';

describe('RefinanciamientoComponent', () => {
  let component: RefinanciamientoComponent;
  let fixture: ComponentFixture<RefinanciamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RefinanciamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefinanciamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
