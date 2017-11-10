import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfwssoComponent } from './nfwsso.component';

describe('NfwssoComponent', () => {
  let component: NfwssoComponent;
  let fixture: ComponentFixture<NfwssoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfwssoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfwssoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
