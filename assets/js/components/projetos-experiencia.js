/* ==========================================================================
   Seção "Projetos e Experiência": roadmap de anos + carrossel do ano ativo.

   Dados (por currículo): [{ ano, imagem?, itens: [...] }, …] em ordem crescente —
   veja assets/data/projetos.js (catálogo central e criarAnos).
   - O ano inicial é SEMPRE o último da lista (ou o do item citado no #hash).
   - 2+ itens → carrossel infinito; 1 → card único; 0 → estado vazio.
   - Links internos #projeto-{id} (ex.: botão "Ver projeto" das competências)
     trocam de ano, centralizam o item e rolam até ele.
   ========================================================================== */
import { h, nextId } from "../core.js";
import { icon } from "../icons.js";
import { createRoadmap } from "./roadmap.js";
import { createCarrossel } from "./carrossel.js";
import { createProjeto } from "./projeto.js";

const plural = (n, um, varios) => `${n} ${n === 1 ? um : varios}`;

function resumo(ano) {
  const projetos = ano.itens.filter((i) => i.tipo !== "experiencia").length;
  const experiencias = ano.itens.length - projetos;
  const partes = [];
  if (projetos) partes.push(plural(projetos, "projeto", "projetos"));
  if (experiencias) partes.push(plural(experiencias, "experiência", "experiências"));
  return partes.join(" · ");
}

/** Procura um item por id: prefere o ano atual, depois o mais recente. */
function localizar(anos, id, anoAtual) {
  const ordem = [anoAtual, ...anos.map((_, i) => i).reverse()].filter((i) => i != null && i >= 0);
  for (const a of ordem) {
    const k = anos[a].itens.findIndex((item) => item.id === id);
    if (k >= 0) return { ano: a, item: k };
  }
  return null;
}

const idDoHash = (hash) => /^#projeto-(.+)$/.exec(decodeURIComponent(hash))?.[1] ?? null;

/** @param {{anos: {ano: number, itens: object[]}[]}} dados */
export function createProjetosExperiencia({ anos }) {
  if (!anos?.length) return h("div", { class: "container" });

  const painelId = nextId("projetos-painel");
  const painel = h("div", { class: "pe__painel", id: painelId, role: "tabpanel" });
  let conteudo = null; // { cardDe }
  let atual = -1;

  const alvoInicial = location.hash ? localizar(anos, idDoHash(location.hash), null) : null;
  const inicialAno = alvoInicial?.ano ?? anos.length - 1; // padrão: o último ano

  function desenhar(i, itemInicial = 0) {
    const ano = anos[i];
    atual = i;
    painel.setAttribute("aria-labelledby", roadmap.tabId(i));

    const rotulo = `Projetos e experiências de ${ano.ano}`;
    let corpo;
    if (!ano.itens.length) {
      conteudo = null;
      corpo = h(
        "div",
        { class: "container" },
        h(
          "div",
          { class: "pe__vazio" },
          icon("flag"),
          h("p", {}, `Ainda não há projetos ou experiências registrados em ${ano.ano}.`),
        ),
      );
    } else if (ano.itens.length === 1) {
      // Um item só: card único, sem carrossel
      const card = createProjeto(ano.itens[0]);
      conteudo = { cardDe: () => card };
      corpo = h("div", { class: "pe__largo" }, h("div", { class: "pe__unico" }, card));
    } else {
      // 2 ou mais: carrossel infinito (repete os itens quando há poucos)
      conteudo = createCarrossel(ano.itens, { rotulo, inicial: itemInicial });
      corpo = conteudo.el;
    }

    painel.replaceChildren(
      h("p", { class: "pe__resumo" }, h("strong", {}, String(ano.ano)), ano.itens.length ? ` · ${resumo(ano)}` : ""),
      corpo,
    );
    painel.classList.remove("is-entrando");
    void painel.offsetWidth; // reinicia a animação de entrada
    painel.classList.add("is-entrando");
  }

  const roadmap = createRoadmap({
    anos,
    inicial: inicialAno,
    painelId,
    onChange: (i) => desenhar(i),
  });
  // O roadmap não emite onChange na criação: o 1º desenho já considera o item do #hash
  desenhar(inicialAno, alvoInicial?.item ?? 0);

  /** #projeto-{id}: troca de ano, centraliza o item e rola até ele. */
  function irParaHash(hash, { rolar = true } = {}) {
    const id = idDoHash(hash);
    if (!id) return false;
    const achou = localizar(anos, id, atual);
    if (!achou) return false;
    if (achou.ano !== atual) roadmap.set(achou.ano);
    const card = conteudo?.cardDe(achou.item);
    if (card && rolar) {
      card.scrollIntoView({ block: "center", behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      card.classList.add("is-alvo");
      setTimeout(() => card.classList.remove("is-alvo"), 2600);
    }
    return true;
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest?.('a[href^="#projeto-"]');
    if (link && irParaHash(link.getAttribute("href"))) {
      event.preventDefault();
      history.pushState(null, "", link.getAttribute("href"));
    }
  });
  window.addEventListener("hashchange", () => irParaHash(location.hash));

  return h("div", { class: "pe" }, roadmap.el, painel);
}

