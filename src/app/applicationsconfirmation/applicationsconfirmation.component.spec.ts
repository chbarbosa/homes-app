import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationsconfirmationComponent } from './applicationsconfirmation.component';

describe('ApplicationsconfirmationComponent', () => {
  let component: ApplicationsconfirmationComponent;
  let fixture: ComponentFixture<ApplicationsconfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApplicationsconfirmationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApplicationsconfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
