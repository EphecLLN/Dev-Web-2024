import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private url = `${environment.apiUrl}/upload`

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<string> {
    const formData = new FormData();
    formData.append('myFile', file, file.name);
    
    return this.http.post(this.url, formData, { responseType: 'text' })
      .pipe(
        map(response => response as string)
      );
  }
}