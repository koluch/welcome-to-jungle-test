import React, { useEffect, useMemo, useState } from "react";

import { fetchData } from "../api";
import { ApiData } from "../api/types";
import * as ar from "../helpers/asyncResource";

import Root from "./Root";

function useData(): ar.AsyncResource<ApiData> {
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ApiData | null>(null);
  useEffect(() => {
    fetchData()
      .then((result) => {
        setData(result);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, []);
  return useMemo(() => {
    if (error != null) {
      return ar.failed(error);
    }
    if (data != null) {
      return ar.success(data);
    }
    return ar.loading();
  }, [data, error]);
}

function App(): JSX.Element {
  const dataRes = useData();
  return <Root dataRes={dataRes} />;
}

export default App;
