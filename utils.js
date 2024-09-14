const isValidEgyptianNumber = (number) => {
  const validList = ["010", "011", "012", "015"];
  let num = number.toString().slice(0, 3);
  let isValid = validList.find((n) => n === num);

  if (isValid) {
    return true;
  }
  return false;
};
