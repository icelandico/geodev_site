<script lang="ts">
	import type { Post } from '$lib/server/blogPosts';
	import { formatDate } from '$utils/formatDate';
	export let post: Post;
	export let withYear = false;
</script>

<a
	class="flex justify-between items-center group gap-4 dark:text-white hover:outline-1 hover:outline-primaryBlue hover:dark:outline-primaryOrange hover:outline-dashed py-3 cursor-pointer
  gap-4 text-xl font-semibold hover:dark:text-primaryOrange hover:text-primaryBlue"
	href={`blog/${post.slug}`}
>
	{post.title}
	<time class="text-sm text-right basis-3/12 ml-auto italic">{formatDate(post.date, withYear)}</time
	>
</a>
