<template>
	<div>
		<div class="loading" ref="loading">
			<div class="la-pacman la-2x">
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>

		<div class="quotation-wrapper" ref="quotation">
			<div class="row-quotation">
				<div class="quotation">“</div>
				<div class="hitokoto">
					{{ insertSpacing(sentence.hitokoto) }}
				</div>
				<div class="quotation quotation-right">”</div>
			</div>

			<div class="row-from">
				<div class="from-holder"></div>
				<div class="quotation-from">
					「{{ sentence.from }}」from hitokoto
				</div>
			</div>
		</div>

		<div class="nyaa-wrapper" v-on:click="getSentence">
			<span class="nyaa"></span><span class="nyaa nyaa-right"></span>
		</div>
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

					<router-link
						:to="page.path"
						class="read-button button--atlas"
					>
						<span>Read more</span>
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
import axios from "axios";
import dotGothic16Font from "../fonts/DotGothic16.woff2";

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
		getSentence() {
			axios
				.get("https://v1.hitokoto.cn/?c=a&c=i&min_length=6")
				.then((resp) => {
					// Success 🎉
					if (resp.status == 200) {
						this.sentence = resp.data;
					} else {
						this.sentence = {
							hitokoto: "404040404040404040404",
							from: "404",
						};
					}
				})
				.catch((e) => {
					// Error 😨
					this.sentence = {
						hitokoto: "404040404040404040404",
						from: "404",
					};
				});
		},
		insertSpacing(str) {
			var p1 = /([A-Za-z_])([\u4e00-\u9fa5]+)/gi;
			var p2 = /([\u4e00-\u9fa5]+)([A-Za-z_])/gi;
			return str
				.replace(p1, "$1 $2")
				.replace(p2, "$1 $2")
				.replace(",", "，");
		},
	},
	data() {
		return {
			sentence: {
				hitokoto: "404040404040404040404",
				from: "404",
			},
		};
	},
	mounted() {
		axios({
			url: dotGothic16Font,
			method: "GET",
			responseType: "text",
		}).then((response) => {
			var fontCode =
				"@font-face { font-family: 'DotGothic16'; src: url('" +
				response.config.url +
				"') format('woff2')}";
			var styleElement = document.createElement("style");
			if (styleElement.styleSheet) {
				styleElement.styleSheet.cssText = fontCode;
			} else {
				styleElement.innerHTML = fontCode;
			}
			document.head.appendChild(styleElement);
			this.$refs.loading.style.display = "none";
			this.$refs.quotation.style.fontFamily = "DotGothic16";
			this.$refs.quotation.style.display = "table";
		});
		this.getSentence();
	},
};
</script>

<style lang="stylus" scoped>
.loading {
	margin: auto;
	height: 5rem;
}

.quotation-wrapper {
	display: none;
	margin: auto;
	height: 5rem;

	.row-quotation {
		display: table-row;

		.quotation {
			display: table-cell;
			vertical-align: top;
			color: $border-color;
			font-size: 2rem;
			font-weight: bold;
			text-align: left;
			padding: 0.5rem 0;
			line-height: 100%;

			&.quotation-right {
				vertical-align: bottom;
				line-height: 0;
			}
		}

		.hitokoto {
			display: table-cell;
			text-align: left;
			font-size: 1.5rem;
			color: $border-color;
			padding: 0 1rem;
			vertical-align: middle;
		}
	}

	.row-from {
		display: table-row;

		.quotation-from {
			display: table-cell;
			font-size: smaller;
			padding-left: 1.25rem;

			&::before {
				content: '― ';
			}
		}
	}
}

.nyaa-wrapper {
	text-align: center;
	padding: 2rem 0;

	.nyaa {
		position: relative;
		left: 0.4rem;
		display: inline-block;
		width: 3rem;
		height: 1.5rem;
		border: 0.4rem solid $border-color;
		border-top: none;
		cursor: pointer;
		border-radius: 0 0 100% 100% / 0 0 180% 160%;

		&.nyaa-right {
			left: 0;
			right: 0.4rem;
			border-radius: 0 0 100% 100% / 0 0 160% 180%;
		}
	}
}

.page-wrapper {
	max-width: 50rem;
	margin: 0 auto;
}

.post-block {
	margin-bottom: 2rem;
}

.post-title {
	a {
		font-family: $fonts-serif;
		font-size: $title-font-size;
		font-weight: 600;
		cursor: pointer;
		background-color: $accent-color;
		padding: 0 1rem 0 0.5rem;
		display: inline-block;
		color: white;
		transition: all 0.2s;
		text-decoration: none;
	}
}

.post-summary {
	font-family: $fonts-sans-serif;
	font-size: 1rem;
	font-weight: 400;
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

.read-button {
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
	display: flex;
	justify-content: center;
}

.pagination-btn {
	fill: $link-color;
	cursor: pointer;
	transition: opacity 0.2s;
}

.pagination-btn:hover {
	opacity: 0.6;
}

.btn--next {
	transform: rotate(90deg);
	left: calc(100% + 20px);
}

.btn--prev {
	transform: rotate(90deg);
	right: calc(100% + 20px);
}

.btn--disabled {
	fill: $arrow-bg-color;
	cursor: not-allowed;
}

/*
 * Load Awesome v1.1.0 (http://github.danielcardoso.net/load-awesome/)
 * Copyright 2015 Daniel Cardoso <@DanielCardoso>
 * Licensed under MIT
 */
.la-pacman, .la-pacman > div {
	position: relative;
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.la-pacman {
	display: block;
	font-size: 0;
	color: #fff;
}

.la-pacman.la-dark {
	color: #333;
}

.la-pacman > div {
	display: inline-block;
	float: none;
	background-color: currentColor;
	border: 0 solid currentColor;
}

.la-pacman {
	width: 32px;
	height: 32px;
}

.la-pacman > div:nth-child(1), .la-pacman > div:nth-child(2) {
	width: 0;
	height: 0;
	background: transparent;
	border-style: solid;
	border-width: 16px;
	border-right-color: transparent;
	border-radius: 100%;
	-webkit-animation: pacman-rotate-half-up 0.5s 0s infinite;
	-moz-animation: pacman-rotate-half-up 0.5s 0s infinite;
	-o-animation: pacman-rotate-half-up 0.5s 0s infinite;
	animation: pacman-rotate-half-up 0.5s 0s infinite;
}

.la-pacman > div:nth-child(2) {
	margin-top: -32px;
	-webkit-animation-name: pacman-rotate-half-down;
	-moz-animation-name: pacman-rotate-half-down;
	-o-animation-name: pacman-rotate-half-down;
	animation-name: pacman-rotate-half-down;
}

.la-pacman > div:nth-child(3), .la-pacman > div:nth-child(4), .la-pacman > div:nth-child(5), .la-pacman > div:nth-child(6) {
	position: absolute;
	top: 50%;
	left: 200%;
	width: 8px;
	height: 8px;
	border-radius: 100%;
	opacity: 0;
	-webkit-animation: pacman-balls 2s 0s infinite linear;
	-moz-animation: pacman-balls 2s 0s infinite linear;
	-o-animation: pacman-balls 2s 0s infinite linear;
	animation: pacman-balls 2s 0s infinite linear;
}

.la-pacman > div:nth-child(3) {
	-webkit-animation-delay: -1.44s;
	-moz-animation-delay: -1.44s;
	-o-animation-delay: -1.44s;
	animation-delay: -1.44s;
}

.la-pacman > div:nth-child(4) {
	-webkit-animation-delay: -1.94s;
	-moz-animation-delay: -1.94s;
	-o-animation-delay: -1.94s;
	animation-delay: -1.94s;
}

.la-pacman > div:nth-child(5) {
	-webkit-animation-delay: -2.44s;
	-moz-animation-delay: -2.44s;
	-o-animation-delay: -2.44s;
	animation-delay: -2.44s;
}

.la-pacman > div:nth-child(6) {
	-webkit-animation-delay: -2.94s;
	-moz-animation-delay: -2.94s;
	-o-animation-delay: -2.94s;
	animation-delay: -2.94s;
}

.la-pacman.la-2x {
	width: 4rem;
	height: 4rem;
}

.la-pacman.la-2x > div:nth-child(1), .la-pacman.la-2x > div:nth-child(2) {
	border-width: 2rem;
}

.la-pacman.la-2x > div:nth-child(2) {
	margin-top: -4rem;
}

.la-pacman.la-2x > div:nth-child(3), .la-pacman.la-2x > div:nth-child(4), .la-pacman.la-2x > div:nth-child(5), .la-pacman.la-2x > div:nth-child(6) {
	width: 1rem;
	height: 1rem;
}

/*
 * Animations
 */
@keyframes pacman-rotate-half-up {
	0%, 100% {
		-webkit-transform: rotate(270deg);
		transform: rotate(270deg);
	}

	50% {
		-webkit-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@keyframes pacman-rotate-half-up {
	0%, 100% {
		-moz-transform: rotate(270deg);
		transform: rotate(270deg);
	}

	50% {
		-moz-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@keyframes pacman-rotate-half-up {
	0%, 100% {
		-o-transform: rotate(270deg);
		transform: rotate(270deg);
	}

	50% {
		-o-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@keyframes pacman-rotate-half-up {
	0%, 100% {
		-webkit-transform: rotate(270deg);
		-moz-transform: rotate(270deg);
		-o-transform: rotate(270deg);
		transform: rotate(270deg);
	}

	50% {
		-webkit-transform: rotate(360deg);
		-moz-transform: rotate(360deg);
		-o-transform: rotate(360deg);
		transform: rotate(360deg);
	}
}

@keyframes pacman-rotate-half-down {
	0%, 100% {
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	50% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
}

@keyframes pacman-rotate-half-down {
	0%, 100% {
		-moz-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	50% {
		-moz-transform: rotate(0deg);
		transform: rotate(0deg);
	}
}

@keyframes pacman-rotate-half-down {
	0%, 100% {
		-o-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	50% {
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
	}
}

@keyframes pacman-rotate-half-down {
	0%, 100% {
		-webkit-transform: rotate(90deg);
		-moz-transform: rotate(90deg);
		-o-transform: rotate(90deg);
		transform: rotate(90deg);
	}

	50% {
		-webkit-transform: rotate(0deg);
		-moz-transform: rotate(0deg);
		-o-transform: rotate(0deg);
		transform: rotate(0deg);
	}
}

@keyframes pacman-balls {
	0% {
		left: 200%;
		opacity: 0;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	5% {
		opacity: 0.5;
	}

	66% {
		opacity: 1;
	}

	67% {
		opacity: 0;
	}

	100% {
		left: 0;
		-webkit-transform: translateY(-50%);
		transform: translateY(-50%);
	}
}

@keyframes pacman-balls {
	0% {
		left: 200%;
		opacity: 0;
		-moz-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	5% {
		opacity: 0.5;
	}

	66% {
		opacity: 1;
	}

	67% {
		opacity: 0;
	}

	100% {
		left: 0;
		-moz-transform: translateY(-50%);
		transform: translateY(-50%);
	}
}

@keyframes pacman-balls {
	0% {
		left: 200%;
		opacity: 0;
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	5% {
		opacity: 0.5;
	}

	66% {
		opacity: 1;
	}

	67% {
		opacity: 0;
	}

	100% {
		left: 0;
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}
}

@keyframes pacman-balls {
	0% {
		left: 200%;
		opacity: 0;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}

	5% {
		opacity: 0.5;
	}

	66% {
		opacity: 1;
	}

	67% {
		opacity: 0;
	}

	100% {
		left: 0;
		-webkit-transform: translateY(-50%);
		-moz-transform: translateY(-50%);
		-o-transform: translateY(-50%);
		transform: translateY(-50%);
	}
}
</style>