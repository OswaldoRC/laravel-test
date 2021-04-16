import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookService } from '../services/book.service';
import Swal from 'sweetalert2'
import { DatePipe } from '@angular/common';
import { CategoryService } from '../services/category.service';

enum DialogMode {
  create = 1,
  edit = 2
}

enum StatusMode {
  delete = 1,
  available = 2
}

export interface BookData {
  author: string;
  name: string;
  category_id: number;
  publication_date: Date;
  mode: DialogMode;
}

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  data: any;
  allData: any;
  page: number = 1;
  total_pages: number;
  book: BookData;

  constructor(
    private _bookService: BookService,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) { }

  filterData(keyword: string) {
    if(keyword != '' || keyword != undefined)
      this.data = this.allData.filter(item => !(
        item.name.toLowerCase().indexOf(keyword) === -1 && 
        item.name.toLowerCase().indexOf(keyword) === -1
      ))
    else
      this.data = this.allData;
  }

  fetchData(page:number){
    Swal.fire("Please, wait...")
    Swal.showLoading();
    this._bookService.getBooks(page).subscribe((result: any) => {
      this.page = page;
      this.allData =  result.data.data;
      this.data = result.data.data;
      this.page = result.data.current_page;
      this.total_pages = result.data.last_page;
      Swal.close()
    })
  }

  changeStatus(id:number, body: any, mode: StatusMode){
    Swal.fire({
      title: 'Are you sure?',
      text: mode == StatusMode.delete ? "You won't be able to revert this!" : "This book will be unavailable for borrowing",
      icon: mode == StatusMode.delete ? 'error' : 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Please, wait...")
        Swal.showLoading();
        this._bookService.editBook(id, body).subscribe((result:any) => {
          this.fetchData(this.page);
          Swal.close();
        }, error => {
          console.log(error)
          Swal.fire("Error", "Something went wrong", 'error');
        })
      }
    })
    
  }

  ngOnInit(): void {
    this.fetchData(this.page);
  }

  changePage(page:number){
    this.fetchData(page);
  }

  openDialog(mode: DialogMode): void {
    this.book = {
      author: '',
      name: '',
      category_id: 0,
      publication_date: new Date(),
      mode: mode
    };
    const dialogRef = this.dialog.open(CreateBookDialog, {
      width: '450px',
      data: this.book
    });

    dialogRef.afterClosed().subscribe(result => {
      let body = {
        ...result,
        publication_date: this.datePipe.transform(result.publication_date, 'yyyy-MM-dd')
      }
      Swal.fire('Please, wait...');
      Swal.showLoading();
      this._bookService.saveBook(body).subscribe((result:any) => {
        this.fetchData(this.page);
        Swal.close();
      }, error => {
        console.log(error)
        Swal.fire("Error", "Something went wrong", 'error');
      })
    });
  }

  editDialog(id:number): void{
    let model : BookData = this.data.find(i => i.id==id);
    const dialogRef = this.dialog.open(CreateBookDialog, {
      width: '450px',
      data: model
    });

    dialogRef.afterClosed().subscribe(result => {
      let body = {
        ...result,
        publication_date: this.datePipe.transform(result.publication_date, 'yyyy-MM-dd')
      }
      Swal.fire('Please, wait...');
      Swal.showLoading();
      this._bookService.editBook(id, body).subscribe((result:any) => {
        this.fetchData(this.page);
        Swal.close();
      }, error => {
        console.log(error)
        Swal.fire("Error", "Something went wrong", 'error');
      })
    });
  }

}


@Component({
  selector: 'create-book-dialog',
  templateUrl: './create-book-dialog.html',
})
export class CreateBookDialog {
  book: BookData;
  title:string;

  categories: any;
  constructor(
    public dialogRef: MatDialogRef<CreateBookDialog>,
    @Inject(MAT_DIALOG_DATA) public data: BookData,
    private _categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.book = this.data;
    this.title = this.data.mode == 1 ? 'Create Book' : 'Edit Book';
    Swal.fire("Please, wait...");
    Swal.showLoading()
    this._categoryService.getCategories().subscribe((result:any) => {
      this.categories = result.data;
      Swal.close()
    }, error => {
      Swal.close()
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveBook(){
    
  }

}


