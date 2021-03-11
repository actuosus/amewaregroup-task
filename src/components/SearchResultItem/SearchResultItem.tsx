import { Link } from "react-router-dom";
import { SearchResult } from "../../@types/SearchResult";

const styles = {
  root: {
    marginTop: 10,
    marginBottom: 20,
  },
};

interface SearchResultItemProps {
  item: SearchResult;
}

const SearchResultItem = ({ item }: SearchResultItemProps) => {
  return (
    <div className="card" style={styles.root}>
      <h5 className="card-header">{item.name}</h5>
      <div>
        <Link to={`/details/${item.id}`}>{item.id}</Link>
      </div>
      <p className="card-text">{item.provider_type}</p>
      <p className="card-text text-muted">{item.address}</p>
    </div>
  );
};

export default SearchResultItem;
