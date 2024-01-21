<script lang="ts">
	export let rating: string;
	export let style: string = '';
	export let isHovered: boolean = false;
	const RATING_ARRAY = getRating();

	enum RatingValue {
		FULL = 'FULL',
		HALF = 'HALF'
	}

	function getRating() {
		const rateParsed = parseFloat(rating);
		const fullCount = Math.floor(rateParsed);
		const halfCount = rateParsed % 1 === 0.5 ? 1 : 0;
		const undefinedCount = Math.max(0, 5 - fullCount - halfCount);

		const resultArray = Array(fullCount)
			.fill(RatingValue.FULL)
			.concat(Array(halfCount).fill(RatingValue.HALF))
			.concat(Array(undefinedCount).fill(undefined));

		return resultArray;
	}
</script>

<div class={`flex gap-3  items-center ${style}`}>
	{#each RATING_ARRAY as rate}
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
