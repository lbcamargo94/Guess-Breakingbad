const button = document.querySelector('#obj-generator');
let randomNamgesArr = [];
let nameImage = '';

const fetchBbApi = async (item) => {
  return fetch(`https://breakingbadapi.com/api/${item}`)
  .then((response) => response.json())
  .then((arquivo) => arquivo)
  .catch((error) => error);
}

// Seleciona um dos nomes gerados aleatóriamente(array) e faz uma nova requisição trazendo a imagem e inserindo dentro da section.
const imgRandom = async() => {
  nameImage = '';
  await randomNames();
  const sortNumber = Math.trunc(Math.random() * randomNamgesArr.length);
  fetchBbApi(`characters?name=${randomNamgesArr[sortNumber]}`)
  .then((data) => {
    const [ primeiro ] = data;
    const img = document.querySelector('.img_question');
    img.src = primeiro.img;
    nameImage = primeiro.name;
    randomNamgesArr = [];
    section.style.display = 'inline';
  })
}

// Gera o nome de 4 personagens aleatórios.
const randomNames = async () => {
  for(let index = 1; index <= 4; index += 1) {
    await fetchBbApi(`character/random`)
    .then((data) => {
      const [ primeiro ] = data
      const texto = document.querySelector(`#answers${index}`)
      texto.addEventListener('click', verificaSeGanhou)
      texto.innerText = '';
      texto.innerText = primeiro.name;
      randomNamgesArr.push(primeiro.name)
    })
  }
  return randomNamgesArr;
}

// Verifica se você clicou no nome certo.
const verificaSeGanhou = (event) => {
  console.log(event.target.innerText);
  if (event.target.innerText === nameImage) {
    alert('Parabéns você acertou!');
    imgRandom();
  } else {
    alert('ERROOOU!!');
    imgRandom();
  }
}

window.onload = () => { 
  imgRandom()
}