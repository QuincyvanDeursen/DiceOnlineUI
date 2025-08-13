import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameNav } from './game-nav';

describe('GameNav', () => {
  let component: GameNav;
  let fixture: ComponentFixture<GameNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameNav]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameNav);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
