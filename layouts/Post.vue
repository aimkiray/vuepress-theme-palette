<template>
    <div class="font-sans text-base md:text-lg">
        <div class="content-wrapper flex items-center">
            <div class="w-full md:mx-auto content-border">
                <div class="px-2 py-0 md:px-20 md:py-0 bg-white">
                    <div class="post-header">
                        <h1 class="post-title">{{ $frontmatter.title }}</h1>
                        <div class="post-meta">
                            Last modified @ {{ resolvePostDate($frontmatter.date) }}
                        </div>
                    </div>
                    <Content/>
                    <div class="post-tags">
                        <router-link class="post-tag" v-for="tag in resolvePostTags($frontmatter.tags)" :key="tag"
                                     :to="'/tag/' + tag"># {{ tag }}
                        </router-link>
                    </div>
                    <Comment/>
                </div>
            </div>
        </div>
        <Toc/>
    </div>
</template>

<script>
    import {Comment} from '@vuepress/plugin-blog/lib/client/components'
    import Toc from '@theme/components/Toc.vue'
    import dayjs from 'dayjs'

    export default {
        components: {
            Comment,
            Toc,
        },
        methods: {
            resolvePostDate(date) {
                return dayjs(date).format(
                    this.$themeConfig.dateFormat || 'MMM DD YYYY'
                )
            },

            resolvePostTags(tags) {
                if (!tags || Array.isArray(tags)) return tags;
                return [tags]
            },
        },
    }
</script>


<style lang="stylus">
    .content__default
        padding-bottom 2rem

    .post-header

        h1
            padding-bottom 0

        .post-title
            font-size: 2em;
            line-height: 1.2;
            margin-bottom: 0;
            color: $accentColor;

        .post-meta
            font-size: 14px;
            color: $grayTextColor
            padding-left: 1px;
            line-height: 2rem;

    .post-tags
        margin-bottom 2rem

        .post-tag
            position relative
            padding 4px 10px 4px 10px
            margin-right 5px
            font-size 14px
            border 2px solid $linkColor
            border-radius 2px
            color $grayTextColor

            &:hover
                color $linkColor

</style>