import React from 'react';
import { Credential as CredentialType } from '../../types';
import styles from './Credential.module.css';
import key from '../../img/key.svg';
import trash from '../../img/trash.svg';
import lock from '../../img/lock.svg';

type CredentialProps = {
  credential: CredentialType;
};

function Credential({ credential }: CredentialProps): JSX.Element {
  return (
    <li className={styles.credential}>
      <div className={styles.infos}>
        <img className={styles.key} src={key} alt="" />
        <div className={styles.service}>
          <span className={styles.serviceTitle}>service</span>
          <span>{credential.service}</span>
        </div>
        <div className={styles.user}>
        <span className={styles.userTitle}>username</span>
        <span>{credential.username}</span>
        </div>
        <button className={styles.show}>
          <img src={lock} alt="" />
        </button>
        <button className={styles.delete}>
          <img src={trash} alt="" />
        </button>
      </div>
      <div className={styles.passwordCard}>
        <span className={styles.password}>{credential.password}</span>
      </div>
    </li>
  );
}

export default Credential;
