import { Component, OnInit } from '@angular/core';
import { Posting } from '../../../models/posting';
import { PostingService } from '../../../services/posting.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-posting-detail',
  templateUrl: './posting-detail.component.html',
  styleUrls: ['./posting-detail.component.css']
})
export class PostingDetailComponent implements OnInit {

  posting: Posting;

  constructor(
    private postingService: PostingService,
    private location: Location,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.posting = new Posting();
    this.getPosting();
    this.getResponsibilities();
    this.getRequirements();
    this.getOffering();
  }

  getPosting(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postingService.getPosting(id).subscribe(posting => this.posting = posting);
  }

  getResponsibilities(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postingService.getResponsibilitiesForPosting(id).subscribe(res => this.posting.responsibilities = res);
  }

  getRequirements(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postingService.getRequirementsForPosting(id).subscribe(req => this.posting.requirements = req);
  }

  getOffering(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postingService.getOfferingForPosting(id).subscribe(off => this.posting.offering = off);
  }

  goBack(): void {
    this.location.back();
  }

}
