import { Candidate } from './candidate';
import { Certificate } from './certificate';
import { Posting } from './posting';

export class Application {
  id?: number;
  candidate: Candidate;
  certifications: Certificate[];
  note: string;
  cv: string;
  posting: Posting;
}
