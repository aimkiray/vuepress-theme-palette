<template>
    <div class="content-wrapper flex items-center">
        <div class="w-full md:mx-auto">
            <div class="px-2 py-5 md:px-20 md:py-10 bg-white">
                <div class="ui-post" v-for="page in $pagination.pages" :key="page.key">
                    <div class="ui-post-title">
                        <router-link :to="page.path">{{ page.title }}</router-link>
                    </div>

                    <p class="ui-post-summary">
                        {{ page.frontmatter.summary || page.summary }}
                    </p>

                    <div v-if="page.frontmatter.date" class="ui-post-meta ui-post-date">
                        <span>{{ resolvePostDate(page.frontmatter.date) }}</span>
                    </div>

                    <div v-if="page.frontmatter.tags" class="ui-post-meta ui-post-tag">
                        <router-link
                                v-for="tag in resolvePostTags(page.frontmatter.tags)"
                                :key="tag"
                                :to="'/tag/' + tag"
                        >
                            # {{ tag }}
                        </router-link>
                    </div>
                </div>

                <div id="pagination">
                    <router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink">Prev</router-link>
                    <router-link v-if="$pagination.hasNext" :to="$pagination.nextLink">Next</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import dayjs from 'dayjs'

    export default {
        name: "List",
        methods: {
            resolvePostDate(date) {
                return dayjs(date).format(
                    this.$themeConfig.dateFormat || 'ddd MMM DD YYYY'
                )
            },

            resolvePostTags(tags) {
                if (!tags || Array.isArray(tags)) return tags;
                return [tags]
            },
        },
    }
</script>

<style lang="stylus" scoped>
    .ui-post
        padding-bottom 25px
        margin-bottom 25px

        &:last-child
            border-bottom 0
            margin-bottom 0

    .ui-post-title
        font-family $defaultFont
        font-size 28px
        border-bottom 0

        a
            cursor pointer
            color $darkTextColor
            transition all 0.2s
            text-decoration none

            &:hover
                text-decoration underline

    .ui-post-summary
        font-size 1rem
        color rgba($darkTextColor, 0.54)
        font-weight 400

    .ui-post-meta
        display inline-flex
        align-items center
        font-size 12px
        line-height 12px

        &:not(:last-child)
            margin-bottom 3px
            margin-right 20px

        svg
            margin-right 5px
            width 14px
            height 14px

        @media (max-width: $mobleWidth)
            display flex

            &:not(:last-child)
                margin-bottom 10px

    .ui-post-author
        color rgba($darkTextColor, 0.84)
        font-weight 600

    .ui-post-date
        color rgba($darkTextColor, 0.54)
        font-weight 400

    .ui-post-tag
        color rgba($darkTextColor, 0.54)
        font-weight 400

        a
            color inherit
            font-weight 400
            /*font-style italic*/
            text-decoration none
            margin-right 5px

            &:hover
                color $accentColor

</style>