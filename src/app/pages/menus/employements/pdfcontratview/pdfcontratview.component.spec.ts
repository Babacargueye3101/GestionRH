import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfcontratviewComponent } from './pdfcontratview.component';

describe('PdfcontratviewComponent', () => {
  let component: PdfcontratviewComponent;
  let fixture: ComponentFixture<PdfcontratviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PdfcontratviewComponent]
    });
    fixture = TestBed.createComponent(PdfcontratviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
