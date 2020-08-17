import React, { useCallback, useEffect } from "react";
import { useLocation, Redirect } from "react-router-dom";
import { Spinner } from "@blueprintjs/core";
import { useFetch } from "../hooks/fetch";

export const ApiPage = () => {
  const { doFetch, loading } = useFetch();
  const location = useLocation();

  const sendRequest = useCallback(async () => {
    await doFetch(location.pathname + location.search, "POST");
  }, [doFetch, location.pathname, location.search]);

  // TODO: fix unmount before request finishes: "To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function"
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return loading ? <Spinner /> : <Redirect to="/" />; // or spinner
};
