import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D6Dice } from './d6-dice';

describe('D6Dice', () => {
  let component: D6Dice;
  let fixture: ComponentFixture<D6Dice>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D6Dice]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D6Dice);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
