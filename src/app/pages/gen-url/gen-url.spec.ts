import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenURL } from './gen-url';

describe('GenURL', () => {
  let component: GenURL;
  let fixture: ComponentFixture<GenURL>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GenURL],
    }).compileComponents();

    fixture = TestBed.createComponent(GenURL);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
