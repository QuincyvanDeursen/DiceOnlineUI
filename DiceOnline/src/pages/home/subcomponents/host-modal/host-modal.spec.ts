import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HostModal } from './host-modal';

describe('HostModal', () => {
  let component: HostModal;
  let fixture: ComponentFixture<HostModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HostModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
