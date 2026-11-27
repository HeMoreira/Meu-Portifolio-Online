# Portfólio — fundação + seis currículos + página inicial

HTML5 + CSS3 + JavaScript puro. Sem frameworks, sem build, sem dependências, sem requisições a fontes externas.

## Como rodar

Os módulos JS (`type="module"`) exigem um servidor HTTP — abrir o arquivo com duplo clique não funciona:

```bash
python3 -m http.server 8000      # depois abra http://localhost:8000/
# ou: npx serve .
```

`/styleguide/` renderiza os componentes dos currículos com dados de exemplo e permite trocar a identidade de cor. Pode ser removida antes de publicar.

## Estrutura

```
/
├── index.html                       página inicial (hub + easter egg)
├── suporte-de-ti.html  desenvolvedor-frontend.html  desenvolvedor-backend.html
├── desenvolvedor-fullstack.html  desenvolvedor-freelancer.html  domador-de-ias.html
├── assets/
│   ├── css/
│   │   ├── main.css                 único arquivo linkado pelas páginas (@import dos demais)
│   │   ├── tokens.css  accents.css  base.css  layout.css
│   │   └── components/              buttons, badges, cards, sobre, competencias, projetos (card),
│   │                                roadmap, carrossel, certificacoes, modal, inicio, easter-egg
│   ├── js/
│   │   ├── theme.js                 tema claro/escuro (clássico, no <head>)
│   │   ├── config.js  core.js  icons.js
│   │   ├── page-shell.js            montagem comum: skip link, header, rodapé, scroll-spy
│   │   ├── resume-page.js           entrada dos 6 currículos
│   │   ├── home-page.js             entrada da página inicial
│   │   ├── components/              header, footer, section, sobre, competencia, projeto (card),
│   │   │                            projetos-experiencia, roadmap, carrossel,
│   │   │                            certificacao, modal, midia, inicio
│   │   └── easter-egg/              módulo ISOLADO do easter egg (ver abaixo)
│   ├── data/
│   │   ├── perfil.js                nome, foto e contatos compartilhados
│   │   ├── inicio.js                conteúdo da página inicial
│   │   ├── projetos.js              CATÁLOGO central de projetos/experiências + criarAnos()
│   │   └── curriculos/              um arquivo por currículo ({slug}.js) + exemplo.js
│   ├── fonts/                       Press Start 2P (OFL) — só o campo "Faça!" usa
│   ├── images/{perfil,competencias,projetos,certificacoes,inicio,site}/
│   └── videos/{projetos,inicio}/
└── styleguide/
```

## Convenções

- **O `slug` é tudo** nos currículos: página (`{slug}.html`), dados (`assets/data/curriculos/{slug}.js`) e cor (`<html data-accent="{slug}">`). A home usa `data-accent="inicio"` (azul).
- **Caminhos.** Todas as páginas ficam na raiz e usam `assets/…`. Nos módulos e dados nunca há caminho de página: `assetUrl("images", "inicio/x.webp")`, `pageUrl("slug")` e `HOME_URL` resolvem a partir de `core.js` (funcionam em subcaminhos de hospedagem).
- **Mídia por categoria, não por página.** Nunca copie arquivos; aponte para o mesmo.
- **Sem links fictícios.** Contato, repositório ou destino ausentes viram botão desabilitado.
- **Um único sistema de temas e de cores.** Componentes usam só tokens semânticos (`--accent-fill`, `--accent-detail`, `--on-accent-*`, neutros).

## Currículos — como editar

Tudo em `assets/data/` (detalhes dos campos em `curriculos/exemplo.js`):

- **Nome, foto, e-mail, LinkedIn, GitHub:** `perfil.js` (vale para as seis páginas e para a home; `href: null` = indisponível).
- **Competência / certificação:** itens em `competencias.itens` e `certificacoes.itens`.
- **Projetos e experiências:** escritos UMA vez em `assets/data/projetos.js` (catálogo) e associados a cada currículo por id — veja a seção abaixo.
- **`<title>` e descrição de cada aba:** no `<head>` do `.html`.

## Projetos e Experiência

A seção `#projetos` é um **roadmap de anos** (linha larga, um círculo com imagem por ano, o ativo no centro com o dobro do tamanho) sobre um **carrossel** dos itens do ano ativo.

### Catálogo central — `assets/data/projetos.js`

TODAS as informações de cada item ficam aqui (a chave é o id, que vira a âncora `#projeto-{id}`):

```js
export const CATALOGO = {
  "meu-portifolio-online": {
    tipo: "projeto",              // "projeto" (padrão) | "experiencia" → prefixo "Projeto: " / "Experiência: "
    titulo, descricao, repositorio, media, metricas /* 4 */, detalhes,
  },
};
```

`media`: imagem em `assets/images/projetos/` ou vídeo em `assets/videos/projetos/`. Vídeos têm botão "Ampliar vídeo" em telas ≥ 56rem (o `<video>` cobre o card com `height: 100%; width: auto`; clicar de novo, ou `Esc`, reduz).

Precisa de um texto diferente em outro currículo? Crie outro item no catálogo com id próprio (ex.: `meu-portifolio-online-suporte-de-ti`) — os currículos nunca sobrescrevem campos.

### Currículos — só ids e ordem (`projetos.anos` em `curriculos/{slug}.js`)

```js
projetos: {
  intro: "…",
  anos: criarAnos({
    2025: { imagem: "projetos/foto-do-ano.jpeg", itens: ["professor-python", "ai-tests"] }, // ordem = ordem de exibição
    2026: { itens: ["professor-python", "meu-portifolio-online-suporte-de-ti"] },
  }),                                   // intervalo padrão 2020–2026; outro: criarAnos({...}, { de: 2018, ate: 2030 })
},
```

- O **mesmo id** pode aparecer em vários anos e em vários currículos.
- Anos sem entrada ficam no roadmap, vazios. `imagem` do ano é opcional (senão usa a imagem de um item, ou um ícone).
- **Ano inicial = sempre o último da lista** (ou o ano do item citado em `#projeto-{id}`). Para estender a linha do tempo basta aumentar `ate`.
- **2+ itens** no ano → carrossel infinito (central maior, 2 de cada lado, repetindo quando há poucos; setas, pontos, arrastar, clique nos laterais). **1 item** → card único. **Nenhum** → estado vazio.
- **Todos os cards do ano têm a mesma altura** (a do maior): uma régua invisível mede uma cópia de cada item e define `--card-h`.
- Competências continuam apontando para `#projeto-{id}` (`relacao: { tipo: "projeto" | "experiencia", id }`): o link troca de ano e leva ao card.
- `/styleguide/` (dados em `exemplo.js`, com catálogo local) mostra os estados: 0, 1, 2, 3, 4 e 6 itens.

## Página inicial

`index.html` só declara o casco; `home-page.js` monta header, rodapé e seções com o mesmo `page-shell.js` dos currículos e lê `assets/data/inicio.js`.

- **Apresentação** (`#apresentacao`): texto à esquerda, foto quadrada pequena à direita (ponto de entrada do easter egg) com a legenda "Contra o mundo" apenas abaixo da foto.
- **Seis áreas** (`#curriculos` agrupa as seções `area-{slug}`), alternando: mídia à esquerda, direita, esquerda… (a apresentação é texto | mídia). No DOM o texto vem primeiro; a inversão é visual (≥ 56rem).
- **Mídias 16:9** com duas variações de animação sutil (esquerda: sobe e inclina; direita: desce e inclina, durações diferentes e defasadas). Sem animação com `prefers-reduced-motion`.
- **Navegação:** Apresentação, Currículos e botão de tema; o nome no header volta para a home.

### Adicionar imagens e vídeos às seis seções

1. Coloque o arquivo em `assets/images/inicio/` (imagens) ou `assets/videos/inicio/` (vídeos).
2. Em `assets/data/inicio.js`, no item da área, troque `midia`:
   - imagem: `{ tipo: "imagem", src: "inicio/minha-imagem.webp", alt: "descrição" }`
   - vídeo: `{ tipo: "video", src: "inicio/demo.mp4", mime: "video/mp4", poster: "inicio/capa.webp", alt: "descrição" }`
3. Use proporção 16:9 (a moldura recorta com `object-fit: cover`). Vídeos não têm autoplay.

Foto pessoal: substitua `perfil/placeholder.svg` (via `perfil.js`) por uma imagem quadrada.

## Easter egg da foto — `assets/js/easter-egg/`

| Arquivo | Papel |
|---|---|
| `config.js` | sequência, código, breakpoint, estados, transições, nomes de eventos |
| `sequence.js` | reconhecedor de sequência (puro) |
| `code.js` | `sanitizeInput`, `normalizeCode`, `isSecretCode` (puros) |
| `secret-mode.js` | **`activateSecretMode()`** / `deactivateSecretMode()` — ponto de entrada futuro |
| `markup.js` | estrutura DOM (sem comportamento) |
| `index.js` | máquina de estados + eventos; `initEasterEggs(scope)` |
| `components/easter-egg.css` | estilos (estados em `data-egg-state`) |

Ligação com o resto do site: **uma linha** em `home-page.js` (`initEasterEggs(main)`). Ele não conhece header, tema ou currículos.

**Estados** (`.egg[data-egg-state]`):

1. `disabled` — tela ≤ 1024px: foto comum, sem papel de botão nem setas.
2. `idle` — foto + "Contra o mundo". Hover (foto ou área maior, incluindo a região das setas) e foco de teclado acendem a borda e dão tom azulado; em telas de toque (`hover: none`) o realce é permanente.
3. `active` — clique/Enter/Espaço na foto: legenda some (fade) e 4 setas aparecem ao redor. Cada seta move a foto ~10px e ela retorna (Web Animations; sem movimento com reduced-motion).
4. `code` — sequência **↑ ↑ ↓ ↓ ← → ← →** completa: foto escurecida e campo "Faça!" (fonte pixel local, 2 letras, foco automático, `label for`/`id`). `Esc` volta ao estado `active`.
5. `secret` — código `BA` (qualquer caixa) aceito → `activateSecretMode()`.

Sequência errada é descartada na hora (e a tentativa seguinte começa do zero, ou do 1º passo se a tecla errada for ↑). Cliques durante a transição final são ignorados. Entrada: só letras, máximo 2, via `textContent`/`value`; sem `eval`, sem `innerHTML` com dados do usuário, sem armazenamento.

**Eventos** (CustomEvent com bubbles, a partir de `.egg`): `egg:statechange`, `egg:sequence`, **`egg:secret-activated`**, `egg:secret-deactivated`. Estado global em `<html data-secret-mode="on">`.

### Pontos de extensão para a próxima etapa

- **Entrada da funcionalidade:** `activateSecretMode({ root, emit })` em `secret-mode.js` (hoje só marca `data-secret-mode` e emite o evento). Alternativa sem editar o egg: ouvir `egg:secret-activated`.
- **Camada de interação por mídia:** toda mídia (as 6 áreas e a foto) tem `div.media__layer[data-layer="interaction"][data-active="false"]`, sobreposta exatamente à mídia, com `pointer-events: none` enquanto inativa. É onde as hitboxes serão inseridas (`data-active="true"` habilita eventos). Mídias têm `[data-media]` para serem localizadas.
- **Animação das mídias:** as mídias flutuam com CSS; o modo secreto pode desligar com `[data-secret-mode] .media { animation: none }`.
- **Estados novos:** acrescentar em `STATES`/`TRANSITIONS` (`config.js`).

## Sistema de cores

Cada identidade define 4 valores em `accents.css`: `--accent-{light|dark}-{fill|detail}`; os componentes usam só `--accent-fill`, `--accent-detail`, `--on-accent-fill`, `--on-accent-detail`, `--accent-subtle`.

- **Claro:** `fill` = cor clara (texto `--text-main` sobre ela); `detail` = cor escura (texto, bordas, ícones).
- **Escuro:** papéis invertidos — `detail` clara/neon; `fill` escura saturada com texto branco.
- Contraste WCAG 2.x validado para as 7 identidades (6 currículos + `inicio`) nos dois temas: texto sobre `fill` ≥ 4.5:1; `detail` sobre `bg`/`surface`/`surface-2`/`accent-subtle` ≥ 4.5:1.

## Tema

`theme.js` é a única implementação: sistema na 1ª visita, depois `localStorage` (`portfolio-theme`), compartilhado entre páginas e abas. Qualquer `[data-theme-toggle]` vira botão.

## Acessibilidade e movimento

HTML semântico, skip link, foco visível, `aria-current` na seção ativa, menu mobile com `aria-expanded`, modal em `<dialog>` nativo, barras com `role="meter"`, roadmap como `tablist`/`tab` (setas, Home/End), carrossel com `aria-roledescription` e região `aria-live`, setas do easter egg como `<button>` com `aria-label` em um `role="group"`, gatilho da foto com `role="button"`/`aria-expanded` só quando habilitado. Animações respeitam `prefers-reduced-motion`.

## Placeholders pendentes

Procure `[Seu Nome]` e `[Exemplo]` (`grep -rn "\[Exemplo\]\|\[Seu Nome\]" .`): nome/foto/contatos (`perfil.js`), `<title>` das páginas, texto de apresentação e das áreas (`inicio.js`), projetos e certificações dos currículos, e as imagens `placeholder*.svg`.

## Licenças

Fonte Press Start 2P: SIL Open Font License 1.1 (`assets/fonts/PRESS-START-2P-OFL.txt`).
