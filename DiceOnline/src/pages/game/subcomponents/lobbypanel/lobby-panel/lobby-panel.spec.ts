import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LobbyPanel } from './lobby-panel';

describe('LobbyPanel', () => {
  let component: LobbyPanel;
  let fixture: ComponentFixture<LobbyPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LobbyPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LobbyPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
