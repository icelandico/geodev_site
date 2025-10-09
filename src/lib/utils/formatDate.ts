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

export const getMonthWithYear = (date: string) => {
	const dateObject = new Date(date);
	const monthName = dateObject.toLocaleString('default', { month: 'long' });
	const year = dateObject.getFullYear();
	return `${monthName} ${year}`;
};
