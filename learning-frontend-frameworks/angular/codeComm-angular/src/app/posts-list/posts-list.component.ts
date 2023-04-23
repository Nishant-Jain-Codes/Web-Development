import { Component,OnInit } from '@angular/core';
import { PostsListService } from '../posts-list.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: any[] = [];
  constructor(private postsListService: PostsListService) { }
  ngOnInit(): void {
    this.getPosts();
  }
  getPosts():void {
    this.postsListService.getPosts().subscribe((response) => (this.posts = response.posts));
  }
}
