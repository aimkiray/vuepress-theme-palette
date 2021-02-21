<template>
	<div>
		<!-- <div class="cat-ear">
            <span class="a-ear">▲</span>
            <span class="a-ear">▲</span>
        </div> -->
		<div class="copyright">
			<p>
				© 2014 - 2200
				<a href="https://meowwoo.com">aimkiray</a>.
			</p>
            <p>
				Built with ♥ and VuePress. 
				Designed by
				<a
					href="https://github.com/aimkiray/vuepress-theme-palette"
					target="_blank"
					>aimkiray</a
				>.
				<span></span>
			</p>
		</div>
	</div>
</template>

<style lang="stylus" scoped>
.copyright {
	font-size: 1rem;
	// background: linear-gradient(to top, $bg-color, #fff);
	color: #fc8181;
	text-align: center;
	height: 5rem;
	padding: 5rem 0 0 0.5rem;
    display block;

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