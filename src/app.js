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
    const section = document.querySelector('#container-quotes');
    const img = document.createElement('img');
    img.src = primeiro.img;
    nameImage = primeiro.name;
    section.appendChild(img);
    randomNamgesArr = [];
    section.style.display = 'inline';
  })
}

// Gera 4 nomes aleatórios e da appendChild na section
const randomNames = async () => {
  const container = document.querySelector('#container-quotes');
  container.innerHTML = '';
  container.style.display = 'none'

  for(let index = 0; index < 4; index += 1) {
    await fetchBbApi(`character/random`)
    .then((data) => {
      const [ primeiro ] = data
      const container = document.querySelector('#container-quotes');
      const texto = document.createElement('p')
      texto.classList.add('resposta')
      texto.addEventListener('click', verificaSeGanhou)
      texto.innerText = '';
      texto.innerText = primeiro.name;
      randomNamgesArr.push(primeiro.name)
      container.appendChild(texto);
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