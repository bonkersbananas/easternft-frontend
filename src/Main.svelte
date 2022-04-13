<script>
  import { fade } from "svelte/transition";
  import Address from "./Address.svelte";
  import Box from "./Box.svelte";
  import ExplodeButton from "./ExplodeButton.svelte";
  import Fireworks from "./Fireworks.svelte";
  import { ethers } from "ethers";
  import { onMount } from "svelte";

  let isMinting = false;
  let message = "";
  let success = false;
  let currentAccount;
  let provider;

  const networks = {
    MAINNET: 137,
    MUMBAI: 80001,
  };
  const CURRENT_NETWORK = networks["MUMBAI"];

  const switchNetworkMessage = "💥 Please connect to the Polygon network 💥";

  // Guessing we could use something like https://docs.walletconnect.com, uncertain which is concensus atm?
  // for being able to open on a mobile browser without being in the wallet browser first
  const isCurrentNetwork = (chainId) => chainId == CURRENT_NETWORK;

  function handleChainChanged(chainId) {
    console.log(chainId);
    if (isCurrentNetwork(chainId)) {
      connectToWallet();
      message = "";
    } else {
      currentAccount = null;
      message = switchNetworkMessage;
    }
  }
  function connectToWallet() {
    provider.send("eth_requestAccounts").then((accounts) => {
      currentAccount = accounts[0];
    });
  }
  
  onMount(() => {
    window.ethereum.on("networkChanged", handleChainChanged);
    if (window.ethereum) {
      provider = new ethers.providers.Web3Provider(window.ethereum);
      provider.getNetwork().then((network) => {
        if (!isCurrentNetwork(network.chainId)) {
          message = switchNetworkMessage;
        } else {
          connectToWallet();
        }
      });
    }
  });

  // TODO connect mint
  async function mint() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        isMinting = false;
        success = true;
        resolve();
      }, 3000);
    });
  }

  let onClick = async () => {
    if (!isMinting) {
      isMinting = true;
      await mint();
    }
  };
</script>

<main>
  {#if currentAccount}
    <Address>{currentAccount}</Address>
  {/if}
  <p class="info">{message}</p>
  <Box>
    {#if isMinting}
      <h1 in:fade>Transaction pending...</h1>
      <!-- TODO href -->
      <p>See transaction <a href="">https://polygon...</a></p>
    {:else if success}
      <Fireworks />
      <h1 in:fade>CONGRATS 🎉 🍾</h1>
      <p>You have minted 1 Easter NFT!</p>
    {:else}
      <h1>Mint <b>Bankless.se</b> Easter NFT 🐣</h1>
      <p>Each NFT costs only x MATIC, but you can only have 100 🙀</p>
      <ExplodeButton {onClick} disabled={!currentAccount} />
    {/if}
  </Box>
</main>

<style>
  :global(body) {
    background: #c6ffdd; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to left,
      #f7797d,
      #fbd786,
      #c6ffdd
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to left,
      #f7797d,
      #fbd786,
      #c6ffdd
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    padding: 1em;
    margin: 0 auto;
  }

  h1 {
    color: red;
    text-transform: uppercase;
    font-size: 3em;
    font-weight: 100;
  }

  /* NOTE: Gradient text, leaving as potential funky alternative
  h1 span {
    background-image: linear-gradient(to left, #f7797d, #e4ac28, #f7797d);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  } */

  b {
    color: black;
    text-decoration: underline red;
  }

  p {
    font-size: 1.5em;
    font-weight: 100;
    font-family: monospace;
  }

  .info {
    color: red;
  }
</style>
