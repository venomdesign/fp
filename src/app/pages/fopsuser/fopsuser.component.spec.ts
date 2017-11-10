import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FopsuserComponent } from './fopsuser.component';

describe('FopsuserComponent', () => {
  let component: FopsuserComponent;
  let fixture: ComponentFixture<FopsuserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FopsuserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FopsuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
