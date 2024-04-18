const timeFormat = (time) => {
  const options1 = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const dateTimeFormat = new Intl.DateTimeFormat('en-US', options1);
  const date1 = new Date(time);

  return dateTimeFormat.format(date1);
};

const timeSinceFormat = (diff) => {
  const mm = Math.floor(diff / 1000 / 60) % 60;
  const hh = Math.floor(diff / 1000 / 60 / 60) % 24;
  const dd = Math.floor(diff / 1000 / 60 / 60 / 24);
  const formatted = `${dd}dy ${hh}hr ${mm}min`;
  const today = dd > 0 ? `Watered ${dd}d ${hh}h ago` : `Watered Today`;

  return {
    dd,
    hh,
    formatted,
    today,
  };
};

export default timeFormat;

export { timeFormat, timeSinceFormat };
