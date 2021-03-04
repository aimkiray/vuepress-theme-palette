<template>
	<div class="global-layout">
		<Header class="header" />

		<div class="cat-ear">
			<span class="a-ear">▲</span>
			<span class="a-ear">▲</span>
		</div>

		<DefaultGlobalLayout class="main-wrapper" :style="borderRadius" />

		<Footer class="footer" />
	</div>
</template>

<script>
import GlobalLayout from "@app/components/GlobalLayout.vue";
import Header from "@theme/components/Header.vue";
import Footer from "@theme/components/Footer.vue";

export default {
	components: {
		DefaultGlobalLayout: GlobalLayout,
		Header,
		Footer,
	},
	data() {
		return {
			screenWidth: document.body.clientWidth,
			radiusSize: 30,
			borderRadius: {
				borderTopLeftRadius: "49% 32px",
				borderTopRightRadius: "49% 32px",
			},
		};
	},
	mounted() {
		const radiusInfo =
			"49% " +
			parseInt(
				((document.body.clientWidth - 485) * 215 + 15520) /
					document.body.clientWidth
			) +
			"px";
		this.borderRadius.borderTopLeftRadius = radiusInfo;
		this.borderRadius.borderTopRightRadius = radiusInfo;
		const that = this;
		window.onresize = () => {
			return (() => {
				window.screenWidth = document.body.clientWidth;
				that.screenWidth = window.screenWidth;
			})();
		};
	},
	watch: {
		screenWidth(val) {
			if (!this.timer) {
				this.screenWidth = val;
				this.timer = true;
				let that = this;
				setTimeout(function () {
					const radiusInfo =
						"49% " +
						parseInt(
							((document.body.clientWidth - 485) * 215 + 15520) /
								document.body.clientWidth
						) +
						"px";
					that.borderRadius.borderTopLeftRadius = radiusInfo;
					that.borderRadius.borderTopRightRadius = radiusInfo;
					that.timer = false;
				}, 500);
			}
		},
	},
};
</script>

<style lang="stylus">

/* Hide naive scrollbar */
body {
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
	background-size: 100% 40rem;
	box-shadow: rgba(0, 0, 0, 0.01) 0 -0.1rem 0.1rem, rgba(0, 0, 0, 0.04) 0 -0.25rem 0.25rem, rgba(0, 0, 0, 0.04) 0 -1rem 1rem, rgba(0, 0, 0, 0.01) 0 -1.5rem 1.5rem;
}

.cat-ear {
	font-family: monospace;
	text-transform: uppercase;
	text-align: center;
	letter-spacing: 5rem;
	position: relative;
	bottom: 3.5rem;
	height: 0;
	text-shadow: rgba(0, 0, 0, 0.01) 0 -0.1rem 0.1rem, rgba(0, 0, 0, 0.04) 0 -0.5rem 0.5rem;
}

.a-ear {
	letter-spacing: 0;
	color: $bg-color;
	font-size: 12rem;
	line-height: 0;
	z-index: 1;
}
</style>
