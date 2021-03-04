<template>
	<div class="notfound-wrapper">
		<img @click="reverseColor()" src="/akari-404.png" alt="404 not found" ref="notFound"/>
	</div>
</template>

<script>
export default {
    methods: {
        reverseColor() {
            if (this.$refs.notFound.style.backgroundColor != "black") {
                this.$refs.notFound.style.backgroundColor = "black"
            } else {
                this.$refs.notFound.style.backgroundColor = "transparent"
            }
        }
    }
}
</script>

<style lang="stylus">
.notfound-wrapper {
	img {
		max-width: 100%;
		max-height: 25rem;
		display: block;
		margin: auto;
	}
}
</style>