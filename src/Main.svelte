<script>
  import Box from "./Box.svelte";
  import ExplodeButton from "./ExplodeButton.svelte";
  import { fade } from "svelte/transition";

  let isMinting = false;
  let success = false;

  // TODO connect mint
  async function mint() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        isMinting = false;
        success = true;

        console.log(isMinting);
        console.log(success);
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
  <Box>
    {#if isMinting}
      <h1 in:fade>Transaction pending...</h1>
      <!-- TODO href -->
      <p>See transaction <a href="">https://polygon...</a></p>
    {:else if success}
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
