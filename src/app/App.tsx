import React, { useEffect, useState } from 'react';
import { Credential as CredentialType } from '../types';
import styles from './App.module.css';
import Credential from './components/Credential';
import Hero from './components/Hero';

function App(): JSX.Element {
  const [credentials, setCredentials] = useState<CredentialType[]>([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/credentials')
      .then((response) => response.json())
      .then((credentials) => setCredentials(credentials));
  }, []);
  const credentialElements = credentials.map((credential) => (
    <Credential key={credential.service} credential={credential} />
  ));

  return (
    <div className={styles.App}>
      <Hero
        title="Key Guardian"
        imgSrc="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80"
      />
      <main>
        <ul>{credentialElements}</ul>
      </main>
    </div>
  );
}

export default App;
