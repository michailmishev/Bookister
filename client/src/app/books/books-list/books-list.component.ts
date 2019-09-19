import { Component, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { BooksDataServices } from 'src/app/core/services/books-data.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  //
  @Output()
  private booksSubscription: Subscription;
  //

  constructor(

    //
    private readonly booksDataService: BooksDataServices,
    //

  ) { }

  ngOnInit() {

    //
    this.booksSubscription = this.booksDataService.getAllBooks().subscribe(
      //
    );
    //

  }

}
