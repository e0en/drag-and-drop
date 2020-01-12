<script>
import DraggableList from "./DraggableList.svelte"
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
  .draggable-list {
    width: 300px;
    height: 400px;
    background: #eee;
    padding: 1em;
    overflow: auto;
  }
  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <h1>Drag and drop test</h1>
  <div class="draggable-list">
    <DraggableList count=100 />
  </div>
</main>
