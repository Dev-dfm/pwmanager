import React from 'react';
import styles from './App.module.css';
import Credential from './components/Credential';
import Hero from './components/Hero';

function App(): JSX.Element {
  const credentials: CredentialType[] = [
    {
      service: 'GitHub',
      username: 'JuJu',
      password: '123',
    },
    {
      service: 'Google',
      username: 'Roman',
      password: '456',
    },
    {
      service: 'Netflix',
      username: 'Daniel',
      password: '789',
    },
  ];
  const crendentialElements = credentials.map((credential) => (
    <Credential key={credential.service} credential={credential} />
  ));

  return (
    <div className={styles.App}>
      <Hero title="Key Guardian" imgSrc="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80" />
      <main>
        <ul>{crendentialElements}</ul>
      </main>
    </div>
  );
}

export default App;
