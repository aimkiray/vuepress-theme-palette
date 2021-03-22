<template>
	<div>
        <div class="quotation-loading" ref="quotationLoading"></div>
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

		<div class="nyaa-wrapper">
			<span class="nyaa" v-on:click="getSentence"></span><span class="nyaa nyaa-right" v-on:click="getSentence"></span>
		</div>
		<div class="page-wrapper">
			<div class="post-list">
				<div
					class="post-block"
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
					// 🎉
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
					// 😨
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
        this.$nextTick(function () {
			this.$emit('dom-updated')
		});
		axios
			.get(dotGothic16Font, { responseType: "arraybuffer" })
			.then((response) => {
				var base64String = btoa(
					new Uint8Array(response.data).reduce(
						(data, byte) => data + String.fromCharCode(byte),
						""
					)
                );
				var fontCode =
					"@font-face { font-family: 'DotGothic16'; src: url('data:application/font-woff2;charset=utf-8;base64," +
					base64String +
					"') format('woff2')}";
				var styleElement = document.createElement("style");
				if (styleElement.styleSheet) {
					styleElement.styleSheet.cssText = fontCode;
				} else {
					styleElement.innerHTML = fontCode;
				}
				document.head.appendChild(styleElement);
                this.$refs.quotationLoading.style.display = "none";
				this.$refs.quotation.style.fontFamily = "DotGothic16";
				this.$refs.quotation.style.display = "table";
			});
		this.getSentence();
	},
};
</script>

<style lang="stylus" scoped>
.quotation-loading {
    height: 5rem;
}

.quotation-wrapper {
	margin: auto;
    display: none;
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

.page-wrapper {
	max-width: 50rem;
	margin: 0 auto;
	padding-left: 2.5rem;
	padding-right: 2.5rem;

	@media (min-width: 768px) {
		padding-left: 5rem;
		padding-right: 5rem;
	}
}

.post-block {
	margin-bottom: 2rem;
	padding-left: 1.25rem;
	padding-right: 1.25rem;

	@media (min-width: 768px) {
		padding-left: 2.5rem;
		padding-right: 2.5rem;
	}
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
</style>