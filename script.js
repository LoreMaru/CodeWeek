function ageGenerator(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const mainContent = document.querySelector(".mainContent");
const fasceBonus = document.querySelector(".fasceBonus");
const modalWindow = document.querySelector(".modalWindow");

const currentYear = new Date().getFullYear();

fetch("https://jsonplaceholder.typicode.com/users")
  .then((res) => res.json())
  .then((data) =>
    data.map((item) => ({
      ...item,
      birthDate: `${ageGenerator(1, 28)}/${ageGenerator(1, 12)}/${ageGenerator(
        1940,
        2004
      )}`,
    }))
  )
  .then((data) =>
    data.map((item) => ({
      ...item,
      age: currentYear - parseInt(item.birthDate.slice(-4)),
    }))
  )
  .then((data) => {
    fasceBonus.addEventListener("click", function (event) {
      const primaFascia = data.filter(
        (item) => item.age >= 18 && item.age <= 35
      );
      const secondaFascia = data.filter(
        (item) => item.age >= 36 && item.age <= 64
      );
      const terzaFascia = data.filter((item) => item.age > 64);

      const modalCloser = `<span class="closeModal">X</span>`;
      const modalOpener = (modalWindow.style.display = "block");

      const noUserFindMSG = `${modalCloser}
      <h3>Nessun utente rientra in questi requisiti
      di età</h3>`;

      if (event.target.closest(".primaFascia")) {
        modalOpener;
        modalWindow.innerHTML = `${modalCloser}<h3>Utenti con età compresa tra i 18 e i 35 anni</h3>`;

        if (primaFascia.length > 0) {
          primaFascia.map((item) => {
            modalWindow.innerHTML += `
        <div>
        Nome: ${item.name}<br>Data di nascita: ${item.birthDate} <br>Età: ${item.age},<br> Numero di telefono: ${item.phone} <br><br></div>
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
          secondaFascia.map((item) => {
            modalWindow.innerHTML += `
            <div>
            Nome: ${item.name}<br>Data di nascita: ${item.birthDate} <br>Età: ${item.age},<br> Numero di telefono: ${item.phone} <br><br></div>
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
          terzaFascia.map((item) => {
            modalWindow.innerHTML += `
            <div>
            Nome: ${item.name}<br>Data di nascita: ${item.birthDate} <br>Età: ${item.age},<br> Numero di telefono: ${item.phone} <br><br></div>
            `;
          });
        } else {
          modalWindow.innerHTML = noUserFindMSG;
        }
      }

      if (event.target.closest(".closeModal")) {
        modalWindow.style.display = "none";
      }
    });
  })
  .catch((error) => {
    mainContent.innerHTML = `<div class="error404">
    <h1>404</h1><br><h2>Pagina non trovata</h2>
    <img src="./img/404error.png" class="errorIMG"> </div>`;
  });
