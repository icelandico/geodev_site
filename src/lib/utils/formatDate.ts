export const formatDate = (date: string, withYear = true) => {
	const dateObject = new Date(date);
	const month = dateObject.toLocaleString('default', { month: 'short' });
	const year = dateObject.getFullYear();

	if (withYear) {
		return `${month} ${getDay(date)}, ${year}`;
	}

	return `${month} ${getDay(date)}`;
};

const getDay = (date: string) => {
	const dateObject = new Date(date);
	const day = dateObject.getDate();
	return day <= 9 ? `0${day}` : day;
};
