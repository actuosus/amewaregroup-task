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
      <h5 className="card-header"><Link to={`/details/${item.id}`}>{item.name}</Link></h5>
      <div className="card-body">
        <p className="card-text">{item.provider_type}</p>
        <p className="card-text text-muted">{item.address}</p>
      </div>
    </div>
  );
};

export default SearchResultItem;
