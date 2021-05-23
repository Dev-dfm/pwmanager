import React, { useEffect, useState } from 'react';
import { Credential as CredentialType } from '../types';
import styles from './App.module.css';
import Credential from './components/Credential';
import Hero from './components/Hero';

function App(): JSX.Element {
  // Default credentials is empty, setCredentials stores the API data from getCredentials
  const [credentials, setCredentials] = useState<CredentialType[]>([]);

  // getCredentials executes everytime the application renders
  useEffect(() => {
    getCredentials();
  }, []);

  const getCredentials = async () => {
    const response = await fetch('http://localhost:5000/api/credentials');
    const credentials = await response.json();
    setCredentials(credentials);
  };

  // Creates a new Array "credentials" by calling the component/function "Credentials" with the prop/input "credential"
  const credentialElements = credentials.map((credential) => (
    <Credential key={credential.service} credential={credential} />
  ));

  return (
    <div className={styles.App}>
      {/* <img className={styles.Bg} src="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80" alt="" /> */}
      <Hero
        title="Key Guardian"
        imgSrc="https://images.unsplash.com/photo-1584433144859-1fc3ab64a957?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80"
      />
      <main className={styles.CredentialsContainer}>
        <ul>{credentialElements}</ul>
      </main>
    </div>
  );
}

export default App;
