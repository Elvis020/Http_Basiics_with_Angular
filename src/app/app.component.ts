import { Component } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Post } from './post';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import {of} from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fireship-tuto';
  posts: Observable<any[]>;
  newPost: Observable<any[]>;
  readonly URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient){

  }


  // A function to get all posts from the JSON Placeholder API
  // tslint:disable-next-line: typedef
  getAllPosts() {

    // Using angular's inbuilt HTTP params to help give dynamic parameters
    let params = new HttpParams().set('userId', '1');



    // Using Headers for authentication reasons
    let headers = new HttpHeaders().set('Authorization', 'auth-token');
    this.posts = this.http.get<any[]>(this.URL + '/posts', {params,  headers});
  }



  // A function to create a new Post
  createPost() {
    const data: Post = {
      id: null,
      userId: 23,
      title: 'My new Post',
      body: 'Hello World🐺'
    };

  //   this.newPost = this.http.post<any[]>(this.URL + '/posts', data);
  // }

  // Mapping to on;y the title object in the incoming data array
    // this.newPost = this.http.post<any[]>(this.URL + '/posts', data)
    //   .map( post => post.title); It ddnt work


    // Handling non-existing end-points
    this.newPost = this.http.post<any[]>(this.URL + '/foo', data)
        .retry(3)
        .catch(err => {
          console.log(err);
          // New of Handling errors with Observable
          return of(err);
        });
  }

}
