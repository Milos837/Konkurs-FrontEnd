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
import { ApplicationDTO } from '../../../models/applicationdto';
import { LanguageDto } from '../../../models/languagedto';

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
  newLanguage: Language;
  allLanguages: Language[];
  newEducation: Education;
  newCertificate: Certificate;
  greska: boolean;
  dodat: boolean;
  newApplication: ApplicationDTO;
  captcha: string;
  fileSelected: boolean;
  invalidFile1: boolean;
  selectedFile1: File;
  invalidFile2: boolean;
  selectedFile2: File;
  invalidFile3: boolean;
  selectedFile3: File;
  fileSelected2: boolean;
  fileSelected3: boolean;
  sendingInProgress: boolean;

  constructor(
    private postingService: PostingService,
    private location: Location,
    private route: ActivatedRoute,
    private applicationService: ApplicationService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.languages = [];
    this.educations = [];
    this.certificates = [];
    this.posting = new Posting();
    this.getCitizenships();
    this.getPosting();
    this.application = new Application();
    this.application.candidate = new Candidate();
    this.application.candidate.gender = 'MALE';
    this.application.candidate.citizenship = new Citizenship();
    this.application.posting = new Posting();
    this.newLanguage = new Language();
    this.getAllLanguages();
    this.newEducation = new Education();
    this.newCertificate = new Certificate();
    this.captcha = null;
    this.fileSelected = false;
    this.invalidFile1 = false;
    this.selectedFile1 = null;
    this.invalidFile2 = false;
    this.selectedFile2 = null;
    this.invalidFile3 = false;
    this.selectedFile3 = null;
    this.fileSelected2 = false;
    this.fileSelected3 = false;
    this.sendingInProgress = false;
  }

  fileIsSelected() {
    let input: any, file: any;
    input = document.getElementById('cv');
    file = input.files[0];

    if (file.size > 10000000) {
      this.invalidFile1 = true;
      this.fileSelected = false;
    } else {
      this.fileSelected = true;
      this.invalidFile1 = false;
      this.selectedFile1 = file;
    }
  }

  mlIsSelected() {
    let input: any, file: any;
    input = document.getElementById('ml');
    file = input.files[0];

    if (file.size > 10000000) {
      this.invalidFile2 = true;
      this.fileSelected2 = false;
    } else {
      this.fileSelected2 = true;
      this.invalidFile2 = false;
      this.selectedFile2 = file;
    }
  }

  clIsSelected() {
    let input: any, file: any;
    input = document.getElementById('cl');
    file = input.files[0];

    if (file.size > 10000000) {
      this.invalidFile3 = true;
      this.fileSelected3 = false;
    } else {
      this.fileSelected3 = true;
      this.invalidFile3 = false;
      this.selectedFile3 = file;
    }
  }

  uploadCv(appId: number) {
    if (!this.invalidFile1 && this.fileSelected) {
      this.applicationService.uploadCv(this.selectedFile1, appId).subscribe(data => this.uploadMl(appId));
    }
  }

  uploadMl(appId: number) {
    if (!this.invalidFile2 && this.fileSelected2) {
      this.applicationService.uploadMl(this.selectedFile2, appId).subscribe(data => this.uploadCl(appId));
    } else {
      this.uploadCl(appId);
    }
  }

  uploadCl(appId: number) {
    if (!this.invalidFile3 && this.fileSelected3) {
      this.applicationService.uploadCL(this.selectedFile3, appId).subscribe(data => this.applicationSent());
    } else {
      this.applicationSent();
    }
  }

  open(content) {
    this.dodat = false;
    this.greska = false;
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

  goBack(): void {
    this.location.back();
  }

  resolved(captchaResponse: string) {
    this.captcha = captchaResponse;
    console.log(`Resolved captcha with response ${captchaResponse}:`);
  }

  languageAlreadyAdded(newLanguage: Language): boolean {
    for (const language of this.languages) {
      if (language.id === newLanguage.id) {
        return true;
      }
    }
    return false;
  }

  addLanguage(): void {
    if (!this.languageAlreadyAdded(this.newLanguage)) {
      this.greska = false;
      const lang = new Language();
      lang.id = this.newLanguage.id;
      lang.language = this.newLanguage.language;
      lang.level = this.newLanguage.level;
      this.languages.push(lang);
      this.dodat = true;
    } else {
      this.greska = true;
    }
    /* this.modalReference.close(); */
  }

  addEducation(): void {
    const ed = new Education();
    ed.schoolName = this.newEducation.schoolName;
    ed.note = this.newEducation.note;
    this.educations.push(ed);
    this.dodat = true;
  }

  addCertificate(): void {
    const cert = new Certificate();
    cert.certificate = this.newCertificate.certificate;
    cert.note = this.newCertificate.note;
    this.certificates.push(this.newCertificate);
    this.dodat = true;
  }

  sendApplication() {
    this.sendingInProgress = true;

    const postingId = +this.route.snapshot.paramMap.get('id');

    this.newApplication = new ApplicationDTO();
    this.newApplication.firstName = this.application.candidate.firstName;
    this.newApplication.lastName = this.application.candidate.lastName;
    this.newApplication.gender = this.application.candidate.gender;
    this.newApplication.email = this.application.candidate.email;
    this.newApplication.idNumber = this.application.candidate.idNumber;
    this.newApplication.ssn = this.application.candidate.ssn;
    this.newApplication.citizenshipId = this.application.candidate.citizenship.id;

    this.newApplication.language = [];
    this.newApplication.education = [];
    this.newApplication.certifications = [];

    for (const l of this.languages) {
      const tempLanguage: LanguageDto = new LanguageDto();
      tempLanguage.languageId = l.id;
      // dodaj note
      this.newApplication.language.push(tempLanguage);
    }
    this.newApplication.educationLevel = this.application.candidate.educationLevel;
    this.newApplication.education = this.educations;
    this.newApplication.candidateNote = this.application.candidate.note;
    this.newApplication.certifications = this.certificates;
    this.newApplication.applicationNote = this.application.note;

    this.applicationService.sendApplicaiton(this.newApplication, postingId).subscribe(app => this.uploadCv(app.id));
  }

  applicationSent(): void {
    alert('Aplikacija je uspesno poslata!');
    this.goBack();
  }

}
