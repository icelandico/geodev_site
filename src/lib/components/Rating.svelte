<script lang="ts">
	export let rating: string;
	export let style: string = '';
	export let isHovered: boolean = false;

	enum RatingValue {
		FULL = 'FULL',
		HALF = 'HALF'
	}

	const ratingArray = [...new Array(5)].map((value, index) => {
		const rateParsed = parseFloat(rating);
		if (index + 1 <= rateParsed) return RatingValue.FULL;
		if ((index + 1) % rateParsed === 0.5) return RatingValue.HALF;
	});
</script>

<div class={`flex gap-3  items-center ${style}`}>
	{#each ratingArray as rate}
		{#if rate === RatingValue.FULL}
			<span class={`w-6 h-6 rounded-full bg-primaryBlack ${isHovered ? 'bg-primaryBlue' : ''}`} />
		{/if}
		{#if rate === RatingValue.HALF}
			<div
				class={`w-6 h-6 overflow-hidden relative inset-0 rounded-full bg-secondaryBlack ${
					isHovered ? 'bg-tertiaryBlue' : ''
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
				class={`w-6 h-6 rounded-full bg-secondaryBlack ${isHovered ? 'bg-tertiaryBlue' : ''}`}
			/>
		{/if}
	{/each}
</div>
