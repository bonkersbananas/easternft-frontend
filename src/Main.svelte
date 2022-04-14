<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Address from "./Address.svelte";
  import Box from "./Box.svelte";
  import ExplodeButton from "./ExplodeButton.svelte";
  import Fireworks from "./Fireworks.svelte";
  import {
    connectWallet,
    handleChainChanged,
    getPrice,
    mint,
    provider,
  } from "./ethereum";
  import { connected, wrongNetwork } from "./stores";

  let isMinting = false;
  let message = "";
  let success = false;
  let currentAccount;
  let price = "x";
  let transactionHash = "";

  wrongNetwork.subscribe((value) => {
    if (value) {
      message = "💥 Please connect to the Polygon network 💥";
    } else {
      message = "";
      connectWallet().then((address) => {
        currentAccount = address;
      });
    }
  });
  connected.subscribe((value) => {
    if (value) {
      getPrice().then((value) => {
        price = value;
      });
    }
  });

  onMount(() => {
    if (!provider) {
      message = "💥 Please change to web3 browser 💥";
    } else {
      window.ethereum.on("networkChanged", handleChainChanged);
    }
  });

  let onClick = async () => {
    if (!isMinting) {
      isMinting = true;
      const tx = await mint();
      transactionHash = tx.hash;
      await tx.wait();
      isMinting = false;
      success = true;
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
      {#if transactionHash}
        <p>
          <a href="https://polygonscan.com/tx/{transactionHash}"
            >See transaction</a
          >
        </p>
      {/if}
    {:else if success}
      <Fireworks />
      <h1 in:fade>CONGRATS 🎉 🍾</h1>
      <p>You have minted 1 Easter NFT!</p>
    {:else}
      <h1>Mint <b>Bankless.se</b> Easter NFT 🐣</h1>
      <p>Each NFT costs only {price} MATIC, grab 'em! 🙀</p>
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
