<template>
    <div class="header-wrapper">
        <div id="textAnime" class="wave"></div>

        <div class="title-wrapper">
            <router-link to="/" class="title">{{ $site.title }}</router-link>
        </div>
        <div class="header-right-wrap">
            <ul v-if="$themeConfig.nav" class="nav">
                <li v-for="item in $themeConfig.nav" :key="item.text" class="nav-item">
                    <router-link to="item.link">{{ item.text }}</router-link>
                </li>
            </ul>
        </div>
    </div>

</template>

<script>

    export default {
        mounted() {
            let enableAnime = 0;
            const textAnime = document.getElementById('textAnime');
            // 动态创建canvas
            const canvas = document.createElement("canvas");
            if (!canvas.getContext) return;
            const ctx = canvas.getContext('2d');
            canvas.style.zIndex = -998;
            // 减1防止超出边界
            canvas.setAttribute('width', (textAnime.offsetWidth - 1));
            canvas.setAttribute('height', textAnime.offsetHeight);

            textAnime.appendChild(canvas);

            /*Modify options here*/
            //possible characters that will appear
            const characterList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

            //stocks possible character attributes
            const layers = {
                n: 5, //number of layers
                letters: [textAnime.offsetWidth/15, textAnime.offsetWidth/30, textAnime.offsetWidth/35, textAnime.offsetWidth/40, textAnime.offsetWidth/45],
                coef: [0.1, 0.2, 0.4, 0.6, 0.8], //how much the letters move from the mouse (starting from the deepest layer)
                size: [16, 22, 36, 40, 46], //font size of the letters (starting from the deepest layer)
                color: ['#fff', '#eee', '#ccc', '#bbb', '#aaa'], //color of the letters (starting from the deepest layer)
                font: 'Courier' //font family (of every layer)
            };

            /*End of options*/


            let characters = [];
            let mouseX = textAnime.offsetWidth / 2;
            let mouseY = textAnime.offsetHeight / 3;

            const rnd = {
                btwn: function (min, max) {
                    return Math.floor(Math.random() * (max - min) + min);
                },
                choose: function (list) {
                    return list[rnd.btwn(0, list.length)];
                }
            };


            /*LETTER DRAWING*/

            function drawLetter(char) {
                ctx.font = char.size + 'px ' + char.font;
                ctx.fillStyle = char.color;

                let x = char.posX + (mouseX - canvas.width / 2) * char.coef;
                let y = char.posY + (mouseY - canvas.height / 2) * char.coef;

                ctx.fillText(char.char, x, y);
            }


            /*ANIMATION*/

            document.onmousemove = function (ev) {
                let tempY = ev.pageY - canvas.offsetTop;
                if (tempY < window.outerHeight) {
                    mouseX = ev.pageX - canvas.offsetLeft;
                }

                if (tempY < textAnime.offsetHeight) {
                    mouseY = tempY;
                }

                if (enableAnime) {
                    if (window.requestAnimationFrame) {
                        requestAnimationFrame(update);
                    } else {
                        update();
                    }
                }
            };

            function update() {
                clear();
                render();
            }

            function clear() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }

            function render() {
                for (var i = 0; i < characters.length; i++) {
                    drawLetter(characters[i]);
                }
            }


            /*INITIALIZE*/

            function createLetters() {
                for (var i = 0; i < layers.n; i++) {
                    for (var j = 0; j < layers.letters[i]; j++) {

                        let character = rnd.choose(characterList);
                        let x = rnd.btwn(0, canvas.width);
                        let y = rnd.btwn(0, canvas.height);

                        characters.push({
                            char: character,
                            font: layers.font,
                            size: layers.size[i],
                            color: layers.color[i],
                            layer: i,
                            coef: layers.coef[i],
                            posX: x,
                            posY: y
                        });

                    }
                }
            }

            createLetters();
            update();


            /*REAJUST CANVAS AFTER RESIZE*/

            window.onresize = function () {
                canvas.setAttribute('width', (textAnime.offsetWidth - 1));
                canvas.setAttribute('height', textAnime.offsetHeight);
                characters = [];
                mouseX = textAnime.offsetWidth / 2;
                mouseY = textAnime.offsetHeight / 2;
                createLetters();
                update();
            };
        }
    };

</script>

<style lang="stylus">

    .wave {
        height $headerHeight;
    }


    // border-bottom 5px solid lighten(#3eaf7c, 50%)
    .header-wrapper {

        ol, ul {
            list-style: none;
            margin: 0;
            padding: 0;
        }

        .title {
            font-family: 'Press Start 2P', cursive;
            display: inline-block;
            padding-right: 5px;
            border-right: 10px solid $linkColor;
            animation: blink 1s infinite;
            @media screen and (max-width: 370px) {
                font-size: 14px;
                border-right: 4px solid $linkColor;
            }
        }

        @keyframes blink {
            0% {
                border-right-color: transparent;
            }
            50% {
                border-right-color: transparent;
            }
            51% {
                border-right-color: $linkColor;
            }
            100% {
                border-right-color: $linkColor;
            }
        }

        .header-right-wrap {
            flex: 1;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .nav {
                flex: 0 0 auto;
                display: flex;
                margin: 0;

                .nav-item {
                    margin-left: 20px;

                    a {
                        font-family: $myFont;
                        font-size: 20px;
                        // color lighten(#3eaf7c, 30%)
                        text-decoration: none;
                        transition: color 0.3s;
                    }
                }
            }
        }
    }

    @media (max-width: $MQMobile) {
        #header {
            display: none;
        }

        .header-wrapper {
            flex-direction: column;

            .header-right-wrap {
                display: none;
            }
        }
    }
</style>
