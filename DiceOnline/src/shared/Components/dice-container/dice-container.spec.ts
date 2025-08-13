import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceContainer } from './dice-container';

describe('DiceContainer', () => {
  let component: DiceContainer;
  let fixture: ComponentFixture<DiceContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
