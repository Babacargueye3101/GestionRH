import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaiesComponent } from './paies.component';

describe('PaiesComponent', () => {
  let component: PaiesComponent;
  let fixture: ComponentFixture<PaiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaiesComponent]
    });
    fixture = TestBed.createComponent(PaiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
