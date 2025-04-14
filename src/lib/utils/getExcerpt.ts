export function getExcerpt(markdown: string, maxLength = 150): string {
	const plainText = markdown
		.replace(/[#>*_\-\[\]()]/g, '')
		.replace(/\!\[.*?\]\(.*?\)/g, '')
		.replace(/\[(.*?)\]\(.*?\)/g, '$1')
		.replace(/\s+/g, ' ')
		.trim();

	return plainText.length > maxLength
		? plainText.slice(0, maxLength).trimEnd() + '…'
		: plainText;
}