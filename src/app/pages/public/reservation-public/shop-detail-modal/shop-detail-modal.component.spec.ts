import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopDetailModalComponent } from './shop-detail-modal.component';

describe('ShopDetailModalComponent', () => {
  let component: ShopDetailModalComponent;
  let fixture: ComponentFixture<ShopDetailModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShopDetailModalComponent]
    });
    fixture = TestBed.createComponent(ShopDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
