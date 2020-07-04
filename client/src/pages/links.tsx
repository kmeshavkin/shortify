import React, {
  useState, useCallback, useContext, useEffect,
} from 'react';
import { Spinner } from '@blueprintjs/core';
import { useFetch } from '../hooks/fetch';
import { AuthContext } from '../context/AuthContext';
import { ILink } from '../../../models/Link';

export const LinksPage = () => {
  const [links, setLinks] = useState<ILink[]>([]);
  const { doFetch, loading } = useFetch();
  const { token } = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    const fetched = await doFetch('/api/link', 'GET', null, {
      authorization: `Bearer ${token}`,
    });
    setLinks(fetched);
  }, [token, doFetch]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if (loading) return <Spinner />;

  if (!links || !links.length) return <p>No links yet</p>;

  return (
    <div>
      {links.map((link) => (
        <div key={link._id}>
          <p>
            From:
            {' '}
            {link.from}
          </p>
          <p>
            To:
            {' '}
            {link.to}
          </p>
          <p>
            Clicks:
            {' '}
            {link.clicks}
          </p>
        </div>
      ))}
    </div>
  );
};
