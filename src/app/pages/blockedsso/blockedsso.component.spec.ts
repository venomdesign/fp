import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedssoComponent } from './blockedsso.component';

describe('BlockedssoComponent', () => {
  let component: BlockedssoComponent;
  let fixture: ComponentFixture<BlockedssoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedssoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedssoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
