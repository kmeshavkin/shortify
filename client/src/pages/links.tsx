import React, { useState, useCallback, useEffect } from 'react';
import { Spinner, Button } from '@blueprintjs/core';
import { useFetch } from '../hooks/fetch';
import { ILink } from '../../../models/Link';
import { LinkCard } from '../components/LinkCard';
import styles from './links.module.scss';

export const LinksPage = (): JSX.Element => {
  const [links, setLinks] = useState<ILink[]>([]);
  const { doFetch, loading } = useFetch();

  const fetchLinks = useCallback(async () => {
    const fetched = await doFetch('/api/link', 'GET');
    setLinks(fetched);
  }, [doFetch]);

  const deleteLink = useCallback(
    async (id) => {
      const fetched = await doFetch(`/api/link/delete/${id}`, 'POST');
      setLinks(fetched);
    },
    [doFetch]
  );

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) return <Spinner />;

  if (!links || !links.length) return <p>No links yet</p>;

  return (
    <div>
      {links.map((link) => (
        <div key={link._id}>
          <LinkCard link={link} onTrashClick={deleteLink} />
        </div>
      ))}
    </div>
  );
};
