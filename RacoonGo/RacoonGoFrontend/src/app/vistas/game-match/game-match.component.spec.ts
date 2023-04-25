import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameMatchComponent } from './game-match.component';

describe('GameMatchComponent', () => {
  let component: GameMatchComponent;
  let fixture: ComponentFixture<GameMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameMatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
