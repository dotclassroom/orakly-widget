<script>
  import SearchListItem from './SearchListItem.svelte';
  import { SEARCH_URL, VIDEO_HOST } from '../config.js';

  let { uid } = $props();

  let status = $state("closed");
  let searchTerm = $state('');
  let questions = $state([]);
  let selectedQuestion = $state(null);

  function selectQuestion(index) {
    selectedQuestion = questions[index];
    console.log('Selected Question', index, JSON.stringify(selectedQuestion));
  }

  function toggleSidebar() {
    if (status === "closed") {
      status = "open";
    } else {
      status = "closed";
      selectedQuestion = null;
    }
  }

  async function searchSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    status = "full";
    selectedQuestion = null;

    await fetchSearchResults();
  }

  async function fetchSearchResults() {
    const url = `${SEARCH_URL}?query=${encodeURIComponent(searchTerm)}&category=all&filterBy=RECENT&userId=${uid}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.questions) {
        questions = data.questions.map(v => { return {
          thumbnail: v.thumbnail,
          title: v.title,
          upVotesCount: v.upVotesCount,
          video: v.video,
        }});

        console.log(data.questions[1]);
      }
    } else {
      console.error(res.status, res.statusText);
    }
  }
</script>
 
<div class="ow-sidebar {status}">
  <button class="ow-need-help-button" onclick={toggleSidebar}>💬 Need Help?</button>
  <div class="ow-search-container">
    <div class="ow-search-inner">
      <div class="ow-full-header">
        <span class="ow-full-header-title">orakly</span>
        <button class="ow-full-header-close" onclick={toggleSidebar}>X</button>
      </div>

      <span class="ow-search-title">What are you looking for?</span>

      <form class="ow-search-form" onsubmit={ e=>{ searchSubmit(e); e.target.querySelector('[name=search]').blur(); }}>
        <input class="ow-search-input" bind:value={searchTerm} name="search" type="text" placeholder="Find Answers"/>
        <span class="ow-search-submit">&rarr;</span>
      </form>

      {#if selectedQuestion}
        <span class="ow-search-results-title">{selectedQuestion.title}</span>
        {#if selectedQuestion.video }
          <video 
            src={ VIDEO_HOST + selectedQuestion.video } 
            preload="auto" 
            autoplay="" 
            controls="" 
            controlslist="nodownload" 
            style="width: 100%;"
          >
            <track kind="captions" />
          </video>
        {:else}
          <div class="ow-search-results-placeholder"></div>
        {/if}

      {:else}

        <div class="ow-search-results-list">
          {#each questions as item, index}
          <SearchListItem item={item} onClicked={selectQuestion.bind(item, index)}/>
          {/each}
        </div>

      {/if}

      <span class="ow-powered-by">Powered By Orakly</span>
    </div>
  </div>
</div>

<style>

  .ow-sidebar {
    position: absolute;
    display:flex;
    top: calc(50% - 2rem);
    right: 0;
    background: #f8f9fa;
    box-shadow: 2px 0 5px rgba(0,0,0,0.2);
    transition: transform 0.3s ease;
    z-index: 90;
  }

  .ow-sidebar.full {
    top: 0;
    height: 100%;
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
    width:20rem;
  }
  .ow-sidebar.closed .ow-search-container { 
  }

  .ow-full-header { display:none; }
  .ow-sidebar.full .ow-full-header {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
  }
  .ow-full-header-title {
    font-weight: bold;
    color: black;
    font-variant:small-caps;
  }
  .ow-full-header-close {
    font-weight: bold;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border: none;
    background:none;
  }

  .ow-search-inner {
    padding:0.5rem 0.5rem 0.25rem 0.5rem;
    display:flex;
    flex-direction:column;
    gap: 0.5rem;
    box-sizing: border-box;
    height:100%;
  }
  .ow-search-title { 
    font-size: 85%;
    margin-top:auto;
  }
  .ow-sidebar.full .ow-search-title {
    margin: 0;
  }
  .ow-search-form {
    display:flex;
    position:relative;
  }
  .ow-search-input { 
    width: 18rem;
    padding: 0.75rem;
    padding-left: 1.25rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 5px rgba(67,56,202,0.5);
    border:1px solid #4338CA;
    outline-color: #4338CA;
  }
  .ow-search-submit { 
    border-radius: 2rem;
    font-size: 100%;
    background: black;
    color: white;
    cursor: pointer;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    right: 0.5rem;
    top: 0.45rem;
    height: 1.7rem;
    width: 1.7rem;
  }
  .ow-powered-by { 
    font-size: 60%;
    text-align: center;
    opacity: 0.7;
    margin-top: auto;
  }

  .ow-search-results-title { display:none; }
  .ow-sidebar.full .ow-search-results-title { display:block; }
  .ow-search-results-list {
    display: none;

    flex-grow: 1;
    flex-shrink: 1;
    min-height: 10rem;
    grid-template-columns: 1fr 1fr;
    gap: 0.5rem;
    overflow-y:scroll;

  }
  .ow-sidebar.full .ow-search-results-list { display:grid; }

  .ow-search-results-placeholder {
    width: 100%;
    height: 5rem;
    background: linear-gradient(45deg, white 10%, #82C8AD 40%, #82C8AD 60%, white 90%);
    border-radius: 0.5rem;
  }

</style>