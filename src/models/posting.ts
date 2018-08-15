import { Responsibilities } from "./responsibilities";
import { Requirements } from "./requirements";
import { Offering } from "./offering";
import { Application } from "./application";

export class Posting {
  id?: number;
  name: string;
  date: string;
  responsibilities: Responsibilities[];
  requirements: Requirements[];
  offering: Offering[];
  applications: Application[];
}
