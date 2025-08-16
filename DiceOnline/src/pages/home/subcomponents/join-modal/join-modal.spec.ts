import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JoinModal } from './join-modal';

describe('JoinModal', () => {
  let component: JoinModal;
  let fixture: ComponentFixture<JoinModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JoinModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JoinModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
