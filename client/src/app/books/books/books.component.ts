import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  constructor(
    private readonly router: Router
  ) { }

  ngOnInit() {
  }

  public redirectToBook(bookId: string): void {
    this.router.navigate(['/books', bookId]);
  }

}
