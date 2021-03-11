import { useState } from "react";
import SearchForm from "../../components/SearchForm";
import SearchResultList from "../../components/SearchResultList";
import Spinner from "../../components/Spinner";
import { SearchResultsResponse } from "../../lib/api";

function Search() {
  const [data, setData] = useState<SearchResultsResponse>();
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadStart = () => {
    setIsLoading(true);
  };
  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleResponse = (response: SearchResultsResponse) => {
    setData(response);
  };

  return (
    <div>
      <h2>Search National Provider Identifier Records</h2>
      <p className="lead">
        The data is provided by{" "}
        <a
          href="https://clinicaltables.nlm.nih.gov/apidoc/npi_idv/v3/doc.html"
          target="_blank"
          rel="noreferrer"
        >
          Clinical Table Search Service
        </a>
      </p>
      <SearchForm
        onResults={handleResponse}
        onLoadStart={handleLoadStart}
        onLoadEnd={handleLoadEnd}
      />
      {data ? <SearchResultList data={data} /> : isLoading ? <Spinner /> : null}
    </div>
  );
}

export default Search;
