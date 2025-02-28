import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VenteDetailsDialogComponent } from './vente-details-dialog.component';

describe('VenteDetailsDialogComponent', () => {
  let component: VenteDetailsDialogComponent;
  let fixture: ComponentFixture<VenteDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VenteDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(VenteDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
