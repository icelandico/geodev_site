<script lang="ts">
	export let rating: number = 0;
	export let style: string = '';
	export let isHovered: boolean;

	enum RatingValue {
		FULL = 'FULL',
		HALF = 'HALF'
	}

	const hasHalf = rating % 1 !== 0;
	const fullRating = Math.floor(rating);
	const ratingArray = [...new Array(5)].map((value, index) => {
		if (index + 1 <= rating) return RatingValue.FULL;
		if ((index + 1) % rating === 0.5) return RatingValue.HALF;
	});
</script>

<div class={`flex gap-3 ${style} items-center justify-end`}>
	{#each ratingArray as rate}
		{#if rate === RatingValue.FULL}
			<span class={`w-6 h-6 rounded-full bg-primaryBlack ${isHovered ? 'bg-primaryBlue' : ''}`} />
		{/if}
		{#if rate === RatingValue.HALF}
			<div
				class={`w-6 h-6 overflow-hidden relative inset-0 rounded-full bg-secondaryBlack ${
					isHovered ? 'bg-secondaryBlue' : ''
				}`}
			>
				<div class="absolute top-0 left-0 h-full w-1/2"></div>
				<div
					class={`absolute top-0 left-0 h-full bg-primaryBlack w-1/2 ${
						isHovered ? 'bg-primaryBlue' : ''
					}`}
				></div>
			</div>
		{/if}
		{#if !rate}
			<span
				class={`w-6 h-6 rounded-full bg-secondaryBlack ${isHovered ? 'bg-secondaryBlue' : ''}`}
			/>
		{/if}
	{/each}
</div>
