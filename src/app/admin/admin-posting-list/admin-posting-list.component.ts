import { Component, OnInit } from '@angular/core';
import { Posting } from '../../../models/posting';
import { PostingService } from '../../../services/posting.service';

@Component({
  selector: 'app-admin-posting-list',
  templateUrl: './admin-posting-list.component.html',
  styleUrls: ['./admin-posting-list.component.css']
})
export class AdminPostingListComponent implements OnInit {

  postings: Posting[];

  constructor(private postingService: PostingService) { }

  ngOnInit() {
    this.getPostings();
  }

  getPostings(): void {
    this.postingService.getAllPostings().subscribe(postings => this.postings = postings);
  }

}
