<template>
	<div>
		<div class="page-wrapper px-10 md:px-20">
			<div class="post-list">
				<div
					class="post-block px-5 md:px-10"
					v-for="page in $pagination.pages"
					:key="page.key"
				>
					<div class="post-title">
						<router-link :to="page.path">{{
							page.title
						}}</router-link>
					</div>

					<div
						v-if="page.frontmatter.date"
						class="post-meta post-date"
					>
						<span>{{
							resolvePostDate(page.frontmatter.date)
						}}</span>
					</div>

					<div
						v-if="page.frontmatter.tags"
						class="post-meta post-tag"
					>
						<router-link
							v-for="tag in resolvePostTags(
								page.frontmatter.tags
							)"
							:key="tag"
							:to="'/tag/' + tag"
						>
							#{{ tag }}
						</router-link>
					</div>

                    <p class="post-summary">
						{{ page.frontmatter.summary || page.summary }}
					</p>

                    <router-link :to="page.path" class="button button--atlas">
						<span>Explosion</span>
						<div class="marquee" aria-hidden="true">
							<div class="marquee__inner">
								<span>Explosion</span>
								<span>Explosion</span>
								<span>Explosion</span>
								<span>Explosion</span>
							</div>
						</div>
					</router-link>
				</div>
			</div>

			<div class="pagination-wrapper">
				<router-link
					v-if="$pagination.hasPrev"
					:to="$pagination.prevLink"
				>
					<svg
						class="pagination-btn btn--prev"
						height="96"
						viewBox="0 0 24 24"
						width="96"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
						/>
						<path d="M0-.5h24v24H0z" fill="none" />
					</svg>
				</router-link>
				<svg
					v-else
					class="pagination-btn btn--prev btn--disabled"
					height="96"
					viewBox="0 0 24 24"
					width="96"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"
					/>
					<path d="M0-.5h24v24H0z" fill="none" />
				</svg>

				<div class="pagination-container">
					<div class="little-dot little-dot--first"></div>
					<div class="little-dot">
						<div class="big-dot-container">
							<div class="big-dot"></div>
						</div>
					</div>
					<div class="little-dot little-dot--last"></div>
				</div>

				<router-link
					v-if="$pagination.hasNext"
					:to="$pagination.nextLink"
				>
					<svg
						class="pagination-btn btn--next"
						height="96"
						viewBox="0 0 24 24"
						width="96"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
						/>
						<path d="M0-.25h24v24H0z" fill="none" />
					</svg>
				</router-link>
				<svg
					v-else
					class="pagination-btn btn--next btn--disabled"
					height="96"
					viewBox="0 0 24 24"
					width="96"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"
					/>
					<path d="M0-.25h24v24H0z" fill="none" />
				</svg>
			</div>
		</div>
	</div>
</template>

<script>
import dayjs from "dayjs";

export default {
	name: "List",
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
	mounted() {
		var btns = document.querySelectorAll(".pagination-btn");
		var paginationWrapper = document.querySelector(".pagination-wrapper");
		var bigDotContainer = document.querySelector(".big-dot-container");
		var littleDot = document.querySelector(".little-dot");

		for (var i = 0; i < btns.length; i++) {
			btns[i].addEventListener("click", btnClick);
		}

		function btnClick() {
			if (this.classList.contains("btn--prev")) {
				paginationWrapper.classList.add("transition-prev");
			} else {
				paginationWrapper.classList.add("transition-next");
			}

			var timeout = setTimeout(cleanClasses, 500);
		}

		function cleanClasses() {
			if (paginationWrapper.classList.contains("transition-next")) {
				paginationWrapper.classList.remove("transition-next");
			} else if (
				paginationWrapper.classList.contains("transition-prev")
			) {
				paginationWrapper.classList.remove("transition-prev");
			}
		}
	},
};
</script>

<style lang="stylus" scoped>
.page-wrapper {
	max-width: 50rem;
	margin: 0 auto;
}

.post-block {
	margin-bottom: 2rem;

	&:last-child {
		margin-bottom: 4rem;
	}
}

.post-title {
	a {
		font-family: $fonts-serif;
		font-size: $title-font-size;
		font-weight: 600;
		cursor: pointer;
        background-color: $accent-color
        padding: 0 1rem 0 0.5rem;
        display: inline-block;
		color: white;
		transition: all 0.2s;
		text-decoration: none;

		&:hover {
			color: $bg-color;
		}
	}
}

.post-summary {
	font-family: $fonts-sans-serif;
	font-size: 1rem;
	font-weight: 400;
    // border-top: 0.2rem dashed red;
    // padding: 0.5rem;
    // background: rgba(0, 0, 0, 0.2);
}

.post-meta {
	display: inline-flex;
	align-items: center;
	font-family: $fonts-serif;
	font-size: 0.8rem;
	line-height: 0.8rem;

	&:not(:last-child) {
		margin-right: 1rem;
	}

	@media (max-width: $mobile-width) {
		&:not(:last-child) {
			margin-bottom: 0.8rem;
		}
	}
}

.post-author {
	color: $gray-text-color;
	font-weight: 600;
}

.post-date {
	color: $gray-text-color;
	font-weight: 400;
}

.post-tag {
	a {
		color: $gray-text-color;
		font-weight: 400;
		font-family: $fonts-serif;
		text-decoration: none;
		margin-right: 0.4rem;

		&:hover {
			color: $link-color;
		}
	}

	span {
		color: $link-color;
		font-weight: 600;
	}
}

.button {
	pointer-events: auto;
	cursor: pointer;
	background: #e7e7e7;
	border: none;
	padding: 0.5rem 1rem;
	margin: 0;
	font-family: inherit;
	font-size: inherit;
	position: relative;
	display: inline-block;
}

.button::before,
.button::after {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}

.button--atlas {
	font-family: signo, sans-serif;
	font-weight: 500;
}

.button--atlas > span {
	display: inline-block;
}

.button--atlas:hover > span {
	opacity: 0;
}

.marquee {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	overflow: hidden;
	pointer-events: none;
}

.marquee__inner {
	width: fit-content;
	display: flex;
	position: relative;
	--offset: 1rem;
	--move-initial: calc(-25% + var(--offset));
	--move-final: calc(-50% + var(--offset));
	transform: translate3d(var(--move-initial), 0, 0);
	animation: marquee 1s linear infinite;
	animation-play-state: paused;
	opacity: 0;
}

.button--atlas:hover .marquee__inner {
	animation-play-state: running;
	opacity: 1;
	transition-duration: 0.4s;
}

.marquee span {
	text-align: center;
	white-space: nowrap;
	font-style: italic;
	padding: 0.5rem 0.3rem;
}

@keyframes marquee {
	0% {
		transform: translate3d(var(--move-initial), 0, 0);
	}

	100% {
		transform: translate3d(var(--move-final), 0, 0);
	}
}

.pagination-wrapper {
	font-size: 0;
	position: absolute;
	text-align: center;
	margin-left: 5.2rem;
}

@keyframes pagination-container--animation-prev {
	0% {
		transform: translateX(0);
	}

	100% {
		transform: translateX(18px);
	}
}

@keyframes pagination-container--animation-next {
	0% {
		transform: translateX(0);
	}

	100% {
		transform: translateX(-18px);
	}
}

.transition-prev .pagination-container {
	animation: pagination-container--animation-prev 0.3s forwards;
}

.transition-next .pagination-container {
	animation: pagination-container--animation-next 0.3s forwards;
}

.little-dot {
	width: 6px;
	height: 6px;
	background: #FEB2B2;
	border-radius: 100%;
	display: inline-block;
	vertical-align: middle;
	margin: 0 6px;
	position: relative;
	z-index: 10;
}

.little-dot--first, .little-dot--last {
	z-index: 5;
}

@keyframes slideLeft {
	0% {
		transform: translateX(0px);
	}

	100% {
		transform: translateX(-18px);
	}
}

.transition-prev .little-dot--first {
	animation: slideLeft 0.4s 0.3s forwards cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes little-dot--first--animation {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}

.transition-next .little-dot--first {
	animation: little-dot--last--animation 0.3s forwards;
}

@keyframes little-dot--last--animation {
	0% {
		opacity: 1;
	}

	100% {
		opacity: 0;
	}
}

.transition-prev .little-dot--last {
	animation: little-dot--last--animation 0.3s forwards;
}

@keyframes slideRight {
	0% {
		transform: translateX(0px);
		opacity: 1;
	}

	100% {
		transform: translateX(18px);
		opacity: 1;
	}
}

.transition-next .little-dot--last {
	animation: slideRight 0.4s 0.3s forwards cubic-bezier(0.165, 0.84, 0.44, 1);
}

.big-dot {
	width: 12px;
	height: 12px;
	border-radius: 100%;
	background: $link-color;
	position: absolute;
	top: 50%;
	right: -6px;
	transform: translateY(-50%);
}

.transition-next .big-dot {
	right: auto;
	left: -6px;
}

.big-dot-container {
	width: 18px;
	height: 18px;
	border-radius: 100%;
	position: absolute;
	top: 50%;
	right: 3px;
	transform: translateY(-50%);
	z-index: 10;
}

.transition-next .big-dot-container {
	right: auto;
	left: 3px;
}

@keyframes big-dot-container--animation-prev {
	0% {
		transform: translateY(-50%);
	}

	100% {
		transform: translateY(-50%) rotate(-179deg);
	}
}

@keyframes big-dot-container--animation-next {
	0% {
		transform: translateY(-50%);
	}

	100% {
		transform: translateY(-50%) rotate(-181deg);
	}
}

.transition-prev .big-dot-container {
	animation: big-dot-container--animation-prev 0.3s forwards;
}

.transition-next .big-dot-container {
	animation: big-dot-container--animation-next 0.3s forwards;
}

.pagination-btn {
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	fill: $link-color;
	cursor: pointer;
	transition: opacity 0.2s;
}

.pagination-btn:hover {
	opacity: 0.6;
}

.btn--next {
	left: calc(100% + 20px);
}

.btn--prev {
	right: calc(100% + 20px);
}

.btn--disabled {
	fill: $arrow-bg-color;
	cursor: not-allowed;
}
</style>