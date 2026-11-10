import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authors',
  imports: [FormsModule, CommonModule],
  templateUrl: './authors.html',
  styleUrl: './authors.css'
})
export class Authors {

  private http = inject(HttpClient);

  authorId: number | null = null;
  author: any = null;
  errorMessage: string = '';

  searchAuthor() {
    this.author = null;
    this.errorMessage = '';

    if (this.authorId === null || this.authorId <= 0) {
      this.errorMessage = 'Veuillez entrer un identifiant valide.';
      return;
    }

    this.http.get<any>(
      'http://localhost:8080/books-api/authors/' + this.authorId
    ).subscribe({
      next: (response) => {
        this.author = response;
      },
      error: (error) => {
        if (error.status === 404) {
          this.errorMessage = 'Aucun auteur trouvé avec cet identifiant.';
        } else {
          this.errorMessage = 'Une erreur est survenue lors de la recherche.';
        }
      }
    });
  }
}
