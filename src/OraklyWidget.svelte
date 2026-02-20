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
    background:none;
    position: fixed;
    height: 100%;
    top: 0px;
    right: 0px;
    overflow: visible;
    z-index:10000000000;
    color: black;
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