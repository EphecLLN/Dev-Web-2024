import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileUploadComponent } from './file-upload.component';
import { Observable, of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

describe('FileUploadComponent', () => {
  let component: FileUploadComponent;
  let fixture: ComponentFixture<FileUploadComponent>;

  class FileUploadServiceStub {
    uploadFile(file: File): Observable<string> {
      // Simulate a successful file upload
      return of('mock-file-url');
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileUploadComponent],
      imports: [HttpClientModule],
      providers: [{ provide: FileUploadServiceStub, useClass: FileUploadServiceStub }]
    });
    fixture = TestBed.createComponent(FileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
