import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSubscriptionTypeDialogComponent } from './add-edit-subscription-type-dialog.component';

describe('AddEditSubscriptionTypeDialogComponent', () => {
  let component: AddEditSubscriptionTypeDialogComponent;
  let fixture: ComponentFixture<AddEditSubscriptionTypeDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditSubscriptionTypeDialogComponent]
    });
    fixture = TestBed.createComponent(AddEditSubscriptionTypeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
