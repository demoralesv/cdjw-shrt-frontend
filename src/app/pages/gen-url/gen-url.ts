// aqui es donde el usuario genera la URL corta
import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UrlService, UrlDoc } from '../../services/url';

@Component({
  selector: 'app-gen-url',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './gen-url.html',
  styleUrls: ['./gen-url.css']
})
export class GenUrl {
  originalUrl = '';
  loading = false;
  error = '';
  result: UrlDoc | null = null;

  constructor(private urlService: UrlService, private cdr: ChangeDetectorRef) {}
  // cuando el usuario presiona crear
  create() {
    this.error = '';
    this.result = null;

    const value = this.originalUrl.trim();
    if (!value) {
      this.error = 'Ingrese una URL válida.';
      this.cdr.detectChanges();
      return;
    }

    this.loading = true;
    this.cdr.detectChanges();
    
    // se llama al backend
    this.urlService.create(value).subscribe({
      // petición funciona
      next: (doc: UrlDoc) => { 
	this.result = doc; 
	this.loading = false; 
	this.cdr.detectChanges(); 
    },
      error: (e: any) => { 
	this.error = e?.error?.error || 'Error creando la URL.'; 
	this.loading = false; 
	this.cdr.detectChanges() 
      }
    });
  }
}
