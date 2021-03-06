import React, { useState } from 'react';
import {
  InputGroup,
  Button,
  FormGroup,
  Slider,
  Tooltip,
} from '@blueprintjs/core';
import { useFetch } from '../hooks/fetch';
import { ILink } from '../../../backend/models/Link';
import { LinkCard } from '../components/LinkCard';
import styles from './shortify.module.scss';

export const ShortifyPage = (): JSX.Element => {
  const { doFetch } = useFetch();
  const [link, setLink] = useState('');
  const [shortLinkData, setShortLinkData] = useState<ILink | null>(null);
  const [clicksAmount, setClicksAmount] = useState<number>(-1);
  const [linkLength, setLinkLength] = useState<number>(12);

  const pressHandler = async () => {
    const data = await doFetch('/api/link/generate', 'POST', {
      from: link,
      length: linkLength,
      clicksLeft: clicksAmount,
    });
    if (data) setShortLinkData(data.link);
  };

  const changeClicksHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const parsedNumber = Math.abs(Number(e.target.value));
    if (parsedNumber === 0) return setClicksAmount(-1);
    if (Number.isNaN(parsedNumber) || parsedNumber > Number.MAX_SAFE_INTEGER)
      return setClicksAmount(clicksAmount);
    return setClicksAmount(parsedNumber);
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <h2 className={styles.header}>Shortify your URL</h2>
        <FormGroup
          className={styles.label}
          label="Shortify link"
          labelFor="link-input"
          inline
        >
          <InputGroup
            id="link-input"
            placeholder="Paste link here..."
            value={link}
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>): void =>
              setLink(e.target.value)
            }
          />
        </FormGroup>
        <FormGroup
          className={styles.label}
          label="Limit clicks"
          labelFor="clicks-input"
          inline
        >
          <InputGroup
            id="clicks-input"
            placeholder="Empty for unlimited clicks"
            value={clicksAmount === -1 ? '' : String(clicksAmount)}
            onChange={changeClicksHandler}
          />
        </FormGroup>
        <div className={styles.bottomContainer}>
          <Tooltip
            className={styles.tooltip}
            content="Shortified link length"
            position="bottom"
          >
            <Slider
              value={linkLength}
              onChange={setLinkLength}
              onRelease={setLinkLength}
              labelStepSize={4}
              min={8}
              max={32}
            />
          </Tooltip>
          <Button
            className={styles.generateButton}
            text="Generate link"
            intent="success"
            onClick={pressHandler}
          />
        </div>
      </div>
      {shortLinkData && (
        <div>
          <LinkCard
            link={shortLinkData}
            afterDeleteCallback={() => setShortLinkData(null)}
          />
        </div>
      )}
    </div>
  );
};
