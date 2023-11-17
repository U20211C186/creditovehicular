import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarSessionComponent } from './toolbar-session.component';

describe('ToolbarSessionComponent', () => {
  let component: ToolbarSessionComponent;
  let fixture: ComponentFixture<ToolbarSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToolbarSessionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
