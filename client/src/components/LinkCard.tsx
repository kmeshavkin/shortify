import React from 'react';
import { Card, EditableText } from '@blueprintjs/core';
import { ILink } from '../../../models/Link';
import styles from './LinkCard.module.scss';

export const LinkCard = (link: ILink): JSX.Element => (
  <Card className={styles.card}>
    <div className={styles.row}>
      <p>Full link: </p>
      <b>
        <EditableText value={link.from} selectAllOnFocus />
      </b>
    </div>
    <div className={styles.row}>
      <p>Short link: </p>
      <b>
        <EditableText value={link.to} selectAllOnFocus />
      </b>
    </div>
    <div className={styles.row}>
      <p>Link clicks left: </p>
      <b>{link.clicksLeft === -1 ? 'Unlimited' : String(link.clicksLeft)}</b>
    </div>
    <div className={styles.row}>
      <p>Creation date: </p>
      <b>{new Date(link.date).toLocaleDateString()}</b>
    </div>
  </Card>
);
