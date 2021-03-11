import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { SearchResult } from "../../@types/SearchResult";
import * as api from "../../lib/api";
import useQuery from "../../lib/hooks/useQuery";

interface SearchFormProps {
  onResults: (results: api.SearchResultsResponse) => void;
  onLoadStart: () => void;
  onLoadEnd: () => void;
}

const limit = 500;
const autocompleteLimit = 10;

const SearchForm = ({ onResults, onLoadStart, onLoadEnd }: SearchFormProps) => {
  const history = useHistory();
  const q = useQuery();
  const query = q.get("query");
  const [currentQuery, setCurrentQuery] = useState(query);
  const [dataList, setDataList] = useState<SearchResult[]>([]);

  const search = async (query: string | null) => {
    if (query) {
      history.replace({ search: `query=${query}` });
      onLoadStart();
      const res = await api.search(query, limit);
      onLoadEnd();

      if (res) {
        onResults(res);
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    search(currentQuery);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setCurrentQuery(query);

    if (!query) {
      return;
    }

    const isSelectedFromDataList = dataList.filter((_) => _.name === query).length;

    if (!isSelectedFromDataList) {
      api.search(query, autocompleteLimit).then((results) => {
        setDataList(results.data);
      });
    } else {
      search(query);
    }
  };

  useEffect(() => {
    search(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form method="GET" onSubmit={handleSubmit} className="d-flex">
      <input
        type="search"
        name="query"
        value={currentQuery || ""}
        onChange={handleQueryChange}
        placeholder="Provider name or NPI"
        aria-label="Provider name or NPI"
        className="form-control me-2"
        list="autocomplete-list"
      />
      {dataList.length ? (
        <datalist id="autocomplete-list">
          {dataList.map((_) => (
            <option key={`autocomplete-list-item-${_.id}`} value={_.name} />
          ))}
        </datalist>
      ) : null}
      <button
        type="submit"
        className="btn btn-outline-success"
        disabled={!currentQuery}
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
