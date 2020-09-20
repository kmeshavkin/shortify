import React, { useState, useCallback, useEffect } from 'react';
import { Spinner } from '@blueprintjs/core';
import { useFetch } from '../hooks/fetch';
import { ILink } from '../../../models/Link';
import { LinkCard } from '../components/LinkCard';

export const LinksPage = (): JSX.Element => {
  const [links, setLinks] = useState<ILink[]>([]);
  const { doFetch, loading } = useFetch();

  const fetchLinks = useCallback(async () => {
    const fetched = await doFetch('/api/link', 'GET');
    setLinks(fetched);
  }, [doFetch]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) return <Spinner />;

  if (!links || !links.length) return <p>No links yet</p>;

  return (
    <div>
      {links.map((link) => (
        <div key={link._id}>
          <LinkCard link={link} afterDeleteCallback={setLinks} />
        </div>
      ))}
    </div>
  );
};
