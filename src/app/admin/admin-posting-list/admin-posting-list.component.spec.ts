import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPostingListComponent } from './admin-posting-list.component';

describe('AdminPostingListComponent', () => {
  let component: AdminPostingListComponent;
  let fixture: ComponentFixture<AdminPostingListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPostingListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPostingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
