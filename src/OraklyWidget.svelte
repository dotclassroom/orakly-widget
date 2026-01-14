<script>
  import CollapsibleSidebar from "./components/CollapsibleSidebar.svelte";
  let { uid } = $props();
</script>

<div class="widget">
  <CollapsibleSidebar uid={uid} />
</div>

<style>
  .widget {
    font-family: Arial, sans-serif;
    border: 1px solid #ccc;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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