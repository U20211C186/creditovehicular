import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCuotonComponent } from './view-cuoton.component';

describe('ViewCuotonComponent', () => {
  let component: ViewCuotonComponent;
  let fixture: ComponentFixture<ViewCuotonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewCuotonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewCuotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
