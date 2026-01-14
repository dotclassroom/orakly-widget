<script>
    import { IMAGE_HOST } from '../config.js';
    let props = $props();

    const thumbnail = props.item.thumbnail;
    const thumbnail_url = thumbnail ? IMAGE_HOST + thumbnail : null;
    const title = props.item.title;
    const titleSnippet = props.item.titleSnippet;
    const body = props.item.body;
    const bodySnippet = props.item.bodySnippet;

    const onClicked = props.onClicked;
</script>

<button class="ow-search-result" onclick={onClicked}>
    <div class="ow-search-result-thumbnail">{#if thumbnail_url}<img src={thumbnail_url} alt={title} /><div class="ow-video-play"></div>{/if}</div>
    <div class="ow-search-result-details">
      <span class="ow-search-result-name" title={title}>{titleSnippet}</span>
      <span class="ow-search-result-body" title={body}>{bodySnippet}</span>
    </div>
</button>

<style>
  .ow-search-result {
    display:flex;
    flex-direction: row;
    gap: 1rem;
    max-height: 11rem;
    padding:0;
    
    appearance: none;
    border: none;
    background: rgba(0,0,0,0);
    cursor: pointer;
    text-align: left;
    border-radius:1rem;
  }

  .ow-search-result:hover {
    background: rgba(0,0,0,0.05);
  }

  .ow-search-result-thumbnail {
    height: 8rem;
    min-width: 8rem;
    max-width: 8rem;
    flex-shrink: 0;
    background: linear-gradient(45deg, white 10%, #82C8AD 40%, #82C8AD 60%, white 90%);
    border-radius: 1rem;
    position:relative;
  }
  .ow-search-result-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius:1rem;
    display:flex;
    align-items:center;
    justify-content: center;
  }

  .ow-search-result-details {
    display:flex;
    flex-direction: column;
    gap: 1rem;
    padding-top:0.5rem;
    align-items:flex-start;
    padding-right:0.5rem;
  }
  .ow-search-result-name {
    font-weight: bold;
    font-size: 110%;
  }
  .ow-search-result-likes {
    font-size: 90%;
    opacity: 0.8;
  }
  .ow-video-play {
    position: absolute;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    display:flex;
    justify-content: center;
    align-items: center;
  }
  /* .ow-video-play::before {
    border-radius: 2rem;
    content: '▶';
    font-size: 2rem;
    line-height: 2rem;
    background: white;
    width: 4rem;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
  .ow-video-play::after {
    border-radius: 2rem;
    content: '▶';
    color: #4338CA;
    font-size: 1.3rem;
    line-height: 1.3rem;
    background: rgba(255, 255, 255, 0.8);
    width: 2.4rem;
    height: 2.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    outline: solid 0.8rem rgba(255, 255, 255, 0.3);
  }
</style>