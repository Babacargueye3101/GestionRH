import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadLogComponent } from './upload-log.component';

describe('UploadLogComponent', () => {
  let component: UploadLogComponent;
  let fixture: ComponentFixture<UploadLogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadLogComponent]
    });
    fixture = TestBed.createComponent(UploadLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
