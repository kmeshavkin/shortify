import React from 'react';
import { Card, EditableText, Button, Popover } from '@blueprintjs/core';
import qr from 'qr-image';
import { ILink } from '../../../models/Link';
import styles from './LinkCard.module.scss';
import QRIcon from './QR_icon.svg';

export const LinkCard = ({
  link,
  onTrashClick,
}: {
  link: ILink;
  onTrashClick?: (linkId: string) => void;
}): JSX.Element => {
  const qrCode = `data:image/svg+xml;utf8,${qr.imageSync(link.to, {
    type: 'svg',
  })}`;

  return (
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
        {onTrashClick && (
          <Button
            intent="danger"
            icon="trash"
            onClick={() => onTrashClick(link._id)}
          />
        )}
      </div>
    </Card>
  );
};
