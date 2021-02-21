<template>
	<div class="header-wrapper">
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
};
</script>

<style lang="stylus">
.header-wrapper {
	padding: 1rem 1rem;
	height: 5rem;
	background-color: white;

	.title-wrapper {
		width: 10rem;
        margin-right: calc(100% - 22rem);
        display: inline-block;

		.title {
			font-family: $font-title;
			padding: 0 0.3rem 0 0.5rem;
			border-right: 0.75rem solid $link-color;
			animation: blink 1s infinite;
			font-size: 2.5rem;
			text-decoration: underline;

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
		max-width: 20rem;
        display: inline-block;

		.nav-item {
			font-family: $font-title;
			font-size: 1rem;
			padding-left: 0.5rem;
			color: $accent-color;
		}

        @media screen and (max-width: $mobile-width) {
			display: block;
		}
	}
}
</style>
