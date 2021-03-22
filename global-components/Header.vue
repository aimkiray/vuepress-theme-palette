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
import headerFont from "../fonts/Pacfont.woff2";
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
		},
	},
	mounted() {
		axios
			.get(headerFont, { responseType: "arraybuffer" })
			.then((response) => {
				var base64String = btoa(
					new Uint8Array(response.data).reduce(
						(data, byte) => data + String.fromCharCode(byte),
						""
					)
				);
				var fontCode =
					"@font-face { font-family: 'PacfontGood'; src: url('data:application/font-woff2;charset=utf-8;base64," +
					base64String +
					"') format('woff2')}";
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
		margin-right: calc(100% - 42rem);
		display: inline-block;

		.title {
			padding: 0 0.3rem 0 0.5rem;
			border-right: 0.65rem solid $link-color;
			animation: blink 1s infinite;
			font-size: 2.5rem;

			@media screen and (max-width: $mobile-width) {
				font-size: 2rem;
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
		max-width: 25rem;
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
