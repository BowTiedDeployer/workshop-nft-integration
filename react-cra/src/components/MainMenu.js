import React from 'react';
import { userSession } from './ConnectWallet';

export const MainMenu = () => {
  function disconnect() {
    userSession.signUserOut('/');
  }

  const userAddress = userSession.loadUserData().profile.stxAddress['mainnet'];

  const getIDsNFTsOwned = (jsonNFTHoldings) => {
    let ids = [];
    if (jsonNFTHoldings.results) {
      jsonNFTHoldings.results.map((x) => {
        const id = x.value.repr.substring(1).toString();
        if (id != '') ids.push(id);
      });
    }
    return ids;
  };

  const getNFTsOwned = async (accountAddress) => {
    const urlHoldings = `https://stacks-node-api.mainnet.stacks.co/extended/v1/tokens/nft/holdings?principal=${accountAddress}&&asset_identifiers=SP1SCEXE6PMGPAC6B4N5P2MDKX8V4GF9QDE1FNNGJ.workshop-nfts-integration::duck`;
    let jsonNFT = await fetch(urlHoldings).then((res) => {
      return res.json();
    });

    const listOfNFTs = getIDsNFTsOwned(jsonNFT);
    console.log('List of NFTs: ', listOfNFTs);
    return listOfNFTs;
  };
  getNFTsOwned(userAddress);

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
