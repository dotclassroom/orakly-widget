<script>
  import Search from './Search.svelte';

  let { uid } = $props();
  let searchInstance;
  let status = $state("closed");

  function toggleSidebar() {
    if (status === "closed") {
      status = "open";
      searchInstance.focus();
    } else {
      status = "closed";
      searchInstance.reset();
    }
  }

  function onSearch() {
    status = "full";
  }

  function onClose() {
    status = "closed";
    searchInstance.reset();
  }

</script> 
 
<div class="ow-sidebar {status}">
  <button class="ow-need-help-button" onclick={toggleSidebar}>Search Video FAQs</button>
  <div class="ow-search-container">
    <Search 
      bind:this={searchInstance} 
      onClose={onClose} 
      onSearch={onSearch} 
      status={status} 
      uid={uid} 
    />
  </div>
</div>

<style>

  .ow-sidebar {
    position: absolute;
    display:flex;
    top: calc(50% - 2rem);
    right: 0;
    background: none;
    transition: transform 0.3s ease;
    z-index: 900;
  }

  .ow-sidebar.full {
    top: 0;
    height: 100%;
    padding-left: 0.5rem;
    border-top-left-radius: 1.5rem;
    border-bottom-left-radius: 1.5rem;
  }

  .ow-need-help-button {
    z-index: 100;
    padding: 1rem 0.66rem;
    background: #4338CA;
    color: white;
    border: none;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    cursor: pointer;
    writing-mode: vertical-rl;
    overflow:hidden;
  }

  .ow-sidebar.full .ow-need-help-button {
    background: none;
    width: 0;
    margin: 0;
    padding: 0;
  }

  .ow-sidebar.open {
  }

  .ow-sidebar.closed {
  }

  .ow-search-container { 
    transition: width 0.3s ease;
    width: 0;
    overflow:hidden;
    box-sizing: border-box;
  }
  .ow-sidebar.open .ow-search-container {
    width:15rem;
  }
  .ow-sidebar.full .ow-search-container {
    width:24rem;
  }
  .ow-sidebar.closed .ow-search-container { 
  }

  

</style>