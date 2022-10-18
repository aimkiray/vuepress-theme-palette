<template>
	<div ref="globalWrapper">
		<div class="la-pacman la-2x" ref="loading">
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>

		<div class="global-layout" ref="globalLayout">
			<Header class="header" />

			<div class="cat-ear">
				<span class="a-ear">▲</span>
				<span class="a-ear">▲</span>
			</div>

			<div class="main-wrapper" :style="{ borderTopLeftRadius: borderRadius, borderTopRightRadius: borderRadius }">
				<component :is="layout" />
                <!-- <DefaultGlobalLayout /> -->
			</div>

			<Footer class="footer" />
		</div>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-110966400-1"></script>
        <script>
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-110966400-1');
        </script>

	</div>
</template>

<script>
// import GlobalLayout from '@app/components/GlobalLayout.vue'
import Header from "@theme/components/Header.vue";
import Footer from "@theme/components/Footer.vue";
import Vue from "vue";

export default {
	components: {
		Header,
		Footer,
	},
	data() {
		return {
			borderRadius: "49% 0",
		};
	},
	computed: {
		layout() {
			const layout = this.getLayout();
			return Vue.component(layout);
		},
	},
	methods: {
		getLayout() {
			if (this.$page.path) {
				const layout = this.$page.frontmatter.layout;
				if (
					layout &&
					(this.$vuepress.getLayoutAsyncComponent(layout) ||
						this.$vuepress.getVueComponent(layout))
				) {
					return layout;
				}
				return "Layout";
			}
			return "NotFound";
		},
		setCat() {
			if (!this.timer) {
				this.timer = true;
				let that = this;
				setTimeout(function () {
					that.catRadius();
					that.timer = false;
				}, 200);
			}
		},
		catRadius() {
			const screenWidth = document.body.clientWidth;
			const radiusInfo =
				"49% " +
				parseInt(((screenWidth - 485) * 215 + 15520) / screenWidth) +
				"px";
			this.borderRadius = radiusInfo;
		},
	},
	mounted() {
		this.catRadius();
		window.addEventListener("resize", this.setCat);
		// this.refreshCat = setInterval(() => {
		// 	this.setCat();
		// }, 200);

		// this.$nextTick(function () {

		// 	this.$refs.loading.style.display = "none";
		// 	this.$refs.globalLayout.style.display = "flex";
		// });
	},
	// destroyed() {
	// 	window.removeEventListener("resize", this.setCat);
	// 	// return clearInterval(this.refreshCat);
	// },
};
</script>

<style lang="stylus">
/* Hide naive scrollbar */
html {
	/* Chrome, Safari and Opera */
	&::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
}

.global-layout {
	position: relative;
	display: flex;
	height: 100vh;
	flex-direction: column;
}

.header, .footer {
	flex: none;
}

.main-wrapper {
	flex: 1 0 auto;
	padding-top: 6rem;
	background: no-repeat linear-gradient($bg-color, #fff);
	background-size: 100% 30rem;
	box-shadow: rgba(0, 0, 0, 0.01) 0 -0.1rem 0.1rem, rgba(0, 0, 0, 0.04) 0 -0.25rem 0.25rem, rgba(0, 0, 0, 0.04) 0 -1rem 1rem, rgba(0, 0, 0, 0.01) 0 -1.5rem 1.5rem;

	@media only screen and (max-width: $small-width) {
		padding-top: 4rem;
	}

	@media only screen and (max-device-width: $mobile-width) {
		padding-top: 2rem;
	}
}

.cat-ear {
	font-family: monospace;
	text-transform: uppercase;
	text-align: center;
	position: relative;
	bottom: 3.5rem;
	letter-spacing: 5rem;
	height: 0;
	text-shadow: rgba(0, 0, 0, 0.01) 0 -0.1rem 0.1rem, rgba(0, 0, 0, 0.04) 0 -0.5rem 0.5rem;

	@media only screen and (max-width: $small-width) {
		bottom: 3rem;
		letter-spacing: 4rem;
	}

	@media only screen and (max-device-width: $mobile-width) {
		bottom: 2rem;
		letter-spacing: 2rem;
	}
}

@-moz-document url-prefix() {
	.cat-ear {
		bottom: 2rem;
	}
}

.a-ear {
	letter-spacing: 0;
	color: $bg-color;
	font-size: 12rem;
	line-height: 0;
	z-index: 1;

	@media only screen and (max-width: $small-width) {
		font-size: 10rem;
	}

	@media only screen and (max-device-width: $mobile-width) {
		font-size: 8rem;
	}
}

/*
 * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)
 * Copyright 2015 Daniel Cardoso <@DanielCardoso>
 * Licensed under MIT
 */
.la-pacman, .la-pacman > div {
	position: relative;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.la-pacman {
	margin: auto;
	display: none;
	font-size: 0;
	color: $link-color;
}

.la-pacman.la-dark {
	color: #333;
}

.la-pacman > div {
	display: inline-block;
	float: none;
	background-color: currentColor;
	border: 0 solid currentColor;
}

.la-pacman > div:nth-child(1), .la-pacman > div:nth-child(2) {
	width: 0;
	height: 0;
	background: transparent;
	border-style: solid;
	border-width: 16px;
	border-right-color: transparent;
	border-radius: 100%;
	-webkit-animation: pacman-rotate-half-up 0.5s 0s infinite;
	-moz-animation: pacman-rotate-half-up 0.5s 0s infinite;
	-o-animation: pacman-rotate-half-up 0.5s 0s infinite;
	animation: pacman-rotate-half-up 0.5s 0s infinite;
}

.la-pacman > div:nth-child(2) {
	margin-top: -32px;
	-webkit-animation-name: pacman-rotate-half-down;
	-moz-animation-name: pacman-rotate-half-down;
	-o-animation-name: pacman-rotate-half-down;
	animation-name: pacman-rotate-half-down;
}

.la-pacman > div:nth-child(3), .la-pacman > div:nth-child(4), .la-pacman > div:nth-child(5), .la-pacman > div:nth-child(6) {
	position: absolute;
	top: 50%;
	left: 200%;
	width: 8px;
	height: 8px;
	border-radius: 100%;
	opacity: 0;
	-webkit-animation: pacman-balls 2s 0s infinite linear;
	-moz-animation: pacman-balls 2s 0s infinite linear;
	-o-animation: pacman-balls 2s 0s infinite linear;
	animation: pacman-balls 2s 0s infinite linear;
}

.la-pacman > div:nth-child(3) {
	-webkit-animation-delay: -1.44s;
	-moz-animation-delay: -1.44s;
	-o-animation-delay: -1.44s;
	animation-delay: -1.44s;
}

.la-pacman > div:nth-child(4) {
	-webkit-animation-delay: -1.94s;
	-moz-animation-delay: -1.94s;
	-o-animation-delay: -1.94s;
	animation-delay: -1.94s;
}

.la-pacman > div:nth-child(5) {
	-webkit-animation-delay: -2.44s;
	-moz-animation-delay: -2.44s;
	-o-animation-delay: -2.44s;
	animation-delay: -2.44s;
}

.la-pacman > div:nth-child(6) {
	-webkit-animation-delay: -2.94s;
	-moz-animation-delay: -2.94s;
	-o-animation-delay: -2.94s;
	animation-delay: -2.94s;
}

.la-pacman.la-2x {
	width: 4rem;
	height: 4rem;
	position: fixed;
	left: 50%;
	top: 50%;
	margin-left: -2rem;
	margin-top: -2rem;
}

.la-pacman.la-2x > div:nth-child(1), .la-pacman.la-2x > div:nth-child(2) {
	border-width: 2rem;
}

.la-pacman.la-2x > div:nth-child(2) {
	margin-top: -4rem;
}

.la-pacman.la-2x > div:nth-child(3), .la-pacman.la-2x > div:nth-child(4), .la-pacman.la-2x > div:nth-child(5), .la-pacman.la-2x > div:nth-child(6) {
	width: 1rem;
	height: 1rem;
}

/*
 * Animations
 */
@keyframes pacman-rotate-half-up {
	0%, 100% {
		-webkit-transform: rotate(270deg);
		transform: rotate(270deg);
	}

	50% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@keyframes pacman-rotate-half-up {
	0%, 100% {
		-moz-transform: rotate(270deg);
		transform: rotate(270deg);
	}

	50% {
		-moz-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@keyframes pacman-rotate-half-up {
	0%, 100% {
		-o-transform: rotate(270deg);
		transform: rotate(270deg);
	}

	50% {
		-o-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@keyframes pacman-rotate-half-up {
	0%, 100% {
		-webkit-transform: rotate(270deg);
		-moz-transform: rotate(270deg);
		-o-transform: rotate(270deg);
		transform: rotate(270deg);
	}

	50% {
		-webkit-transform: rotate(360deg);
		-moz-transform: rotate(360deg);
		-o-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@keyframes pacman-rotate-half-down {
	0%, 100% {
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	50% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
}

@keyframes pacman-rotate-half-down {
	0%, 100% {
		-moz-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	50% {
		-moz-transform: rotate(0deg);
		transform: rotate(0deg);
	}
}

@keyframes pacman-rotate-half-down {
	0%, 100% {
		-o-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	50% {
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
	}
}

@keyframes pacman-rotate-half-down {
	0%, 100% {
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		-o-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	50% {
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
	}
}

@keyframes pacman-balls {
	0% {
		left: 200%;
		opacity: 0;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	5% {
		opacity: 0.5;
	}

	66% {
		opacity: 1;
	}

	67% {
		opacity: 0;
	}

	100% {
		left: 0;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
}

@keyframes pacman-balls {
	0% {
		left: 200%;
		opacity: 0;
		-moz-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	5% {
		opacity: 0.5;
	}

	66% {
		opacity: 1;
	}

	67% {
		opacity: 0;
	}

	100% {
		left: 0;
		-moz-transform: translateY(-50%);
		transform: translateY(-50%);
	}
}

@keyframes pacman-balls {
	0% {
		left: 200%;
		opacity: 0;
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	5% {
		opacity: 0.5;
	}

	66% {
		opacity: 1;
	}

	67% {
		opacity: 0;
	}

	100% {
		left: 0;
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}
}

@keyframes pacman-balls {
	0% {
		left: 200%;
		opacity: 0;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	5% {
		opacity: 0.5;
	}

	66% {
		opacity: 1;
	}

	67% {
		opacity: 0;
	}

	100% {
		left: 0;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}
}
</style>
