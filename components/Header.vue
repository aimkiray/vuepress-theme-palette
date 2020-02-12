<template>
    <div class="header-wrapper">
        <div class="title-wrapper">
            <router-link to="/" class="title">{{ $site.title }}</router-link>
        </div>
        <div v-if="$themeConfig.nav" class="nav-wrap">
            <router-link v-for="item in $themeConfig.nav" :key="item.text" class="nav-item" :to="item.link">
                {{ item.text }}
            </router-link>
            <a href="https://github.com/aimkiray" target="_blank" class="nav-item">Github</a>
        </div>
    </div>
</template>

<style lang="stylus">

    .header-wrapper
        padding: 2rem 0;

        .title
            font-family: 'Press Start 2P', cursive;
            display: inline-block;
            padding-left: .5rem;
            padding-right: 5px;
            border-right: 12px solid $linkColor;
            animation: blink 1s infinite;
            font-size 2rem
            @media screen and (max-width: $mobleWidth)
                font-size: 1.5rem;
                border-right: 8px solid $linkColor;

        @keyframes blink
            0%
                border-right-color: transparent;
            50%
                border-right-color: transparent;
            51%
                border-right-color: $linkColor;
            100%
                border-right-color: $linkColor;

        .nav-item
            font-family 'Press Start 2P', cursive
            padding-left .5rem
            color $accentColor
</style>
