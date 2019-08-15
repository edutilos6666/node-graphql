import { Component, OnInit } from '@angular/core';
import  { Apollo } from "apollo-angular";
import gql from "graphql-tag";
import { Book } from "../model/book";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  displayedColumns: string[] = ["title", "author"];
  data: Book[] = [];
  resp: any = {};
  isLoadingRsults: boolean = true;
  constructor(private apollo: Apollo) { }

  ngOnInit() {
    this.apollo.query({
      query: gql `{ books { _id, title, author }}`
    }).subscribe(res=> {
      this.resp = res;
      this.data = this.resp.data.books;
      console.log(this.data);
      this.isLoadingRsults = false;
    });
  }

}
