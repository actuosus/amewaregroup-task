import { NationalProviderID } from "./NationalProvider";

export interface SearchResult {
    /**
     * The full name string of the provider.
     */
    name: string;

    /**
     * NPI ID
     */
    id: NationalProviderID;

    provider_type: string;

    /**
     * The full address string of the practice address.
     */
    address: string;
}
