<script>
  let { selectedAnswer } = $props();
  let transcriptions = selectedAnswer.transcriptions;
  let selectedTranscription = $state(getInitialTranscript());
  let showTranscription = $state(false);

  function getInitialTranscript() {
    if (!transcriptions || transcriptions.length === 0) return null;
    for (let t of transcriptions) if (t.language === "en") return t;
    return transcriptions[0];
  }

  function toggleTranscription() {
    showTranscription = !showTranscription;
  }


</script>

<div class="ow-description-section">
  {#if transcriptions && transcriptions.length > 0}

    <div class="ow-button-bar">
      {#if showTranscription}
        <select class=ow-transcription-select bind:value={selectedTranscription}>
          {#each transcriptions as t}
            <option value={t}>{t.language}</option>
          {/each}
        </select>
        <button class="ow-search-results-button" onclick={toggleTranscription}>Show Description</button>
      {:else}
        <button class="ow-search-results-button" onclick={toggleTranscription}>Show Transcription</button>
      {/if}
    </div>

  {:else}
    <span class="ow-no-transcript">No transcriptions available</span>
  {/if}

  {#if showTranscription && selectedTranscription}
    <div class="ow-transcription-section">
      <h3 class="ow-transcription-title">Video Transcription</h3>
      {selectedTranscription.transcript}
    </div>
  {:else}
    <div class="ow-description-body">
      <h3 class="ow-description-title">Video Description</h3>
      {selectedAnswer.body}
    </div>
  {/if}
</div>

<style>

  .ow-button-bar {
    display:flex;
    flex-direction: row;
    margin: 0 0 1rem 0;
    justify-content:space-between;
  }
  
  button, select {
    background: none;
    border: 2px solid #4338CA;
    color: #4338CA;
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
    border-radius: 0.5rem;
    cursor: pointer;
  }

  h3 {
    font-weight:bold;
    font-size: 1.1rem;
    margin-bottom:0.5rem;
  }


</style>