<template>
	<div>
		<div class="copyright">
			<p>
				© 2014-2333
				<router-link to="/">{{ $site.title }}</router-link
				>.
			</p>
			<p>
				<span>Built with ♥ and VuePress.</span>
				<span class="designed-by"
					>Designed by
					<a
						href="https://github.com/aimkiray/vuepress-theme-palette"
						target="_blank"
						>aimkiray</a
					>.</span
				>
			</p>
		</div>
	</div>
</template>

<style lang="stylus" scoped>
.copyright {
	font-size: 1rem;
	color: #fc8181;
	text-align: center;
	height: 5rem;
	padding: 2rem 0 0 0.5rem;
	display: block;

	@media only screen and (max-device-width: $mobile-width) {
		font-size: 0.75rem;

		.designed-by {
			display: block;
		}
	}

	p {
		margin: 0;
		font-family: $fonts-sans-serif;
		font-weight: 400;
	}

	a {
		font-family: $fonts-sans-serif;
		font-weight: 600;
	}

	span {
		font-family: $fonts-sans-serif;
		font-weight: 400;
	}
}
</style>