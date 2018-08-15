import { Component, OnInit } from '@angular/core';
import { Citizenship } from '../../../models/citizenship';
import { Language } from '../../../models/language';
import { Education } from '../../../models/education';
import { Certificate } from '../../../models/certificate';
import { Posting } from '../../../models/posting';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PostingService } from '../../../services/posting.service';
import { ApplicationService } from '../../../services/application.service';
import { Application } from '../../../models/application';
import { Candidate } from '../../../models/candidate';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

declare var grecaptcha: any;

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {

  application: Application;
  posting: Posting;
  citizenships: Citizenship[];
  languages: Language[];
  educations: Education[];
  certificates: Certificate[];
  captchaFail: boolean;
  newLanguage: Language;
  allLanguages: Language[];

  constructor(
    private postingService: PostingService,
    private location: Location,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.languages = [];
    this.posting = new Posting();
    this.getCitizenships();
    this.getPosting();
    this.captchaFail = false;
    this.application = new Application();
    this.application.candidate = new Candidate();
    this.application.candidate.citizenship = new Citizenship();
    this.application.posting = new Posting();
    this.newLanguage = new Language();
    this.getAllLanguages();
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true});
}

  getCitizenships(): void {
    this.applicationService.getCitizenships().subscribe(citizenships => this.citizenships = citizenships);
  }

  getAllLanguages(): void {
    this.applicationService.getLanguages().subscribe(languages => this.allLanguages = languages);
  }

  getPosting(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postingService.getPosting(id).subscribe(posting => this.posting = posting);
  }

  addLanguage(): void {
    this.languages.push(this.newLanguage);
  }

  goBack(): void {
    this.location.back();
  }

  verify(): void {
    this.captchaFail = false;
    const response = grecaptcha.getResponse();
    if (response.length === 0) {
      this.captchaFail = true;
    }
  }

  apply(): void {
    console.log(JSON.stringify(this.application));
  }

}
