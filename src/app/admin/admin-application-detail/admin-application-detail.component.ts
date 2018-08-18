import { Component, OnInit } from '@angular/core';
import { Posting } from '../../../models/posting';
import { Application } from '../../../models/application';
import { PostingService } from '../../../services/posting.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { Candidate } from '../../../models/candidate';
import { Citizenship } from '../../../models/citizenship';
import { Language } from '../../../models/language';
import { Education } from '../../../models/education';
import { Certificate } from '../../../models/certificate';

@Component({
  selector: 'app-admin-application-detail',
  templateUrl: './admin-application-detail.component.html',
  styleUrls: ['./admin-application-detail.component.css']
})
export class AdminApplicationDetailComponent implements OnInit {

  posting: Posting;
  application: Application;
  languages: Language[];
  educations: Education[];
  certificates: Certificate[];

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
    this.application = new Application();
    this.application.candidate = new Candidate();
    this.application.candidate.citizenship = new Citizenship();
    this.getApplication();
    this.getLanguages();
    this.getEducations();
    this.getCertificates();
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

  getApplication(): void {
    const appId = +this.route.snapshot.paramMap.get('appId');
    this.applicationService.getApplication(appId).subscribe(application => this.application = application);
  }

  getLanguages(): void {
    const appId = +this.route.snapshot.paramMap.get('appId');
    this.applicationService.getLanguagesForApplication(appId).subscribe(languages => this.languages = languages);
  }

  getEducations(): void {
    const appId = +this.route.snapshot.paramMap.get('appId');
    this.applicationService.getEducationsForApplication(appId).subscribe(educations => this.educations = educations);
  }

  getCertificates(): void {
    const appId = +this.route.snapshot.paramMap.get('appId');
    this.applicationService.getCertificatesForApplication(appId).subscribe(certificates => this.certificates = certificates);
  }

}
