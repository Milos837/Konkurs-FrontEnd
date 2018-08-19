import { Citizenship } from './citizenship';
import { Education } from './education';
import { Application } from './application';
import { CandidateLanguage } from './candidateLanguage';

export class Candidate {
  id?: number;
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  idNumber: string;
  ssn: string;
  citizenship: Citizenship;
  candidateLanguage: CandidateLanguage[];
  educationLevel: string;
  education: Education[];
  applications: Application[];
  note: string;
}
