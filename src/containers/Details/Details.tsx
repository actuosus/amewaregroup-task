import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NationalProvider } from "../../@types/NationalProvider";
import ProviderInfo from "../../components/ProviderInfo";
import Spinner from "../../components/Spinner";
import * as api from "../../lib/api";

const styles = {
  root: {
    marginTop: 40,
  },
  spinnerContainer: {
    display: "flex",
    justifyContent: "center",
  },
};

export interface DetailsParams {
  id: string;
}

const Details = () => {
  const { id } = useParams<DetailsParams>();
  const [data, setData] = useState<NationalProvider | undefined>();

  const load = async () => {
    const data = await api.details(id);
    setData(data);
  };

  useEffect(() => {
    load();

    document.title = 'Details';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="provider-details-container" style={styles.root}>
      {data ? (
        <ProviderInfo data={data} />
      ) : (
        <div style={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default Details;
