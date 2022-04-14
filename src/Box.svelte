<section class="box">
  <slot />
</section>

<style>
  section {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
    background: white;
    border-radius: 2px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    min-width: 310px;
    max-width: 750px;
    height: 350px;
    border: black solid 4px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 640px) {
    section {
      padding: 0em;
    }

    :global(section.box h1) {
      font-size: 2.6em;
      line-height: 0.9;
    }
  }
</style>
