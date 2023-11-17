import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCronogramaComponent } from './view-cronograma.component';

describe('ViewCronogramaComponent', () => {
  let component: ViewCronogramaComponent;
  let fixture: ComponentFixture<ViewCronogramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCronogramaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCronogramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
