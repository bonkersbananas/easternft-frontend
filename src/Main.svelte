<script>
  import { fade } from "svelte/transition";
  import Address from "./Address.svelte";
  import Box from "./Box.svelte";
  import ExplodeButton from "./ExplodeButton.svelte";
  import Fireworks from "./Fireworks.svelte";
  import { ethers } from "ethers";
  import { onMount } from "svelte";

  let isMinting = false;
  let success = false;
  let currentAccount;

  // Guessing we'll use something like https://docs.walletconnect.com, uncertain which is concensus atm?

  // NOTE: leaving as certain functions aren't available through AlchemyProvider api
  // const url =
  //   `https://polygon-mumbai.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}/`;
  // const provider = new ethers.providers.JsonRpcProvider(url);
  const provider = new ethers.providers.AlchemyProvider(
    "maticmum",
    process.env.ALCHEMY_MUMBAI_API_KEY
  );

  // Logging to play with in console
  console.log(provider);

  onMount(() => {
    // This'll just work for metamask, also I assumed we'd be able to connect with
    // alchemy provider... which isn't working the way I expected
    if (window.ethereum) {
      window.ethereum.send("eth_requestAccounts", []).then((data) => {
        currentAccount = data.result[0];
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
      <ExplodeButton {onClick} />
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
</style>
