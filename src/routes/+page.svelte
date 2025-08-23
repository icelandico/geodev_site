<script>
	import PostItem from '$components/PostItem.svelte';
	import Globe from '$components/icons/globe.svelte';
	import BookItem from '$components/BookItem.svelte';
	import { formatDate } from '$utils/formatDate';
	import Wrapper from '$components/Wrapper.svelte';
	export let data;
</script>

<div class="flex flex-col items-center w-100 md:mt-8">
	<div class="flex items-center justify-between">
		<h1
			class="text-primaryBlue dark:text-white text-5xl flex items-center gap-4"
			aria-label="GEODEV"
		>
			<span aria-hidden="true">
				<Globe width={75} style="stroke-primaryBlue dark:stroke-white" />
			</span>
			geodev
		</h1>
	</div>
	<div class="mt-4">
		<p class="text-primaryBlue dark:text-white">programming & cartography</p>
	</div>
	<Wrapper contentStyle="flex-col mt-12">
		<a href="/blog/">
			<h2
				class="text-primaryBlack dark:text-white text-4xl text-primaryBlack dark:text-white text-4xl hover:dark:text-primaryOrange hover:text-primaryBlue"
			>
				Recent posts
			</h2></a
		>
		<div class="mt-8 mb-8 border-b">
			{#each data.posts as post}
				<PostItem {post} withYear />
			{/each}
		</div>

		<a href="/books/"
			><h2
				class="text-primaryBlack dark:text-white text-4xl hover:dark:text-primaryOrange hover:text-primaryBlue"
			>
				Reading
			</h2></a
		>
		<div class="mt-8 mb-8 border-b">
			{#each data.books as book}
				<a href={`books/${book.slug}`} role="button" title="book review">
					<BookItem
						title={book.title}
						author={book.author}
						date={formatDate(book.date)}
						rating={book.rating}
					/>
				</a>
			{/each}
		</div>

		<a href="/projects/"
			><h2
				class="text-primaryBlack dark:text-white text-4xl text-primaryBlack dark:text-white text-4xl hover:dark:text-primaryOrange hover:text-primaryBlue"
			>
				Projects
			</h2></a
		>
		<div class="mt-8 mb-8">
			{#each data.projects as project}
				<a
					class="flex justify-between items-center group gap-4 dark:text-white hover:outline-1 hover:outline-primaryBlue hover:dark:outline-primaryOrange hover:outline-dashed py-3 cursor-pointer
  gap-4 text-xl font-semibold hover:dark:text-primaryOrange hover:text-primaryBlue"
					href={`projects/${project.slug}`}
				>
					{project.title} &#8226; {project.type}
					<time class="text-sm text-right basis-3/12 ml-auto italic"
						>{formatDate(project?.date, true)}</time
					>
				</a>
			{/each}
		</div>
	</Wrapper>
</div>
