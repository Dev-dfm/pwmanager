import React from 'react';
import styles from './App.module.css';
import Credential from './components/Credential';

function App(): JSX.Element {
  return (
    <div className={styles.App}>
      <h1>Key Guardian</h1>
      <main>
        <ul>
          <Credential service="Service: GitHub" username="Username: JuJu" password="Password: 123" />
          <Credential service="Service: Google" username="Username: Roman" password="Password: 123" />
          <Credential service="Service: Netflix" username="Username: Thomas" password="Password: 123" />
        </ul>
      </main>
    </div>
  );
}

export default App;
