import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostingApplicationsComponent } from './admin-posting-applications.component';

describe('AdminPostingApplicationsComponent', () => {
  let component: AdminPostingApplicationsComponent;
  let fixture: ComponentFixture<AdminPostingApplicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostingApplicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostingApplicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
