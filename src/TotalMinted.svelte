<script>
  import { onMount } from "svelte";

  import { getTotalMintedFraction } from "./ethereum.js";

  let totalMintedText = "...";

  onMount(() => {
    getTotalMintedFraction().then((totalMintedFraction) => {
      totalMintedText = totalMintedFraction;
    });
  });
</script>

<section>
  <p>Minted: {totalMintedText}</p>
</section>

<style>
  /* Semi-transparent grayish background with round corners */
  section {
    background: rgba(0, 0, 0, 0.025);
    border-radius: 10px;
    margin: 10px;
  }
  p {
    padding: 0px 10px;
    line-height: 0.8;
    background-image: linear-gradient(to left, #f7797d, #e4ac28, #f7797d);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color: transparent;
  }
</style>
