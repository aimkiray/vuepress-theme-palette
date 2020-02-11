<template>
    <div class="content-wrapper flex items-center">
        <div class="w-full md:mx-auto">
            <div class="px-2 py-5 md:px-20 md:py-10 bg-white">
                <div class="custom-post-list">
                    <div class="custom-post" v-for="page in $pagination.pages" :key="page.key">
                        <div class="custom-post-title">
                            <router-link :to="page.path">{{ page.title }}</router-link>
                        </div>

                        <p class="custom-post-summary">
                            {{ page.frontmatter.summary || page.summary }}
                        </p>

                        <div v-if="page.frontmatter.date" class="custom-post-meta custom-post-date">
                            <span>{{ resolvePostDate(page.frontmatter.date) }}</span>
                        </div>

                        <div v-if="page.frontmatter.tags" class="custom-post-meta custom-post-tag">
                            <router-link
                                    v-for="tag in resolvePostTags(page.frontmatter.tags)"
                                    :key="tag"
                                    :to="'/tag/' + tag"
                            >
                                # {{ tag }}
                            </router-link>
                        </div>
                    </div>
                </div>

                <div class="pagination-wrapper">
                    <router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink">
                        <svg class="pagination-btn btn--prev" height="96" viewBox="0 0 24 24" width="96"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                            <path d="M0-.5h24v24H0z" fill="none"/>
                        </svg>
                    </router-link>
                    <svg v-else class="pagination-btn btn--prev btn--disabled" height="96" viewBox="0 0 24 24" width="96"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"/>
                        <path d="M0-.5h24v24H0z" fill="none"/>
                    </svg>


                    <div class="pagination-container">
                        <div class="little-dot  little-dot--first"></div>
                        <div class="little-dot">
                            <div class="big-dot-container">
                                <div class="big-dot"></div>
                            </div>
                        </div>
                        <div class="little-dot  little-dot--last"></div>
                    </div>

                    <router-link v-if="$pagination.hasNext" :to="$pagination.nextLink">
                        <svg class="pagination-btn btn--next" height="96" viewBox="0 0 24 24" width="96"
                             xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                            <path d="M0-.25h24v24H0z" fill="none"/>
                        </svg>
                    </router-link>
                    <svg v-else class="pagination-btn btn--next btn--disabled" height="96" viewBox="0 0 24 24" width="96"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"/>
                        <path d="M0-.25h24v24H0z" fill="none"/>
                    </svg>
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
                    this.$themeConfig.dateFormat || 'MMM DD YYYY'
                )
            },
            resolvePostTags(tags) {
                if (!tags || Array.isArray(tags)) return tags;
                return [tags]
            },
        },
        mounted() {
            var btns = document.querySelectorAll('.pagination-btn');
            var paginationWrapper = document.querySelector('.pagination-wrapper');
            var bigDotContainer = document.querySelector('.big-dot-container');
            var littleDot = document.querySelector('.little-dot');

            for (var i = 0; i < btns.length; i++) {
                btns[i].addEventListener('click', btnClick);
            }

            function btnClick() {
                if (this.classList.contains('btn--prev')) {
                    paginationWrapper.classList.add('transition-prev');
                } else {
                    paginationWrapper.classList.add('transition-next');
                }

                var timeout = setTimeout(cleanClasses, 500);
            }

            function cleanClasses() {
                if (paginationWrapper.classList.contains('transition-next')) {
                    paginationWrapper.classList.remove('transition-next')
                } else if (paginationWrapper.classList.contains('transition-prev')) {
                    paginationWrapper.classList.remove('transition-prev')
                }
            }
        }
    }
</script>

<style lang="stylus" scoped>

    .custom-post
        padding-bottom 2rem
        margin-bottom 2rem

        &:last-child
            margin-bottom 4rem

    .custom-post-title
        font-family $defaultFont
        font-size 28px

        a
            cursor pointer
            color $accentColor
            transition all 0.2s
            text-decoration none
            font-weight 500

            &:hover
                color $linkColor

    .custom-post-summary
        font-size 1rem
        color rgba($darkTextColor, 0.54)
        font-weight 400
        margin-bottom 0

    .custom-post-meta
        display inline-flex
        align-items center
        font-size 12px
        line-height 12px
        padding-left 1px

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

    .custom-post-author
        color rgba($darkTextColor, 0.84)
        font-weight 600

    .custom-post-date
        color rgba($darkTextColor, 0.54)
        font-weight 400

    .custom-post-tag
        color rgba($darkTextColor, 0.54)
        font-weight 400

        a
            color inherit
            font-weight 400
            /*font-style italic*/
            text-decoration none
            margin-right 5px

            &:hover
                color $linkColor

    .pagination-wrapper {
        font-size: 0;
        position: absolute;
        text-align: center;
        margin-left 5.2rem
    }

    @keyframes pagination-container--animation-prev {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(18px);
        }
    }

    @keyframes pagination-container--animation-next {
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-18px);
        }
    }

    .transition-prev .pagination-container {
        animation: pagination-container--animation-prev 0.3s forwards;
    }

    .transition-next .pagination-container {
        animation: pagination-container--animation-next 0.3s forwards;
    }

    .little-dot {
        width: 6px;
        height: 6px;
        background: #FEB2B2;
        border-radius: 100%;
        display: inline-block;
        vertical-align: middle;
        margin: 0 6px;
        position: relative;
        z-index: 10;
    }

    .little-dot--first,
    .little-dot--last {
        z-index: 5;
    }

    @keyframes slideLeft {
        0% {
            transform: translateX(0px);
        }

        100% {
            transform: translateX(-18px);
        }
    }

    .transition-prev .little-dot--first {
        animation: slideLeft 0.4s 0.3s forwards cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    @keyframes little-dot--first--animation {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .transition-next .little-dot--first {
        animation: little-dot--last--animation 0.3s forwards;
    }


    @keyframes little-dot--last--animation {
        0% {
            opacity: 1;
        }
        100% {
            opacity: 0;
        }
    }

    .transition-prev .little-dot--last {
        animation: little-dot--last--animation 0.3s forwards;
    }

    @keyframes slideRight {
        0% {
            transform: translateX(0px);
            opacity: 1;
        }

        100% {
            transform: translateX(18px);
            opacity: 1;
        }
    }

    .transition-next .little-dot--last {
        animation: slideRight 0.4s 0.3s forwards cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    .big-dot {
        width: 12px;
        height: 12px;
        border-radius: 100%;
        background: $linkColor;
        position: absolute;
        top: 50%;
        right: -6px;
        transform: translateY(-50%);
    }

    .transition-next .big-dot {
        right: auto;
        left: -6px;
    }

    .big-dot-container {
        width: 18px;
        height: 18px;
        border-radius: 100%;
        position: absolute;
        top: 50%;
        right: 3px;
        transform: translateY(-50%);
        z-index: 10;
    }

    .transition-next .big-dot-container {
        right: auto;
        left: 3px;
    }

    @keyframes big-dot-container--animation-prev {
        0% {
            transform: translateY(-50%);
        }
        100% {
            transform: translateY(-50%) rotate(-179deg);
        }
    }

    @keyframes big-dot-container--animation-next {
        0% {
            transform: translateY(-50%);
        }
        100% {
            transform: translateY(-50%) rotate(-181deg);
        }
    }

    .transition-prev .big-dot-container {
        animation: big-dot-container--animation-prev 0.3s forwards;
    }

    .transition-next .big-dot-container {
        animation: big-dot-container--animation-next 0.3s forwards;
    }

    .pagination-btn {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        fill: $linkColor;
        cursor: pointer;
        transition: opacity 0.2s;
    }

    .pagination-btn:hover {
        opacity: 0.6;
    }

    .btn--next {
        left: calc(100% + 20px);
    }

    .btn--prev {
        right: calc(100% + 20px);
    }

    .btn--disabled
        fill $arrowBgColor
        cursor not-allowed

</style>