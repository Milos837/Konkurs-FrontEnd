import { Candidate } from "./candidate";
import { Language } from "./language";

export class CandidateLanguage {
  id?: number;
  candidate: Candidate;
  language: Language;
  note: string;
}
