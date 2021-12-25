export const getDate = () => {
  let today = new Date();
  return `${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()} ${today.getHours()}:${today.getMinutes()}`;
};

export const getCapitalized = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  