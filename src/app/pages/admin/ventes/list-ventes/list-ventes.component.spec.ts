import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVentesComponent } from './list-ventes.component';

describe('ListVentesComponent', () => {
  let component: ListVentesComponent;
  let fixture: ComponentFixture<ListVentesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListVentesComponent]
    });
    fixture = TestBed.createComponent(ListVentesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
