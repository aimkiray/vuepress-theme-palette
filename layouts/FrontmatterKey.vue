<template>
	<div>
		<div class="tag-wrapper">
			<div class="tags">
				<router-link
					class="tag"
					v-for="tag in $frontmatterKey.list"
					:key="tag.name"
					:to="tag.path"
					:tag-weight="tag.pages.length"
					tag="div"
					>{{ tag.name }}
				</router-link>
			</div>
		</div>

		<div class="nyaa-wrapper">
			<span class="nyaa"></span><span class="nyaa nyaa-right"></span>
		</div>
	</div>
</template>

<script>
export default {
	mounted() {
		// config
		const fontMin = 15; //px
		const fontMax = 35; //px
		const valueAttributeName = "tag-weight"; // tag in which we puted value
		const tagsSelector = "[tag-weight]"; // tags elemnts selector
		const computeColor = true; // flag, if true color will be computed with size

		// mechanism
		const values = [];
		document.querySelectorAll(tagsSelector).forEach((tag) => {
			const tagValue = tag.getAttribute(valueAttributeName);

			values.push({
				el: tag,
				val: Number(tagValue),
			});
		});

		const valuesSorted = values.sort((a, b) => a.val - b.val);
		const valueMax = valuesSorted[valuesSorted.length - 1].val;

		valuesSorted.forEach((x) => {
			const { val, el } = x;

			const fontSize = Math.floor(
				(val / valueMax) * (fontMax - fontMin + 1) + fontMin
			);

			if (computeColor) {
				const color = Math.abs(Math.floor((val / valueMax) * 200 - 200))
					.toString(16)
					.repeat(3);

				el.style.color = `#${color}`;
			}

			el.style.fontSize = `${fontSize}px`;
		});
	},
};
</script>

<style lang="stylus" scoped>
.tag-wrapper {
	display: flex;
	justify-content: center;

	.tags {
		width: 900px;
		text-align: center;

		div {
			display: inline-block;
			line-height: 1.2em;
			vertical-align: middle;
			margin: 0 0.2em;
			transition: color 0.12s ease;
			cursor: pointer;
			user-select: none;

			&:hover {
				color: $border-color !important;
			}

			&:active {
				transform: translateY(4px);
			}
		}
	}
}

.nyaa-wrapper {
	text-align: center;
    padding-top: 2rem;

	.nyaa {
		position: relative;
		left: 0.4rem;
		display: inline-block;
		width: 3rem;
		height: 1.5rem;
		border: 0.4rem solid $border-color;
		border-radius: 0 0 100% 100% / 0 0 180% 160%;
		border-top: none;
	}

	.nyaa-right {
        left: 0;
		right: 0.4rem;
		border-radius: 0 0 100% 100% / 0 0 160% 180%;
	}
}
</style>