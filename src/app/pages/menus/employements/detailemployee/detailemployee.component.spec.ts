import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailemployeeComponent } from './detailemployee.component';

describe('DetailemployeeComponent', () => {
  let component: DetailemployeeComponent;
  let fixture: ComponentFixture<DetailemployeeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailemployeeComponent]
    });
    fixture = TestBed.createComponent(DetailemployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
