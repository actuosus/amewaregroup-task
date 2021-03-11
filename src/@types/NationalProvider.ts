import { Address } from "./Address";
import { Contact } from "./Contact";
import { License } from "./License";
import { MiscData } from "./MiscData";
import { OtherID } from "./OtherID";

export type NationalProviderID  = string;

export type Gender = "F" | "M";

/**
 * National Provider Identifier
 * @see {@link https://clinicaltables.nlm.nih.gov/apidoc/npi_idv/v3/doc.html#fields}
 */
export interface NationalProvider {
  /**
   * The provider (specialty) type. The provider type is determined based on the provider's primary (or first, if primary not indicated) taxonomy code. If the taxonomy code has a corresponding medicare provider type, that type will be used; if not, the taxonomy classification will be used. For other types/specialties of a provider, see the 'licenses' field below for details.
   */
  provider_type: string;

  /**
   * Gender of the provider.
   */
  gender: Gender;

  /**
   * A list of license objects for the provider, each with sub-fields such as issuing states, taxonomy, corresponding medicare provider type, etc. For search, use its specific sub-fields.
   */
  licenses: License[];

  /**
   * The name object (with sub-fields) of the provider. For search, use name.full or other specific sub-fields.
   */
  name: Contact;

  /**
   * The provider's practice address object (with sub-fields). For search, use addr_practice.full or other specific sub-fields.
   */
  addr_practice: Address;

  /**
   * The provider's mailing address object (with sub-fields). For search, use addr_mailing.full or other specific sub-fields.
   */
  addr_mailing: Address;

  /**
   * The provider's 'other name' object (with sub-fields). For search, use name_other.full or other specific sub-fields.
   */
  name_other?: Contact;

  /**
   * A list of other ids issued by various agencies/organizations, each with sub-fields. For search, use specific sub-fields.
   */
  other_ids: OtherID[];

  /**
   * An object with sub-fields for the other, misc data elements.
   */
  misc: MiscData;
}
