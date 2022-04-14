<script>
    import { fade } from "svelte/transition";
    export let disabled = false;
    export let onClick = () => {
      console.log("Clicked...");
    };
</script>

<button in:fade on:click={onClick} {disabled}><slot /></button>

<style>
    button {
      font-size: 1.5em;
      font-weight: 300;
      max-height: 5rem;
      max-width: 300px;
      padding: 1em;
      background: red;
      color: #fff;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    button[disabled] {
      opacity: 0.5;
      cursor: default;
    }
  </style>