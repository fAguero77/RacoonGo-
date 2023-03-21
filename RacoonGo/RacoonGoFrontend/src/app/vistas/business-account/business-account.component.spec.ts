import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessAccountComponent } from './business-account.component';

describe('BusinessAccountComponent', () => {
  let component: BusinessAccountComponent;
  let fixture: ComponentFixture<BusinessAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
