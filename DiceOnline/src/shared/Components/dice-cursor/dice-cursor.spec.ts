import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceCursor } from './dice-cursor';

describe('DiceCursor', () => {
  let component: DiceCursor;
  let fixture: ComponentFixture<DiceCursor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiceCursor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceCursor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
