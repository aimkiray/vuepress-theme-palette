<template>
	<div>
		<div class="post-wrapper">
			<div class="post-header">
				<h1 class="post-title">{{ $frontmatter.title }}</h1>
				<div class="post-meta">
					Last modified @ {{ resolvePostDate($frontmatter.date) }}
				</div>
			</div>
			<Content />
			<div class="post-tags">
				<router-link
					class="post-tag"
					v-for="tag in resolvePostTags($frontmatter.tags)"
					:key="tag"
					:to="'/tag/' + tag"
					>#{{ tag }}</router-link
				>
			</div>
			<script
				src="https://utteranc.es/client.js"
				repo="aimkiray/blog-comments"
				issue-term="pathname"
				theme="boxy-light"
				crossorigin="anonymous"
				async
			></script>
			<!-- <Giscus
				id="comments"
				repo="aimkiray/blog-comments"
				repoId="R_kgDOGTdEWg"
				category="General"
				categoryId="DIC_kwDOGTdEWs4CR3R2"
				mapping="pathname"
                term="40404040404"
				reactionsEnabled="1"
				emitMetadata="0"
				inputPosition="top"
				theme="light_high_contrast"
				lang="en"
				loading="lazy"
			/> -->
		</div>

		<Toc />
	</div>
</template>

<script>
import Toc from "@theme/components/Toc.vue";
import dayjs from "dayjs";

export default {
	components: {
		Toc,
	},
	methods: {
		resolvePostDate(date) {
			return dayjs(date).format(
				this.$themeConfig.dateFormat || "MMM DD YYYY"
			);
		},

		resolvePostTags(tags) {
			if (!tags || Array.isArray(tags)) return tags;
			return [tags];
		},
	},
};
</script>


<style lang="stylus">
.utterances {
	max-width: 1024px;
}

.post-wrapper {
	max-width: 50rem;
	margin: 0 auto;
	padding: 2.5rem 5rem;

	@media only screen and (max-width: $small-width) {
		padding: 0 0.5rem;
	}
}

.post-header {
	margin-bottom: 4rem;

	h1 {
		padding-bottom: 0;
	}

	.post-title {
		font-family: $fonts-serif;
		font-size: $title-font-size;
		font-weight: 600;
		margin-bottom: 0.125rem;
		color: $accent-color;
	}

	.post-meta {
		font-family: $fonts-sans-serif;
		font-size: 0.875rem;
		color: $gray-text-color;
		padding-left: 0.125rem;
	}
}

.post-tags {
	margin-bottom: 2rem;

	.post-tag {
		position: relative;
		padding: 0.25rem 0.625rem;
		margin-right: 0.375rem;
		font-family: $fonts-sans-serif;
		font-size: 0.875rem;
		font-family: $fonts-serif;
		border: 0.125rem solid $link-color;
		border-radius: 0.125rem;
		color: $gray-text-color;

		&:hover {
			color: $link-color;
		}
	}
}

ul, ol {
	list-style-type: disc;
	padding-left: 1.6rem;
	margin: 0.7rem 0;
}

li {
	margin: 0.2rem 0;
    white-space: normal;
    word-wrap: break-word;
}

kbd {
	background: #eee;
	border: solid 0.15rem #ddd;
	border-bottom: solid 0.25rem #ddd;
	border-radius: 0.15rem;
	padding: 0 0.15rem;
}

blockquote {
	font-size: 0.9rem;
	color: #999;
	border-left: 0.5rem solid #dfe2e5;
	margin: 0.5rem 0;
	padding: 0.25rem 0 0.25rem 1rem;

	& > p {
		margin: 0;
	}
}

strong {
	font-weight: 600;
}

h1, h2, h3, h4, h5, h6 {
	font-family: $fonts-serif;
	margin: 1.5rem auto 1rem;
}

h1 {
	font-size: 1.5rem;
	font-weight: 600;
}

h2 {
	font-size: 1.375rem;
	font-weight: 600;
}

h3 {
	font-size: 1.25rem;
	font-weight: 600;
	background-color: $text-bg-color;
	color: #fff;
	padding: 0 0.25rem 0 2.5rem;
	display: inline-block;

	a {
		color: #fff;
	}
}

h4 {
	font-size: 1.125rem;

	a.header-anchor {
		margin-left: -1.125rem;
		opacity: 0;
	}
}

h5, h6 {
	font-size: 1rem;

	a.header-anchor {
		margin-left: -1rem;
		opacity: 0;
	}
}

p {
	font-family: $fonts-sans-serif;
}

a.header-anchor {
	margin-left: -1.25rem;

	&:hover {
		text-decoration: none;
	}

	@media only screen and (max-width: $small-width) {
		opacity: 0;
	}
}

code, kbd, .line-number {
	font-family: $fonts-monospace;
}

hr {
	border: 0;
	border-top: 1px solid $border-color;
}

table {
	border-collapse: collapse;
	margin: 1rem 0;
	display: block;
	overflow-x: auto;
}

tr {
	border-top: 1px solid #dfe2e5;

	&:nth-child(2n) {
		background-color: #f6f8fa;
	}
}

th, td {
	border: 1px solid #dfe2e5;
	padding: 0.6rem 1rem;
}

img {
	max-width: 100%;
	max-height: 100%;
	display: block;
	margin: auto;
	// padding: 1rem;
	// box-shadow: inset 0 0 0 2px rgb(255, 255, 255), 0.3rem 0.3rem 1rem rgba(0, 0, 0, 0.3);
}
</style>