const lanchesContainer = document.getElementById("lanches");
const lanchesCardsWrapper = document.querySelector(".lanches-cards-wrapper");

const carregarLanches = async function () {
  try {
    const response = await fetch("/api/lanches");
    if (!response.ok) {
      throw new Error(`Erro ao carregar lanches. Status ${response.satatus}`);
    }

    const lanches = await response.json();
    console.log(lanches);

    if (lanches.length >= 1) {
      lanches.forEach((el) => {
        const lancheCard = document.createElement("div");
        lancheCard.classList.add("lanche-card");

        const lancheNome = document.createElement("h3");
        lancheNome.textContent = el.nome;

        const lancheIngredientes = document.createElement("p");
        lancheIngredientes.textContent = el.ingredientes;

        lancheCard.appendChild(lancheNome);
        lancheCard.appendChild(lancheIngredientes);
        lanchesCardsWrapper.appendChild(lancheCard);
      });
    }
  } catch (err) {
    console.error("ERRO:", err);
    if (lanchesContainer) {
      lanchesContainer.innerHTML =
        "<h2>Erro ao carregar os lanches. Tente novamente mais tarde.</h2>";
    }
  }
};

carregarLanches();
