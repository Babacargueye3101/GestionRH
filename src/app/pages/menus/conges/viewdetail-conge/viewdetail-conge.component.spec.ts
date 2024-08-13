import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewdetailCongeComponent } from './viewdetail-conge.component';

describe('ViewdetailCongeComponent', () => {
  let component: ViewdetailCongeComponent;
  let fixture: ComponentFixture<ViewdetailCongeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewdetailCongeComponent]
    });
    fixture = TestBed.createComponent(ViewdetailCongeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
