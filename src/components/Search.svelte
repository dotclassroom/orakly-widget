<script>
  import Fuse from 'fuse.js';
  import { SEARCH_URL, VIDEO_HOST } from '../config.js';
  import DescriptionSection from './DescriptionSection.svelte';
  import SearchResultsList from './SearchResultsList.svelte';
  import MagnifyIcon from './MagnifyIcon.svelte';
  import ArrowIcon from './ArrowIcon.svelte';

  let {status, onSearch, uid, onClose} = $props();

  let searchTerm = $state('');
  let answers = $state([]);
  let selectedAnswer = $state(null);
  let searchInputInstance;

  function selectAnswer(index) {
    selectedAnswer = answers[index];
  }

  export function reset() {
      selectedAnswer = null;
  }

  export function focus() {
      if (searchInputInstance) {
        searchInputInstance.focus();
        searchInputInstance.select();
      }
  }

  async function searchSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    onSearch();
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

  function onBack() {
    selectedAnswer = null;
    focus();
  }

</script>

<div class="ow-search-inner {status}">
  <div class="ow-full-header">
    <a href="https://orakly.com" title="Visit orakly.com">
      <img 
        src="data:image/png;base64,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" 
        alt="Orakly" 
        class="ow-header-logo"
      />
    </a>

    {#if !selectedAnswer}
      <span class="ow-search-title">What are you looking for?</span>
    {/if}

    <div class="ow-button-group">
      {#if selectedAnswer}
      <button class="ow-full-header-back" title="Back" onclick={onBack}><ArrowIcon /></button>
      {/if}
      <button class="ow-full-header-close" title="Close" onclick={onClose}>X</button>
    </div>
  </div>

  
  {#if status === "open"}
  <span class="ow-search-title">What are you looking for?</span>
  {/if}

  <form class="ow-search-form" onsubmit={ e=>{ searchSubmit(e); e.target.querySelector('[name=search]').blur(); }}>
    <div class="ow-search-input-group">
      <MagnifyIcon />
      <input class="ow-search-input" bind:this={searchInputInstance} bind:value={searchTerm} name="search" type="text" placeholder="Find Answers"/>
      <button class="ow-search-submit" onclick={e=>searchSubmit(e)}><ArrowIcon /></button>
    </div>
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
    <SearchResultsList status={status} answers={answers} selectAnswer={selectAnswer} />
  {/if}

  {#if selectedAnswer}
    <DescriptionSection selectedAnswer={selectedAnswer} />
  {/if}

  <a href="https://orakly.com" class="ow-powered-by">Powered By Orakly</a>
</div>

<style>
  .ow-search-inner {
    background: #f8f9fa;
    padding:0.5rem 0.5rem 0.25rem 0.5rem;
    display:flex;
    flex-direction:column;
    gap: 1rem;
    box-sizing: border-box;
    height:100%;
  }
  .ow-full-header { display:none; }
  .full .ow-full-header {
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    align-items:center;
  }
  .ow-header-logo {
    width:auto;
    height:2.5rem;
  }
  .ow-button-group {
    display:flex;
    flex-direction:row;
    justify-content:flex-end;
    gap:1rem;
  }
  .ow-full-header-back {
    cursor: pointer;
    padding: 0;
    border: none;
    background: none;
    display: flex;
    justify-content:center;
    width: 2rem;
    transform: scaleX(-1);
    height: 2rem;
    align-items: center;
  }
  .ow-full-header-back:hover {
    background: rgba(0,0,0,0.12);
    border-radius:2rem;
  }
  .ow-full-header-close {
    cursor: pointer;
    font-size:1.3rem;
    justify-content:center;
    padding: 0;
    border: none;
    background: none;
    display: flex;
    width: 2rem;
    height: 2rem;
    align-items: center;
  }
  .ow-full-header-close:hover {
    background: rgba(0,0,0,0.12);
    border-radius:2rem;
  }
  .ow-search-input-group { 
    display:flex;
    width: 100%;
  }

  .ow-search-title { 
    font-size: 85%;
    margin-top:auto;
  }
  .full .ow-search-title {
    margin: 0;
  }
  .ow-search-form {
    display:flex;
    position:relative;
  }
  .ow-search-input { 
    width: 22rem;
    padding: 0.75rem;
    padding-left: 2rem;
    border-radius: 5rem;
    border:1px solid rgb(165, 180, 252);
    outline:none;
  }
  .ow-search-input:focus {
    box-shadow: 0 0 0 4px rgba(165, 180, 252, 0.5);

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
    border:none;
    height:2rem;
    width:2rem;
    top:0.25rem;
    right:0.5rem;
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
  

  .ow-search-results-placeholder {
    width: 100%;
    height: 5rem;
    background: linear-gradient(45deg, white 10%, #82C8AD 40%, #82C8AD 60%, white 90%);
    border-radius: 0.5rem;
  }
</style>