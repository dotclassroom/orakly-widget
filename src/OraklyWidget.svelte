<script>
  import CollapsibleSidebar from "./components/CollapsibleSidebar.svelte";
  let { uid } = $props();
</script>

<div class="ow-container">
  <CollapsibleSidebar uid={uid} />
</div>

<style>
  .ow-container {
    font-family: Arial, sans-serif;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    position: fixed;
    height: 100%;
    top: 0px;
    right: 0px;
    overflow: visible;
    z-index:10000000000;
  }
  
  button {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0057b3fc;
  }
</style>