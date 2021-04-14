import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  data: any;
  page: number;
  limit:number; 

  constructor(private _bookService: BookService) { }

  ngOnInit(): void {
    this._bookService.getBooks(this.page, this.limit).subscribe((result: any) => {
      console.log(result)
      this.data = result.data.data;
    })
  }

}
