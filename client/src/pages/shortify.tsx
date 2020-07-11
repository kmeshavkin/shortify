import React, { useState, useContext } from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
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
  const [clicksAmount, setClicksAmount] = useState<number>(-1);

  const pressHandler = async () => {
    const data = await doFetch('/api/link/generate', 'POST', { from: link, clicksLeft: clicksAmount }, { authorization: `Bearer ${auth.token}` });
    if (data) setShortLinkData(data.link);
    // history.push(`/detail/${data.link._id}`); // Redirect to details page, unnecessary for now
  };

  const changeClicksHandler = (e: any) => {
    if (e.target.value === '') return setClicksAmount(-1);

    const parsedNumber = Math.abs(Number(e.target.value));
    if (Number.isNaN(parsedNumber) || parsedNumber > 999999999) return setClicksAmount(clicksAmount);
    setClicksAmount(parsedNumber);
  };

  return (
    <div>
      <InputGroup placeholder="Paste link here..." value={link} autoFocus onChange={(e: any) => setLink(e.target.value)} />
      <InputGroup placeholder="Limit link clicks. Leave empty for unlimited clicks" value={clicksAmount === -1 ? '' : String(clicksAmount)} onChange={changeClicksHandler} />
      <Button text="Generate link" intent="success" onClick={pressHandler} />
      {shortLinkData && LinkCard(shortLinkData)}
    </div>
  );
};
