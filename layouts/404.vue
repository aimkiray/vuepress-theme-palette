<template>
	<div>
		<div class="notfound-wrapper">
			<img
				class="default-drop-shadow"
				@click="findAkari()"
				src="/akari-404.png"
				alt="404 not found"
				ref="notFound"
			/>
		</div>
	</div>
</template>

<script>
export default {
	mounted() {
		this.$nextTick(function () {
			this.$emit('dom-updated')
		});
	},
	methods: {
		findAkari() {
			if (this.$refs.notFound.className == "default-drop-shadow") {
				this.$refs.notFound.className = "excited-drop-shadow";
			} else {
				this.$refs.notFound.className = "default-drop-shadow";
			}
		},
	},
};
</script>

<style lang="stylus" scoped>
.notfound-wrapper {
	display: flex;
	justify-content: center;
	height: 25rem;

	img {
		max-width: 100%;
		max-height: 25rem;
		display: block;
		margin: auto;
	}

	.default-drop-shadow {
		filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2));
	}

	.excited-drop-shadow {
		filter: drop-shadow(100px 0 0 rgba(0, 0, 0, 0.3));
	}
}
</style>