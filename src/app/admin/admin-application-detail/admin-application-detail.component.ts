import { Component, OnInit } from '@angular/core';
import { Posting } from '../../../models/posting';
import { Application } from '../../../models/application';
import { PostingService } from '../../../services/posting.service';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from '../../../services/application.service';
import { Candidate } from '../../../models/candidate';
import { Citizenship } from '../../../models/citizenship';
import { Language } from '../../../models/language';
import { Education } from '../../../models/education';
import { Certificate } from '../../../models/certificate';
import { saveAs } from 'file-saver/FileSaver';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmailObject } from '../../../models/emailobject';

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
  email: EmailObject;
  emailPoslat: boolean;
  loading: boolean;

  constructor(
    private postingService: PostingService,
    private location: Location,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private modalService: NgbModal
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
    this.email = new EmailObject();
  }

  open(content) {
    this.email.to = this.application.candidate.email;
    this.email.subject = '';
    this.email.text = '';
    this.emailPoslat = false;
    this.loading = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
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

  deleteApplication() {
    const appId = +this.route.snapshot.paramMap.get('appId');
    if (confirm('Da li ste sigurni da želite da uklonite aplikaciju?')) {
      this.applicationService.deleteApplication(appId).subscribe(data => this.goBack());
    }
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

  downloadCv(): void {
    const appId = +this.route.snapshot.paramMap.get('appId');
    const fileName = this.application.candidate.firstName + '_' + this.application.candidate.lastName + '.pdf';
    this.applicationService.downloadCv(fileName, appId).subscribe(
      data => {
        if (data.size === 0) {
          alert('Aplikant nije okacio CV.');
        } else {
          saveAs(data, fileName);
        }
      },
        error => console.error(error)
    );
  }

  downloadMl(): void {
    const appId = +this.route.snapshot.paramMap.get('appId');
    const fileName = this.application.candidate.firstName + '_' + this.application.candidate.lastName + '_' + 'motivaciono' + '.pdf';
    this.applicationService.downloadMl(fileName, appId).subscribe(
      data => {
        if (data.size === 0) {
          alert('Aplikant nije okacio motivaciono pismo.');
        } else {
          saveAs(data, fileName);
        }
      },
        error => console.error(error)
    );
  }

  downloadCl(): void {
    const appId = +this.route.snapshot.paramMap.get('appId');
    const fileName = this.application.candidate.firstName + '_' + this.application.candidate.lastName + '_' + 'propratno' + '.pdf';
    this.applicationService.downloadCl(fileName, appId).subscribe(
      data => {
        if (data.size === 0) {
          alert('Aplikant nije okacio propratno pismo.');
        } else {
          saveAs(data, fileName);
        }
      },
        error => console.error(error)
    );
  }

  sendEmail() {
    this.loading = true;
    this.applicationService.sendEmail(this.email).subscribe(
      data => {
        this.emailPoslat = true;
        this.loading = false;
      }
    );
  }

}
