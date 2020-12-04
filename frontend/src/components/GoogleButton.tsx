import React from 'react';
import styles from './GoogleButton.module.scss';
import gLogo from '../media/glogo.svg';

export const GoogleButton = ({
  href,
  disabled,
}: {
  href: string;
  disabled: boolean;
}): JSX.Element => (
  <a href={href}>
    <button className={styles.container} type="button" disabled={disabled}>
      <div className={styles.innerContainer}>
        <img className={styles.icon} src={gLogo} alt="Google logo" />
        <p className={styles.text}>Google</p>
      </div>
    </button>
  </a>
);
