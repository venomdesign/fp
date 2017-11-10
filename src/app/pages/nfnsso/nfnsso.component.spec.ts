import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NfnssoComponent } from './nfnsso.component';

describe('NfnssoComponent', () => {
  let component: NfnssoComponent;
  let fixture: ComponentFixture<NfnssoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NfnssoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NfnssoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
