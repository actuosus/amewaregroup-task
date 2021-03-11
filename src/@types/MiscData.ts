import { Contact } from "./Contact";

export interface MiscData {
    /**
     * The 'authorized official' object for the provider, with sub-fields. For search, use specific sub-fields.
     */
    auth_official?: Contact;

    /**
     * The provider's replacement NPI number.
     */
    replacement_NPI?: string;

    /**
     * The provider's EIN, rarely populated.
     */
    EIN?: string;

    /**
     * The enumeration data of the provider.
     */
    enumeration_date: string;

    /**
     * The provider entry's last update date.
     */
    last_update_date: string;
    
    /**
     * The provider sole proprietor flag.
     */
    is_sole_proprietor: string;

    /**
     * The provider organization subpart flag.
     */
    is_org_subpart?: string;

    /**
     * The provider organization subpart legal business name.
     */
    parent_LBN?: string;
    
    /**
     * 	The provider organization subpart TIN.
     */
    parent_TIN?: string;
}
