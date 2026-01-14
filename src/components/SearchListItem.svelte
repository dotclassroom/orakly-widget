<script>
    let props = $props();

    const BASE_IMG_URL = `https://d2b9dqzqpgv14l.cloudfront.net/`;
    const thumbnail = props.item.thumbnail;
    const thumbnail_url = thumbnail ? BASE_IMG_URL + thumbnail : null;
    const title = props.item.title;
    const upVotesCount = props.item.upVotesCount;

    const onClicked = props.onClicked;
</script>

<button class="ow-search-result" onclick={onClicked}>
    <div class="ow-search-result-thumbnail">{#if thumbnail_url}<img src={thumbnail_url} alt={title} />{/if}</div>
    <span class="ow-search-result-name">{title}</span>
    <span class="ow-search-result-likes">{upVotesCount} likes</span>
</button>

<style>
  .ow-search-result {
    display:flex;
    flex-direction: column;
    gap: 0.5rem;
    max-height: 11rem;
  }
  .ow-search-result-thumbnail {
    width: 100%;
    height: 5rem;
    background: linear-gradient(45deg, white 10%, #82C8AD 40%, #82C8AD 60%, white 90%);
    border-radius: 0.5rem;
  }
  .ow-search-result-thumbnail img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .ow-search-result-name {

  }
  .ow-search-result-likes {
    font-size: 90%;
    opacity: 0.8;
  }
</style>