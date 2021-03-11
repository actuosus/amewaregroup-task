import { useEffect, useState } from "react";
import SearchForm from "../../components/SearchForm";
import SearchResultList from "../../components/SearchResultList";
import Spinner from "../../components/Spinner";
import { SearchResultsResponse } from "../../lib/api";
import useDarkMode from "../../lib/hooks/useDarkMode";

const styles = {
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
  },
};

function Search() {
  const [data, setData] = useState<SearchResultsResponse>();
  const [isLoading, setIsLoading] = useState(false);
  const isDarkMode = useDarkMode();

  const handleLoadStart = () => {
    setIsLoading(true);
  };
  const handleLoadEnd = () => {
    setIsLoading(false);
  };

  const handleResponse = (response: SearchResultsResponse) => {
    setData(response);
  };

  useEffect(() => {
    document.title = 'Search';
  }, [])

  return (
    <div>
      <h2 className={`Page-title ${isDarkMode ? 'text-light' : 'text-dark'}`}>
        Search National Provider Identifier Records
      </h2>
      <p className={`lead ${isDarkMode ? 'text-light' : 'text-dark'}`}>
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
      {data ? (
        <SearchResultList data={data} />
      ) : isLoading ? (
        <div style={styles.spinnerContainer}>
          <Spinner />
        </div>
      ) : null}
    </div>
  );
}

export default Search;
