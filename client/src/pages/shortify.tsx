import React, { useState, useContext } from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import { useHistory } from 'react-router-dom';
import { useFetch } from '../hooks/fetch';
import { AuthContext } from '../context/AuthContext';
import { ILink } from '../../../models/Link';
import { LinkCard } from '../components/LinkCard';

export const ShortifyPage = () => {
  const auth = useContext(AuthContext);
  // const history = useHistory();
  const { doFetch } = useFetch();
  const [link, setLink] = useState('');
  const [shortLinkData, setShortLinkData] = useState<ILink | null>(null);

  const pressHandler = async () => {
    const data = await doFetch('/api/link/generate', 'POST', { from: link }, { authorization: `Bearer ${auth.token}` });
    if (data) setShortLinkData(data.link);
    // history.push(`/detail/${data.link._id}`); // Redirect to details page, unnecessary for now
  };

  return (
    <div>
      <InputGroup placeholder="Paste link here..." value={link} autoFocus onChange={(e: any) => setLink(e.target.value)} />
      <Button text="Generate link" intent="success" onClick={pressHandler} />
      {shortLinkData && LinkCard(shortLinkData)}
    </div>
  );
};
