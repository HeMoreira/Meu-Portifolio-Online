/* Barra de teste: troca a identidade de cor (<html data-accent>) ao vivo,
   para conferir as seis paletas nos dois temas sem sair da página. */
import { h } from "../assets/js/core.js";
import { CURRICULOS } from "../assets/js/config.js";

const root = document.documentElement;

const select = h(
  "select",
  { id: "accent-select" },
  ...CURRICULOS.map((c) =>
    h("option", { value: c.slug, selected: c.slug === root.dataset.accent }, c.rotulo),
  ),
);
select.addEventListener("change", () => {
  root.dataset.accent = select.value;
});

document.body.append(
  h(
    "div",
    { class: "styleguide-bar", role: "group", "aria-label": "Teste de identidade de cor" },
    h("label", { for: "accent-select" }, "Identidade"),
    select,
  ),
);
