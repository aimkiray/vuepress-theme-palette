<template>
	<div class="header-wrapper" ref="header">
		<div class="title-wrapper">
			<router-link to="/" class="title">{{ $site.title }}</router-link>
		</div>
		<div v-if="$themeConfig.nav" class="nav-wrap">
			<component
				v-for="item in $themeConfig.nav"
				:key="item.text"
				class="nav-item"
				v-bind="linkProps(item.link)"
				>{{ item.text }}
			</component>
		</div>
	</div>
</template>

<script>
import headerFont from "../fonts/PacfontGood.woff2";
import axios from "axios";

export default {
	methods: {
		linkProps(url) {
			if (url.match(/^(http(s)?|ftp):\/\//)) {
				return {
					is: "a",
					href: url,
					target: "_blank",
					rel: "noopener",
				};
			}
			return {
				is: "router-link",
				to: url,
			};
		}
	},
	mounted() {
		axios({
			url: headerFont,
            method: "GET",
            responseType: "text",
		}).then((response) => {
			var fontCode = "@font-face { font-family: 'PacfontGood'; src: url('" + response.config.url + "') format('woff2')}";
			var styleElement = document.createElement("style");
			if (styleElement.styleSheet) {
				styleElement.styleSheet.cssText = fontCode;
			} else {
				styleElement.innerHTML = fontCode;
			}
            document.head.appendChild(styleElement);
            this.$refs.header.style.fontFamily = "PacfontGood";
            this.$refs.header.style.visibility = "visible";
		});
	},
};
</script>

<style lang="stylus">
.header-wrapper {
    visibility: hidden;
	padding: 1rem 1rem;
	height: 5rem;
	background-color: white;

	.title-wrapper {
		width: 20rem;
		margin-right: calc(100% - 38rem);
		display: inline-block;

		.title {
			padding: 0 0.5rem 0 0.5rem;
			border-right: 0.75rem solid $link-color;
			animation: blink 1s infinite;
			font-size: 3rem;
			text-decoration: underline;

			@media screen and (max-width: $mobile-width) {
				font-size: 2.5rem;
				border-right: 0.5rem solid $link-color;
			}
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
			border-right-color: $link-color;
		}

		100% {
			border-right-color: $link-color;
		}
	}

	.nav-wrap {
		max-width: 20rem;
		display: inline-block;

		.nav-item {
			font-size: 1.5rem;
			padding-left: 0.5rem;
			color: $accent-color;
		}

		@media screen and (max-width: $mobile-width) {
			display: table;
			max-width: 100%;
			width: 100%;
			table-layout: fixed;

			.nav-item {
				display: table-cell;
			}

			:nth-child(2) {
				text-align: center;
			}

			:last-child {
				text-align: right;
			}
		}
	}
}
</style>
