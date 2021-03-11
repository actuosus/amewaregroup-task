import { LicenseMedicare } from "./LicenseMedicare";
import { LicenseTaxonomy } from "./LicenseTaxonomy";

export interface License {
  taxonomy: LicenseTaxonomy;
  medicare: LicenseMedicare;
}
