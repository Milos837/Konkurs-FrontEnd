import { Component, OnInit } from '@angular/core';
import { Posting } from '../../../models/posting';
import { PostingService } from '../../../services/posting.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../../../models/application';
import { ApplicationService } from '../../../services/application.service';

@Component({
  selector: 'app-admin-posting-applications',
  templateUrl: './admin-posting-applications.component.html',
  styleUrls: ['./admin-posting-applications.component.css']
})
export class AdminPostingApplicationsComponent implements OnInit {
  posting: Posting;
  applications: Application[];
  searchTerm: string;

  constructor(
    private postingService: PostingService,
    private location: Location,
    private route: ActivatedRoute,
    private applicationService: ApplicationService
  ) { }

  ngOnInit() {
    this.posting = new Posting();
    this.getPosting();
    this.getResponsibilities();
    this.getRequirements();
    this.getOffering();
    this.applications = [];
    this.getApplications();
    this.searchTerm = '';
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

  getApplications(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.applicationService.getApplicationsForPosting(id).subscribe(applications => this.applications = applications);
  }


}
