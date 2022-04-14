import { ethers } from "ethers";
import { CURRENT_NETWORK } from "./settings";
import { address, connected, wrongNetwork } from "./stores";
import NFT from "./NFT";

export const provider =
  window.ethereum && new ethers.providers.Web3Provider(window.ethereum);

let contract = new ethers.Contract(
  CURRENT_NETWORK.contractAddress,
  NFT.abi,
  provider
);

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

export async function init() {
  const accounts = await provider.send("eth_accounts");
  const network = await provider.getNetwork();
  if (accounts.length) {
    address.set(accounts[0]);
  }
  if (!isCurrentNetwork(network.chainId)) {
    wrongNetwork.set(true);
    connected.set(true);
  } else if (accounts.length) {
    setContract();
    return await mintDone();
  }
}

export async function connectWallet() {
  const network = await provider.getNetwork();
  if (isCurrentNetwork(network.chainId)) {
    const accounts = await provider.send("eth_requestAccounts");
    setContract();
    address.set(accounts[0]);
  } else {
    wrongNetwork.set(true);
  }
}

export function handleChainChanged(chainId) {
  wrongNetwork.set(!isCurrentNetwork(chainId));
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

export async function mintDone() {
  const totalMinted = await contract.totalMinted();
  const totalSupply = await contract.maxSupply();
  return totalMinted === totalSupply
}

export async function getTotalMintedFraction() {
  const totalMinted = await contract.totalMinted();
  const totalSupply = await contract.maxSupply();
  return `${parseInt(totalMinted)} / ${parseInt(totalSupply)}`;
}
