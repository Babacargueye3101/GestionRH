import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailPersonnelComponent } from './detail-personnel.component';

describe('DetailPersonnelComponent', () => {
  let component: DetailPersonnelComponent;
  let fixture: ComponentFixture<DetailPersonnelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailPersonnelComponent]
    });
    fixture = TestBed.createComponent(DetailPersonnelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
