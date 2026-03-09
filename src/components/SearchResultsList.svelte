<script>
  import SearchListItem from './SearchListItem.svelte';

  let { status, answers, selectAnswer } = $props();
</script>

<div class="ow-search-results-list {status}">
  {#key answers}
    {#each answers as item, index}
    <SearchListItem item={item} onClicked={selectAnswer.bind(item, index)}/>
    {/each}
  {/key}
</div>


<style>
  .ow-search-results-list {
    display: none;
    flex-direction: column;

    flex-grow: 1;
    flex-shrink: 1;
    gap: 1rem;
    overflow-y:scroll;

  }
  .ow-search-results-list.full { display:flex; }
</style>