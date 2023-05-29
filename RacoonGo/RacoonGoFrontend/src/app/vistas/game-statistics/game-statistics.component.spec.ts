import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameStatisticsComponent } from './game-statistics.component';

describe('GameStatisticsComponent', () => {
  let component: GameStatisticsComponent;
  let fixture: ComponentFixture<GameStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameStatisticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
