import { LicenseMedicare } from "./LicenseMedicare";
import { LicenseTaxonomy } from "./LicenseTaxonomy";

export interface License {
  is_primary_taxonomy?: "Y" | "N";
  lic_number?: string;
  lic_state?: string;
  taxonomy: LicenseTaxonomy;
  medicare: LicenseMedicare[];
}
