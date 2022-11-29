import React from 'react';
import { userSession } from './ConnectWallet';

export const MainMenu = () => {
  function disconnect() {
    userSession.signUserOut('/');
  }

  const userAddress = userSession.loadUserData().profile.stxAddress['mainnet'];

  return (
    <div>
      <header className="App-header">
        <h1>NFT Web App Integration</h1>
        <h6>{`Current user address: ${userAddress}`}</h6>
        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
      </header>
    </div>
  );
};
