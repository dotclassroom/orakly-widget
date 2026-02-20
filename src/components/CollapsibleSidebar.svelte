<script>
  import Fuse from 'fuse.js';
  import SearchListItem from './SearchListItem.svelte';
  import { SEARCH_URL, VIDEO_HOST } from '../config.js';
  import DescriptionSection from './DescriptionSection.svelte';

  let { uid } = $props();

  let status = $state("closed");
  let searchTerm = $state('');
  let answers = $state([]);
  let selectedAnswer = $state(null);

  function selectAnswer(index) {
    selectedAnswer = answers[index];
  }

  function toggleSidebar() {
    if (status === "closed") {
      status = "open";
      
      // Focus the field
      const inputs = document.getElementsByClassName("ow-search-input");
      const textField = inputs.length ? inputs[0] : null;
      if (textField) textField.focus();

    } else {
      status = "closed";
      selectedAnswer = null;
    }
  }

  async function searchSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    status = "full";
    selectedAnswer = null;

    await fetchSearchResults();
  }

  async function fetchSearchResults() {
    const url = SEARCH_URL.replace(/:USERID/, uid);
    // const url = `${SEARCH_URL}?query=${encodeURIComponent(searchTerm)}&category=all&filterBy=RECENT&userId=${uid}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (data.answers) {

        answers = data.answers.map(v => { return {
          thumbnail: v.thumbnail,
          title: v.title,
          titleSnippet: v.title.length > 60 ? v.title.substring(0, 60)+'...' : v.title,
          upVotesCount: v.upVotes.length,
          video: v.video,
          body: v.body,
          bodySnippet: v.body.length > 80 ? v.body.substring(0, 80)+'...' : v.body,
          transcriptions: v.transcript,
          transcriptionFullText: v.transcript ? v.transcript.map(t => t.transcript || "").join(" ") : ""
        }});

        if (searchTerm) {
          const fuse = new Fuse(answers, { 
            keys: [
              {name: "title", weight: 0.3 },
              {name: "body", weight: 0.3 },
              {name: "transcriptionFullText", weight: 1 }
            ],
            ignoreLocation: true,
            findAllMatches: true,
            minMatchCharLength: 3, // search requires at least 3 characters
            includeMatches: true,
            includeScore: true,

            // how much of the search term can be different in the match
            // EG. 0.2 means 20% of the term does not have to match
            // Searching for "where" will match "answered" because only 1 letter is missing
            threshold: 0.2, 
          });
          const searchResult = fuse.search(searchTerm);
          answers = searchResult.map(r => r.item);
        }
      }
    } else {
      console.error(res.status, res.statusText);
    }
  }
</script> 
 
<div class="ow-sidebar {status}">
  <button class="ow-need-help-button" onclick={toggleSidebar}>🔎 Search Video FAQs</button>
  <div class="ow-search-container">
    <div class="ow-search-inner">
      <div class="ow-full-header">
        <span class="ow-full-header-title">Orakly</span>
        <button class="ow-full-header-close" onclick={toggleSidebar}>X</button>
      </div>

      {#if !selectedAnswer}
      <span class="ow-search-title">What are you looking for?</span>
      {/if}
      <form class="ow-search-form" onsubmit={ e=>{ searchSubmit(e); e.target.querySelector('[name=search]').blur(); }}>
        <input class="ow-search-input" bind:value={searchTerm} name="search" type="text" placeholder="Find Answers"/>
        <button class="ow-search-submit" onclick={e=>searchSubmit(e)}>&rarr;</button>
      </form>

      {#if selectedAnswer}
        <span class="ow-search-results-title">{selectedAnswer.title}</span>
        {#if selectedAnswer.video }
          <video 
            src={ VIDEO_HOST + selectedAnswer.video } 
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
          {#key answers}
            {#each answers as item, index}
            <SearchListItem item={item} onClicked={selectAnswer.bind(item, index)}/>
            {/each}
          {/key}
        </div>
      {/if}

      {#if selectedAnswer}
        <DescriptionSection selectedAnswer={selectedAnswer} />
      {/if}

      <a href="https://orakly.com" class="ow-powered-by">Powered By Orakly</a>
    </div>
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

  .ow-full-header { display:none; }
  .ow-sidebar.full .ow-full-header {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
  }
  .ow-full-header-title {
    font-weight: bold;
    font-size:1.5rem;
    color: black;
    font-variant:small-caps;
  }
  .ow-full-header-close {
    font-weight: bold;
    font-size:1.5rem;
    cursor: pointer;
    padding: 0.25rem 0.5rem;
    border: none;
    background:none;
  }

  .ow-search-inner {
    background: #f8f9fa;
    padding:0.5rem 0.5rem 0.25rem 0.5rem;
    display:flex;
    flex-direction:column;
    gap: 1rem;
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
    width: 22rem;
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
    font-size: 70%;
    text-align: center;
    opacity: 0.7;
    margin-top: auto;
    color: #4338CA;
    text-decoration:none;
  }

  .ow-search-results-title { display:none; }
  .ow-sidebar.full .ow-search-results-title { display:block; }
  .ow-search-results-list {
    display: none;
    flex-direction: column;

    flex-grow: 1;
    flex-shrink: 1;
    gap: 1rem;
    overflow-y:scroll;

  }
  .ow-sidebar.full .ow-search-results-list { display:flex; }

  .ow-search-results-placeholder {
    width: 100%;
    height: 5rem;
    background: linear-gradient(45deg, white 10%, #82C8AD 40%, #82C8AD 60%, white 90%);
    border-radius: 0.5rem;
  }

</style>