<template>
    <div class="post-tags">
        <router-link class="post-tag" v-for="tag in $frontmatterKey.list" :key="tag.name" :to="tag.path">
            # {{ tag.name }}
        </router-link>
    </div>
</template>

<style lang="stylus" scoped>

    .post-tags
        text-align center
        padding 2rem 1rem

        .post-tag
            display inline-block
            position relative
            padding 4px 10px 4px 10px
            margin-right .5rem
            margin-bottom .5rem
            font-size 14px
            border 2px solid $linkColor
            border-radius 2px
            color $grayTextColor

            &:hover
                color $linkColor
            &:last-child
                margin-right 0

</style>