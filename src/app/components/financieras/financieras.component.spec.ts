import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancierasComponent } from './financieras.component';

describe('FinancierasComponent', () => {
  let component: FinancierasComponent;
  let fixture: ComponentFixture<FinancierasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FinancierasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinancierasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
