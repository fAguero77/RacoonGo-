import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorFormComponent } from './sponsor-form.component';

describe('SponsorFormComponent', () => {
  let component: SponsorFormComponent;
  let fixture: ComponentFixture<SponsorFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsorFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
