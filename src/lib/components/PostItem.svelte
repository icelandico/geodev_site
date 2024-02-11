<script lang="ts">
	import type { Post } from '$lib/server/blogPosts';
	import { formatDate } from '$utils/formatDate';
	export let post: Post;
  export let withYear = false;
</script>

<div
	class="flex gap-4 dark:text-white justify-between items-center hover:outline-1 hover:outline-secondaryBlue hover:outline-dashed py-3"
>
	<a
		class="text-xl font-semibold hover:dark:text-secondaryBlue hover:text-primaryBlue"
		href={`blog/${post.slug}`}
	>
		{post.title}
	</a>
	<time class="text-sm text-right basis-3/12 ml-auto italic">{formatDate(post.date, withYear)}</time>
</div>
