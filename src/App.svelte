<script>
import DraggableList from "./DraggableList.svelte"
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Drag and drop test</h1>
  <DraggableList count=5 />
</main>
