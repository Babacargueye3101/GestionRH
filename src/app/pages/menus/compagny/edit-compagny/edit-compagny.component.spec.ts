import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCompagnyComponent } from './edit-compagny.component';

describe('EditCompagnyComponent', () => {
  let component: EditCompagnyComponent;
  let fixture: ComponentFixture<EditCompagnyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCompagnyComponent]
    });
    fixture = TestBed.createComponent(EditCompagnyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
