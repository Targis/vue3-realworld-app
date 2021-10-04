<template>
  <div class="home-page">
    <mv-banner />
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <mv-feed-toggler />
          <mv-feed :api-url="apiUrl" />
        </div>
        <div class="col-md-3">
          <mv-popular-tags />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MvFeed from '@/components/Feed'
import MvPopularTags from '@/components/PopularTags'
import MvBanner from '@/components/Banner'
import MvFeedToggler from '@/components/FeedToggler'
export default {
  name: 'MvYourFeed',
  components: {
    MvFeed,
    MvPopularTags,
    MvBanner,
    MvFeedToggler
  },
  data() {
    return {
      apiUrl: '/articles/feed'
    }
  }
}
</script>
