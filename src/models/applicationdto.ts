import { LanguageDto } from "./languagedto";
import { Education } from "./education";
import { Certificate } from "./certificate";

export class ApplicationDTO {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  idNumber: string;
  ssn: string;
  citizenshipId: number;
  language: LanguageDto[];
  educationLevel: string;
  education: Education[];
  candidateNote: string;
  certifications: Certificate[];
  applicationNote: string;
}
