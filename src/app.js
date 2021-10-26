const fetchBbApi = (item) => {
  fetch(`https://www.breakingbadapi.com/api/${item}`)
  .then((response) => response.json())
  .then((arquivo) => arquivo)
  .catch((error) => error);
}