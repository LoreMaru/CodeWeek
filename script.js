function ageGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mainContent = document.querySelector(".mainContent");
const fasceBonus = document.querySelector(".fasceBonus");
const modalWindow = document.querySelector(".modalWindow");

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) => data.map((item) => ({ ...item, age: ageGenerator(18, 82) })))
  .then((data) => {
    fasceBonus.addEventListener("click", function (event) {
      const primaFascia = data.filter(
        (item) => item.age >= 18 && item.age <= 35
      );
      const secondaFascia = data.filter(
        (item) => item.age >= 36 && item.age <= 64
      );
      const terzaFascia = data.filter((item) => item.age > 64);

      const noUserFindMSG = `<span class="closeModal">X</span>
      <h3>Nessun utente rientra in questi requisiti
      di età</h3>`;

      const modalCloser = `<span class="closeModal">X</span>`;

      const modalOpener = (modalWindow.style.display = "block");

      if (event.target.closest(".primaFascia")) {
        modalOpener;
        modalWindow.innerHTML = `${modalCloser}<h3>Utenti con età compresa tra i 18 e i 35 anni</h3>`;

        if (primaFascia.length > 0) {
          primaFascia.map((_, index, array) => {
            modalWindow.innerHTML += `
        <div>
        Nome: ${array[index].name}<br> Età: ${array[index].age},<br> Numero di telefono: ${array[index].phone} <br><br></div>
        `;
          });
        } else {
          modalWindow.innerHTML = noUserFindMSG;
        }
      }
      if (event.target.closest(".secondaFascia")) {
        modalOpener;
        modalWindow.innerHTML = `${modalCloser}<h3>Utenti con età compresa tra i 36 e i 64 anni</h3>`;

        if (secondaFascia.length > 0) {
          secondaFascia.map((_, index, array) => {
            modalWindow.innerHTML += `
        <div>
        Nome: ${array[index].name}<br> Età: ${array[index].age},<br>Numero di telefono: ${array[index].phone} <br><br></div>
        `;
          });
        } else {
          modalWindow.innerHTML = noUserFindMSG;
        }
      }
      if (event.target.closest(".terzaFascia")) {
        modalOpener;
        modalWindow.innerHTML = `${modalCloser}<h3>Utenti con età oltre i 64 anni</h3>`;

        if (terzaFascia.length > 0) {
          terzaFascia.map((_, index, array) => {
            modalWindow.innerHTML += `
            <div>
            Nome: ${array[index].name}<br> Età: ${array[index].age},<br>Numero di telefono: ${array[index].phone} <br><br></div>
            `;
          });
        } else {
          modalWindow.innerHTML = noUserFindMSG;
        }
      }

      if (event.target.closest("span")) {
        modalWindow.style.display = "none";
      }
    });
  })
  .catch((error) => {
    mainContent.innerHTML = `<div class="error404">
    <h1>404</h1><br><h2>Pagina non trovata</h2>
    <img src="./img/404error.png" class="errorIMG"> </div>`;
  });
