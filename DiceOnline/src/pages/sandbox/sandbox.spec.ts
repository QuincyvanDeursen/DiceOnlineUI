import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sandbox } from './sandbox';

describe('Sandbox', () => {
  let component: Sandbox;
  let fixture: ComponentFixture<Sandbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sandbox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sandbox);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
