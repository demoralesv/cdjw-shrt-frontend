// test de Angular
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewStats } from './view-stats';

describe('ViewStats', () => {
  let component: ViewStats;
  let fixture: ComponentFixture<ViewStats>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewStats],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewStats);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
