import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHistorialComponent } from './view-historial.component';

describe('ViewHistorialComponent', () => {
  let component: ViewHistorialComponent;
  let fixture: ComponentFixture<ViewHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewHistorialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
