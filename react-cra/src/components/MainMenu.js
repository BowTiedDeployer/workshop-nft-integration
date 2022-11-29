import React, { useEffect, useState, useCallback } from 'react';
import { userSession } from './ConnectWallet';

export const MainMenu = () => {
  const [NFTsOwned, setNFTsOwned] = useState([]);
  const [hasRespondedNFTs, setHasRespondedNFTs] = useState(false);

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

  const fetchNFTsOwned = useCallback(async () => {
    const localNFTsOwned = await getNFTsOwned(userAddress);
    setHasRespondedNFTs(true);
    if (localNFTsOwned) setNFTsOwned(localNFTsOwned);
    else setNFTsOwned([]);
  }, [userAddress]);

  useEffect(() => {
    fetchNFTsOwned();
    setInterval(() => {}, 30000);
  }, [fetchNFTsOwned]);

  return (
    <div>
      <header className="App-header">
        <h1>NFT Web App Integration</h1>
        <h6>{`Current user address: ${userAddress}`}</h6>

        {!hasRespondedNFTs && <h1> Loading NFTs... </h1>}
        {hasRespondedNFTs && NFTsOwned.length == 0 && <h1> No NFTs available </h1>}
        {hasRespondedNFTs && NFTsOwned.length > 0 && (
          <div>
            <h2>Pick your NFT!</h2>
            {NFTsOwned.map((nftId) => (
              <span id={`nft${nftId}`} key={nftId}>
                <img
                  src={`https://stacksgamefi.mypinata.cloud/ipfs/QmS57rKdQB7ioMsg5PNUdyzzQnZpfzPZF5G63E1xkGci4w/${nftId}.png`}
                  alt={`duck ${nftId}`}
                  width="100"
                ></img>
              </span>
            ))}
          </div>
        )}

        <button className="Connect" onClick={disconnect}>
          Disconnect Wallet
        </button>
      </header>
    </div>
  );
};
