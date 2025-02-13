import { Component } from '@angular/core';
import { FileUploadService } from 'src/app/services/file-upload.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {
  selectedFile: File | null = null;
  uploadStatus: string | null = null;
  selectedFileName: string = '';

  constructor(private fileUploadService: FileUploadService) { }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.selectedFileName = event.target.files[0].name; // Mettez à jour le nom du fichier ici
  }

  uploadFile() {
    if (this.selectedFile) {
      this.fileUploadService.uploadFile(this.selectedFile).subscribe(
        (response) => {
          console.log('Upload successful', response);
          this.uploadStatus = 'Fichier uploadé avec succès'; // Mettez à jour le statut de l'upload
        },
        (error) => {
          console.error('Upload failed', error);
          this.uploadStatus = 'Erreur lors de l\'upload du fichier'; // Mettez à jour le statut de l'upload en cas d'erreur
        }
      );
    }
  }
}
