import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewClientsDialogComponent } from './view-clients-dialog.component';

describe('ViewClientsDialogComponent', () => {
  let component: ViewClientsDialogComponent;
  let fixture: ComponentFixture<ViewClientsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewClientsDialogComponent]
    });
    fixture = TestBed.createComponent(ViewClientsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
