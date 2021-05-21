import React from 'react';
import { Credential as CredentialType } from '../../types';
import styles from './Credential.module.css';

type CredentialProps = {
  credential: CredentialType;
};

function Credential({ credential }: CredentialProps): JSX.Element {
  return (
    <li className={styles.credential}>
      <div className={styles.service}>
        <span>{credential.service}</span>
        <span>{credential.username}</span>
        <button className={styles.delete}>🚮</button>
        <button className={styles.show}>➕ </button>
      </div>
      <div>
        <span className={styles.password}>{credential.password}</span>
      </div>
    </li>
  );
}

export default Credential;
