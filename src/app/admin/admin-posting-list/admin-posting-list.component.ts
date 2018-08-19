import { Component, OnInit } from '@angular/core';
import { Posting } from '../../../models/posting';
import { PostingService } from '../../../services/posting.service';
import { Responsibilities } from '../../../models/responsibilities';
import { Requirements } from '../../../models/requirements';
import { Offering } from '../../../models/offering';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PostingDto } from '../../../models/postingdto';

@Component({
  selector: 'app-admin-posting-list',
  templateUrl: './admin-posting-list.component.html',
  styleUrls: ['./admin-posting-list.component.css']
})
export class AdminPostingListComponent implements OnInit {

  postings: Posting[];
  responsibilities: Responsibilities[];
  requirements: Requirements[];
  offering: Offering[];
  addedPosting: boolean;

  constructor(
    private postingService: PostingService,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.getPostings();
    this.responsibilities = [];
    this.requirements = [];
    this.offering = [];
  }

  open(content) {
    this.responsibilities = [];
    this.requirements = [];
    this.offering = [];
    this.addedPosting = false;
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true, size: 'lg'});
  }

  getPostings(): void {
    this.postingService.getAllPostings().subscribe(postings => this.postings = postings);
  }

  deletePosting(id: number, name: string) {
    if (confirm(`Da li ste sigurni da želite da uklonite konkurs ${name}?`)) {
      this.postingService.deletePosting(id).subscribe(data => this.getPostings());
    }
  }

  addResponsibility(res: string): void {
    const newRes = new Responsibilities();
    newRes.responsibility = res;
    this.responsibilities.push(newRes);
  }

  addRequirement(req: string): void {
    const newReq = new Requirements();
    newReq.requirement = req;
    this.requirements.push(newReq);
  }

  addOffering(off: string): void {
    const newOff = new Offering();
    newOff.offering = off;
    this.offering.push(newOff);
  }

  addPosting(postingName: string) {
    const newPosting = new PostingDto();
    newPosting.name = postingName;
    newPosting.responsibilities = [];
    newPosting.requirements = [];
    newPosting.offering = [];
    for (const res of this.responsibilities) {
      newPosting.responsibilities.push(res.responsibility);
    }
    for (const req of this.requirements) {
      newPosting.requirements.push(req.requirement);
    }
    for (const off of this.offering) {
      newPosting.offering.push(off.offering);
    }

    this.postingService.addPosting(newPosting).subscribe(
      data => {
        this.getPostings();
        this.addedPosting = true;
      });
    }

}
