import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { NationalProvider } from "../../@types/NationalProvider";
import ProviderInfo from "../../components/ProviderInfo";
import Spinner from "../../components/Spinner";
import * as api from "../../lib/api";

export interface DetailsParams {
    id: string;
}

const Details = () => {
  const { id } = useParams<DetailsParams>();
  const [data, setData] = useState<NationalProvider | undefined>();

  const load = async () => {
    const data = await api.details(id);
    setData(data);
  }

  useEffect(() => {
    load();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="provider-details-container">
      {data ? <ProviderInfo data={data} /> : <Spinner />}
    </div>
  );
};

export default Details;
