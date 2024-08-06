import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompagnymodalComponent } from './compagnymodal.component';

describe('CompagnymodalComponent', () => {
  let component: CompagnymodalComponent;
  let fixture: ComponentFixture<CompagnymodalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompagnymodalComponent]
    });
    fixture = TestBed.createComponent(CompagnymodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
