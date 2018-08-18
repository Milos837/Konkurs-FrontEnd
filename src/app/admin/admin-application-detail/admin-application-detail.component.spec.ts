import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminApplicationDetailComponent } from './admin-application-detail.component';

describe('AdminApplicationDetailComponent', () => {
  let component: AdminApplicationDetailComponent;
  let fixture: ComponentFixture<AdminApplicationDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminApplicationDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminApplicationDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
