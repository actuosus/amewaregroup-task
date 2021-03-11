import {
  NationalProvider,
  NationalProviderID
} from "../../@types/NationalProvider";
import { SearchResult } from "../../@types/SearchResult";

const baseUrl = "https://clinicaltables.nlm.nih.gov";
const namespace = "/api/npi_idv/v3";

export interface APIResultResponse {
  0: string;
  1: string;
  /**
   * The full name string of the provider.
   */
  2: string;
  /**
   * The full address string of the practice address.
   */
  3: string;
}

export interface APIResultsResponse {
  /**
   * Number of results
   */
  0: number;

  /**
   * National Provider Identifier list
   */
  1: NationalProviderID[];

  /**
   * Error or something?
   */
  2: null;

  /**
   * Result
   */
  3: APIResultResponse[];
}

export interface SearchResultsResponse {
  total: number;
  ids: NationalProviderID[];
  error: null | any;
  data: SearchResult[];
}

/**
 *
 * @param terms The search string (e.g., just a part of a word) for which to find matches in the list. More than one partial word can be present in "terms", in which case there is an implicit AND between them.
 * @param maxList Specifies the number of results requested, up to the upper limit of 500. If present but the value is empty, 500 will be used.
 * @param q An optional, additional query string used to further constrain the results returned by the "terms" field. Unlike the terms field, "q" is not automatically wildcarded, but can include wildcards and can specify field names. See the Elasticsearch query string page for documentation of supported syntax.
 * @param df A comma-separated list of display fields (from the fields section below) which are intended for the user to see when looking at the results.
 * @param sf A comma-separated list of fields (or path to record json object) to be searched.
 * @param cf The NPI ID, it's the unique record ID.
 * @param ef A comma-separated list of additional fields to be returned for each retrieved list item. (See the Output format section for how the data for fields is returned.) If you wish the keys in the returned data hash to be something other than the field names, you can specify an alias for the field name by separating it from its field name with a colon, e.g., "ef=field_name1:alias1,field2,field_name3:alias3,etc. Note that not every field specified in the ef parameter needs to have an alias.
 * @returns
 * @see {@link https://clinicaltables.nlm.nih.gov/apidoc/npi_idv/v3/doc.html#params}
 */
export const request = async (
  terms: string,
  maxList?: number,
  q?: string,
  df?: string,
  cf?: NationalProviderID,
  sf?: string,
  ef?: string
): Promise<any> => {
  const url = new URL(`${baseUrl}${namespace}/search`);
  const params = [
    ["authenticity_token", ""],
    ["terms", terms],
  ];

  if (maxList) {
    params.push(["maxList", maxList.toString()]);
  }

  if (q) {
    params.push(["q", q]);
  }

  if (df) {
    params.push(["df", df]);
  }

  if (cf) {
    params.push(["cf", cf]);
  }

  if (sf) {
    params.push(["sf", sf]);
  }

  if (ef) {
    params.push(["ef", ef]);
  }

  url.search = new URLSearchParams(params).toString();

  const res = await fetch(url.toString());

  return res.json();
};

/**
 *
 * @param terms The search string (e.g., just a part of a word) for which to find matches in the list. More than one partial word can be present in "terms", in which case there is an implicit AND between them.
 * @param maxList Specifies the number of results requested, up to the upper limit of 500. If present but the value is empty, 500 will be used.
 * @param q An optional, additional query string used to further constrain the results returned by the "terms" field. Unlike the terms field, "q" is not automatically wildcarded, but can include wildcards and can specify field names. See the Elasticsearch query string page for documentation of supported syntax.
 * @param df A comma-separated list of display fields (from the fields section below) which are intended for the user to see when looking at the results.
 * @param sf A comma-separated list of fields (or path to record json object) to be searched.
 * @param cf The NPI ID, it's the unique record ID.
 * @param ef A comma-separated list of additional fields to be returned for each retrieved list item. (See the Output format section for how the data for fields is returned.) If you wish the keys in the returned data hash to be something other than the field names, you can specify an alias for the field name by separating it from its field name with a colon, e.g., "ef=field_name1:alias1,field2,field_name3:alias3,etc. Note that not every field specified in the ef parameter needs to have an alias.
 * @returns
 * @see {@link https://clinicaltables.nlm.nih.gov/apidoc/npi_idv/v3/doc.html#params}
 */
export const search = async (
  terms: string,
  maxList?: number,
  q?: string,
  df?: string,
  cf?: NationalProviderID,
  sf?: string,
  ef?: string
): Promise<SearchResultsResponse> => {
  const data: APIResultsResponse = await request(
    terms,
    maxList,
    q,
    df,
    cf,
    sf,
    ef
  );

  const results = data[3].map((item: APIResultResponse) => ({
    name: item[0],
    id: item[1],
    provider_type: item[2],
    address: item[3],
  }));

  return {
    total: data[0],
    ids: data[1],
    error: data[2],
    data: results,
  };
};

export const details = async (
  id: NationalProviderID
): Promise<NationalProvider> => {
  const fields = [
    "provider_type",
    "gender",
    "name",
    "addr_practice",
    "licenses",
    "addr_mailing",
    "name_other",
    "other_ids",
    "misc",
  ];

  const data = await request(id, 1, undefined, fields.join(","), id);

  const result = {} as NationalProvider;

  fields.forEach((field, i) => {
    const fieldData = data[3][0][i];

    // @ts-ignore
    result[field] = fieldData;

    try {
      // @ts-ignore
      result[field] = JSON.parse(fieldData);
      console.log(field, JSON.parse(fieldData), fieldData);
    } catch (e) {
      console.warn(`Unable to parse field ${field}`, fieldData);
    }
  });

  return result;
};
