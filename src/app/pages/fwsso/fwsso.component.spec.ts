import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FwssoComponent } from './fwsso.component';

describe('FwssoComponent', () => {
  let component: FwssoComponent;
  let fixture: ComponentFixture<FwssoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FwssoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FwssoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
