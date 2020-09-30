import React, { useCallback } from 'react';
import { Card, EditableText, Button, Popover } from '@blueprintjs/core';
import qr from 'qr-image';
import { ILink } from '../../../models/Link';
import styles from './LinkCard.module.scss';
import QRIcon from './QR_icon.svg';
import { useFetch } from '../hooks/fetch';

export const LinkCard = ({
  link,
  afterDeleteCallback,
}: {
  link: ILink;
  afterDeleteCallback?: (updatedLinks: ILink[]) => void;
}): JSX.Element => {
  const { doFetch, loading } = useFetch();
  const deleteLink = useCallback(
    async (id) => {
      const fetched = await doFetch(`/api/link/delete/${id}`, 'POST');
      if (afterDeleteCallback) afterDeleteCallback(fetched);
    },
    [doFetch, afterDeleteCallback]
  );

  const qrCode = `data:image/svg+xml;utf8,${qr.imageSync(link.to, {
    type: 'svg',
  })}`;

  return (
    <Card className={styles.card}>
      <div className={styles.row}>
        <p>Full link: </p>
        <EditableText
          className={styles.value}
          value={link.from}
          selectAllOnFocus
        />
      </div>
      <div className={styles.row}>
        <p>Short link: </p>
        <EditableText
          className={styles.value}
          value={link.to}
          selectAllOnFocus
        />
      </div>
      <div className={styles.row}>
        <p>Link clicks left: </p>
        <p className={styles.value}>
          {link.clicksLeft === -1 ? 'Unlimited' : String(link.clicksLeft)}
        </p>
      </div>
      <div className={styles.row}>
        <p>Creation date: </p>
        <p className={styles.value}>
          {new Date(link.date).toLocaleDateString()}
        </p>
      </div>
      <div className={styles.buttonSection}>
        <Popover position="right">
          <Button
            className={styles.QRButton}
            intent="primary"
            icon={
              <img width={16} height={16} src={QRIcon} alt="QR code icon" />
            }
          />
          <img width={200} height={200} src={qrCode} alt="QR code" />
        </Popover>
        <Button
          intent="danger"
          icon="trash"
          loading={loading}
          onClick={() => deleteLink(link._id)}
        />
      </div>
    </Card>
  );
};
