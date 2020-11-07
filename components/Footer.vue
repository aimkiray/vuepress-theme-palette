<template>
    <div>
        <!-- <div class="cat-ear">
            <span class="a-ear">▲</span>
            <span class="a-ear">▲</span>
        </div> -->
        <div class="copyright">
            <p>
                © 2014 - 2200
                <a href="https://meowwoo.com">Aimkiray</a>.
            </p>
            <p>
                Theme by
                <a
                    href="https://github.com/aimkiray/vuepress-theme-palette"
                    target="_blank"
                >Palette</a>.
                <span></span>
            </p>
        </div>
    </div>
</template>

<style lang="stylus" scoped>
.copyright {
    font-size: 0.875rem;
    // border-top: solid 0.5rem #fc8181;
    background-color: #FFEFEF;
    color: #fc8181;
    height: 5rem;
    padding: 0.5rem 0 0 0.5rem;

    p {
        margin: 0;
        font-family: $fonts-serif;
        font-weight: 600;
    }

    a {
        font-family: $fonts-serif;
        font-weight: 800;
    }

    span {
        font-family: $fonts-sans-serif;
        font-weight: 400;
    }
}

// .cat-ear {
//     font-family: arial;
//     text-transform: uppercase;
//     text-align: center;
//     letter-spacing: 3rem;
// }

// .a-ear {
//     letter-spacing: 0;
//     text-shadow: 0.5rem 0 #fc8181, -0.5rem 0 #fc8181, 0 -1rem #fc8181;
//     color: #FFEFEF;
//     font-size: 6rem;
//     line-height: 4rem;
//     z-index: 1;
//     position: relative;
//     bottom: -1.25rem;
// }
</style>