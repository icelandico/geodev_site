export const formatDate = (date: string) => {
	const dateObject = new Date(date);
	const month = dateObject.toLocaleString('default', { month: 'short' });
	const day = dateObject.getDate();
	const year = dateObject.getFullYear();

	return `${month} ${day}, ${year}`;
};
