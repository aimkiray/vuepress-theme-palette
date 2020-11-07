<template>
  <Sticker id="postToc" v-if="visible" class="post-toc" v-bind="$attrs">
    <div
      v-for="(item, index) in $page.headers"
      ref="chairTocItem"
      :key="index"
      class="post-toc-item"
      :class="[
        `post-toc-h${item.level}`,
        { active: activeIndex === index },
      ]"
    >
      <a :href="`#${item.slug}`" :title="item.title">{{ item.title }}</a>
    </div>
  </Sticker>
</template>

<script>
import Sticker from "./Sticker.vue";
let initTop;

// get offset top
function getAbsoluteTop(dom) {
  return dom && dom.getBoundingClientRect
    ? dom.getBoundingClientRect().top +
        document.body.scrollTop +
        document.documentElement.scrollTop
    : 0;
}

export default {
  components: {
    Sticker,
  },

  data() {
    return {
      activeIndex: 0,
    };
  },

  computed: {
    visible() {
      return (
        this.$frontmatter &&
        this.$frontmatter.toc !== false &&
        !!(this.$page && this.$page.headers && this.$page.headers.length)
      );
    },
  },

  watch: {
    activeIndex() {
      const items = this.$refs.chairTocItem || [];
      const dom = items[this.activeIndex];
      if (!dom) return;
      const rect = dom.getBoundingClientRect();
      const wrapperRect = this.$el.getBoundingClientRect();
      const top = rect.top - wrapperRect.top;
      if (top < 20) {
        this.$el.scrollTop = this.$el.scrollTop + top - 20;
      } else if (top + rect.height > wrapperRect.height) {
        this.$el.scrollTop += rect.top - (wrapperRect.height - rect.height);
      }
    },

    $route() {},
  },

  mounted() {
    // sync visible to parent component
    const syncVisible = () => {
      this.$emit("visible-change", this.visible);
    };
    syncVisible();
    this.$watch("visible", syncVisible);

    // binding event
    setTimeout(() => this.triggerEvt(), 1000);

    this._onScroll = () => this.onScroll();
    this._onHashChange = () => {
      const hash = decodeURIComponent(location.hash.substring(1));
      const index = (this.$page.headers || []).findIndex(
        (h) => h.slug === hash
      );
      if (index >= 0) this.activeIndex = index;
      const dom = hash && document.getElementById(hash);
      if (dom) window.scrollTo(0, getAbsoluteTop(dom) - 20);
    };
    window.addEventListener("scroll", this._onScroll);
    // window.addEventListener('hashchange', this._onHashChange);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this._onScroll);
    window.removeEventListener("hashchange", this._onHashChange);
  },

  methods: {
    onScroll() {
      if (initTop === undefined) {
        initTop = getAbsoluteTop(this.$el);
      }

      // update position
      const scrollTop =
        document.body.scrollTop + document.documentElement.scrollTop;
      const headings = this.$page.headers || [];

      const tocElement = document.getElementById("postToc");
      if (scrollTop >= 200) {
        tocElement.classList.remove("hide-element");
        tocElement.classList.add("show-element");
      }

      if (scrollTop < 200 && tocElement.classList.contains("show-element")) {
        tocElement.classList.remove("show-element");
        tocElement.classList.add("hide-element");
      }

      // change active toc with scrolling
      let i = 0;
      const addLink = (index) => {
        this.activeIndex = index;
      };

      for (; i < headings.length; i++) {
        const dom = document.getElementById(headings[i].slug);
        const top = getAbsoluteTop(dom);
        if (top - 50 < scrollTop) {
          addLink(i);
        } else {
          if (!i) addLink(i);
          break;
        }
      }
    },

    triggerEvt() {
      this._onScroll();
      this._onHashChange();
    },
  },
};
</script>

<style lang="stylus" scoped>
.table-of-contents {
  display: none !important;
}

.post-toc {
  position: fixed;
  display: none;
  max-height: 100vh;
  max-width: 220px;
  overflow-y: auto;
  margin-top: 5rem;
  padding 1rem 0 1rem 0
  top: 0;
  right: 10px;
  box-sizing: border-box;
  z-index: 0;
  opacity: 0;
  border 2px solid #ffefef;
  border-left none
  background: linear-gradient(to left, #ffefef, #ffefef) left top no-repeat,
              linear-gradient(to bottom, #ffefef, #ffefef) left bottom no-repeat;
  background-size: 2px 1rem, 2px 1rem;

  .post-toc-item {
    position: relative;
    padding: 0.1rem 0.6rem 0.1rem 1rem;
    line-height: 1.5rem;
    border-left: 2px solid #ffefef;
    overflow: hidden;

    a {
      display: block;
      color: $text-color;
      width: 100%;
      box-sizing: border-box;
      font-family: $fonts-sans-serif;
      font-size: 0.75rem;
      font-weight: 400;
      text-decoration: none;
      transition: color 0.3s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &.active {
      border-left-color: $link-color;

      a {
        color: $link-color;
      }
    }

    &:hover {
      a {
        color: $link-color;
      }
    }
  }

  for i in range(3, 6) {
    .post-toc-h{i} a {
      padding-left: 1rem * (i - 2);
    }
  }
}

// for post-toc
@media (min-width: $mobile-width) {
  .post-toc {
    display: block;
  }
}
</style>
