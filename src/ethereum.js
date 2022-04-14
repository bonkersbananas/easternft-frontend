import { ethers } from "ethers";
import { CURRENT_NETWORK } from "./settings";
import { connected, wrongNetwork } from "./stores";
import NFT from "./NFT";

export const provider =
  window.ethereum && new ethers.providers.Web3Provider(window.ethereum);

let contract;

const isCurrentNetwork = (chainId) => chainId == CURRENT_NETWORK.chainId;

function setContract() {
  const signer = provider.getSigner();
  contract = new ethers.Contract(
    CURRENT_NETWORK.contractAddress,
    NFT.abi,
    signer
  );
  connected.set(true);
}

export async function connectWallet() {
  const network = await provider.getNetwork();
  if (isCurrentNetwork(network.chainId)) {
    const accounts = await provider.send("eth_requestAccounts");
    setContract();
    return accounts[0];
  }
  wrongNetwork.set(true);
  return null;
}

export function handleChainChanged(chainId) {
  if (isCurrentNetwork(chainId)) {
    wrongNetwork.set(false);
  } else {
    connected.set(false);
    wrongNetwork.set(true);
  }
}

export async function getPrice() {
  const price = await contract.getPrice();
  return ethers.utils.formatEther(price);
}

export async function mint() {
  const price = await contract.getPrice();
  const tx = await contract.mint({ value: price });
  return tx;
}
