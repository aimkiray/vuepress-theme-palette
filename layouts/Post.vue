<template>
        <div class="content-wrapper">
            <div class="w-full md:mx-auto">
                <div class="px-2 py-0 md:px-20 md:py-0 bg-white post-wrapper">
                    <div class="post-header">
                        <h1 class="post-title">{{ $frontmatter.title }}</h1>
                        <div
                            class="post-meta"
                        >Last modified @ {{ resolvePostDate($frontmatter.date) }}</div>
                    </div>
                    <Content />
                    <div class="post-tags">
                        <router-link
                            class="post-tag"
                            v-for="tag in resolvePostTags($frontmatter.tags)"
                            :key="tag"
                            :to="'/tag/' + tag"
                        >#{{ tag }}</router-link>
                    </div>
                    <Comment />
                </div>
            </div>
            <Toc />
        </div>
</template>

<script>
import { Comment } from "@vuepress/plugin-blog/lib/client/components";
import Toc from "@theme/components/Toc.vue";
import dayjs from "dayjs";

export default {
    components: {
        Comment,
        Toc,
    },
    methods: {
        resolvePostDate(date) {
            return dayjs(date).format(
                this.$themeConfig.dateFormat || "MMM DD YYYY"
            );
        },

        resolvePostTags(tags) {
            if (!tags || Array.isArray(tags)) return tags;
            return [tags];
        },
    },
};
</script>


<style lang="stylus">
.post-wrapper {
    border: 2px solid;
}

.post-header {
    h1 {
        padding-bottom: 0;
    }

    .post-title {
        font-family: $fonts-serif;
        font-size: 2rem;
        font-weight: 600;
        line-height: 1.2;
        margin-bottom: 0;
        color: $accent-color;
    }

    .post-meta {
        font-family: $fonts-sans-serif;
        font-size: 0.9rem;
        color: $gray-text-color;
        padding-left: 1px;
        line-height: 2rem;
    }
}

.post-tags {
    margin-bottom: 2rem;

    .post-tag {
        position: relative;
        padding: 4px 10px 4px 10px;
        margin-right: 5px;
        font-family: $fonts-sans-serif;
        font-size: 14px;
        font-family $fonts-serif
        border: 2px solid $link-color;
        border-radius: 2px;
        color: $gray-text-color;

        &:hover {
            color: $link-color;
        }
    }
}

.content__default {
    padding-bottom: 2rem;
}

ul, ol {
    list-style-type: disc;
    padding-left: 1.6rem;
    margin: 0.7rem 0;
}

li {
    margin: 0.2rem 0;
}

kbd {
    background: #eee;
    border: solid 0.15rem #ddd;
    border-bottom: solid 0.25rem #ddd;
    border-radius: 0.15rem;
    padding: 0 0.15em;
}

blockquote {
    font-size: 0.9rem;
    color: #999;
    border-left: 0.5rem solid #dfe2e5;
    margin: 0.5rem 0;
    padding: 0.25rem 0 0.25rem 1rem;

    & > p {
        margin: 0;
    }
}

strong {
    font-weight: 600;
}

h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    font-family: $fonts-serif;
    margin: 40px auto 30px auto;
    line-height: 1.75rem;
}

h1 {
    font-size: 1.8em;
}

h2 {
    font-size: 1.6em;
}

h3 {
    font-size: 1.4em;
}

h4 {
    font-size: 1.2em;
}

h5 {
    font-size: 1em;
}

h6 {
    font-size: 1em;
}

p {
    font-family: $fonts-sans-serif;
}

a.header-anchor {
    font-size: 1em;
    float: left;
    margin-left: -0.87em;
    padding-right: 0.23em;
    opacity: 1;

    &:hover {
        text-decoration: none;
    }

    @media (max-width: $mobile-width) {
        opacity: 0;
    }
}

code, kbd, .line-number {
    font-family: $fonts-monospace;
}

hr {
    border: 0;
    border-top: 1px solid $border-color;
}

table {
    border-collapse: collapse;
    margin: 1rem 0;
    display: block;
    overflow-x: auto;
}

tr {
    border-top: 1px solid #dfe2e5;

    &:nth-child(2n) {
        background-color: #f6f8fa;
    }
}

th, td {
    border: 1px solid #dfe2e5;
    padding: 0.6em 1em;
}

img {
    max-width: 100%;
    max-height: 100%;
    display: block;
    margin: auto;
}
</style>