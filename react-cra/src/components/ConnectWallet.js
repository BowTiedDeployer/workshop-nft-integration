import React, { useState, useEffect } from 'react';
import { AppConfig, showConnect, UserSession } from '@stacks/connect';
import { MainMenu } from './MainMenu';

const appConfig = new AppConfig(['store_write', 'publish_data']);

export const userSession = new UserSession({ appConfig });

function authenticate() {
  showConnect({
    appDetails: {
      name: 'NFT Web App Integration',
      icon: window.location.origin + '/logo512.png',
    },
    redirectTo: '/',
    onFinish: () => {
      window.location.reload();
    },
    userSession,
  });
}

const ConnectWallet = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (mounted && userSession.isUserSignedIn()) {
    return (
      <div>
        <MainMenu />
      </div>
    );
  }

  return (
    <header className="App-header">
      <h1>NFT Web App Integration</h1>
      <button className="Connect" onClick={authenticate}>
        Connect Wallet
      </button>
    </header>
  );
};

export default ConnectWallet;
