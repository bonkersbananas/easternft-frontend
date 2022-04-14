<script>
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";
  import Address from "./Address.svelte";
  import Box from "./Box.svelte";
  import Chicken from "./Chicken.svelte";
  import ExplodeButton from "./ExplodeButton.svelte";
  import Info from "./Info.svelte";
  import Button from "./Button.svelte";
  import Fireworks from "./Fireworks.svelte";
  import {
    connectWallet,
    handleChainChanged,
    getPrice,
    mint,
    provider,
    init,
  } from "./ethereum";
  import { address, connected, wrongNetwork } from "./stores";

  let isMinting = false;
  let message = "";
  let success = false;
  let currentAccount;
  let price = "1";
  let transactionHash = "";
  let isConnected;

  onMount(() => {
    if (!provider) {
      message = "❣️ Please change to web3 browser ❣️";
    } else {
      window.ethereum.on("chainChanged", handleChainChanged);
      init();
    }
  });

  wrongNetwork.subscribe((value) => {
    if (value) {
      if (currentAccount) {
        message = "❣️ Please switch to the Polygon network ❣️";
      } else {
        message = "❣️ Please connect to the Polygon network ❣️";
      }
    } else {
      message = "";
    }
  });

  connected.subscribe((value) => {
    isConnected = value;
    if (value) {
      getPrice().then((value) => {
        price = value;
      });
    }
  });

  address.subscribe((value) => {
    currentAccount = value;
  });

  let onClick = async () => {
    if (!isMinting) {
      isMinting = true;
      let tx;
      try {
        tx = await mint();
        transactionHash = tx.hash;
        await tx.wait();
        isMinting = false;
        success = true;
      } catch (e) {
        isMinting = false;
        message = "❣️ An error occurred. Reload page to try again ❣️";
      }
    }
  };
</script>

<main>
  {#if currentAccount}
    <Address>{currentAccount}</Address>
  {/if}
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
      {#if isConnected && !message}
        <ExplodeButton {onClick} />
      {:else if !message}
        <Button onClick={connectWallet}>Connect</Button>
      {/if}
    {/if}
    <p class="info">{message}</p>
  </Box>
  <Info />
  <Chicken />
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
    min-height: 100vh;
  }

  h1 {
    color: #f7797d;
    /* text-transform: uppercase; */
    font-size: 3em;
    font-weight: 600;
    font-family: "Poppins", Georgia, Times, serif;
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
    text-transform: uppercase;
  }

  p {
    font-size: 1.5em;
    font-weight: 100;
    font-family: monospace;
  }

  .info {
    color: #f7797d;
  }
</style>
