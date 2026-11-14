(() => {
  "use strict";

  /* ------------------------------------------------------------------
     DADOS
     Para mudar textos, almas ou cores, é só editar as listas abaixo.
  ------------------------------------------------------------------ */
  const MESES = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Cada alma: nome = nome da alma, texto = subtexto (comentário de uma voz externa)
  const ALMAS = [
    /* Janeiro  */ [
      { nome: "Alma radiante",   texto: "Brilha mesmo onde ninguém pediu luz. Atrai olhares, e nem todos os olhares são amigáveis." },
      { nome: "Alma corrompida", texto: "Nasceu com uma rachadura que ninguém viu abrir. Uns dizem que veio assim; outros, que escolheu ficar." }
    ],
    /* Fevereiro */ [
      { nome: "Alma infinita", texto: "Não conhece o próprio limite, nem o de quem está ao redor. Fome que não termina chama-se destino." },
      { nome: "Alma bestial",  texto: "O instinto fala antes da razão, e raramente se engana. Raramente." }
    ],
    /* Março */ [
      { nome: "Alma dominante",  texto: "Nasceu para ficar à frente. Quem caminha atrás aprende a obedecer ou a odiar." },
      { nome: "Alma antagônica", texto: "Existe em oposição: ao mundo, aos outros, a si mesma. Contradizer é a sua forma de respirar." },
      { nome: "Alma decrépita",  texto: "Envelheceu antes de viver. Carrega o cansaço de eras que nunca conheceu." }
    ],
    /* Abril */ [
      { nome: "Alma amoral",   texto: "Não é má, nem boa. Apenas não ouve o que os outros chamam de certo." },
      { nome: "Alma dividida", texto: "Duas vozes dividem o mesmo corpo. Nenhuma admite ser a visita." }
    ],
    /* Maio */ [
      { nome: "Alma gladiadora", texto: "Só se entende com sangue no chão e plateia ao redor. A luta é a sua língua materna." },
      { nome: "Alma solitária",  texto: "Prefere o silêncio à companhia. Não por orgulho: por hábito de ser deixada para trás." }
    ],
    /* Junho */ [
      { nome: "Alma submissa", texto: "Aprendeu cedo a baixar a cabeça. Quem a comanda raramente percebe o quanto lhe é dado." },
      { nome: "Alma ordenada", texto: "Cada coisa em seu lugar, inclusive os próprios medos. A ordem é a sua armadura." },
      { nome: "Alma pastora",  texto: "Cuida de quem a segue, mesmo quando o rebanho caminha para o abismo." }
    ],
    /* Julho */ [
      { nome: "Alma atormentada", texto: "Algo a persegue desde antes do nome. Dorme pouco e sonha demais." },
      { nome: "Alma estagnada",   texto: "Parada no tempo enquanto o mundo apodrece ao redor. Já não sabe se espera ou se desistiu." }
    ],
    /* Agosto */ [
      { nome: "Alma desafiadora", texto: "Nunca aceitou um “não” sem testar a porta. Muitas portas já testaram de volta." },
      { nome: "Alma latente",     t: "Algo grande dorme dentro dela. Ainda não se sabe se vai despertar como milagre ou como desastre." }
    ],
    /* Setembro */ [
      { nome: "Alma carinhosa", texto: "Abraça rápido e solta devagar. Dá mais do que pode e depois não sabe pedir." },
      { nome: "Alma amorosa",   texto: "Ama de forma inteira e imprudente. Para ela, perder é só outro jeito de amar." },
      { nome: "Alma inocente",  texto: "Ainda acredita que as coisas têm motivo. É a mais frágil e, talvez por isso, a mais cobiçada." }
    ],
    /* Outubro */ [
      { nome: "Alma iluminada", texto: "Vê o que os outros ainda não aprenderam a temer. Esse conhecimento raramente traz paz." },
      { nome: "Alma vazia",     t: "Não há nada ali e, por isso, cabe tudo. Cuidado com o que vier a preenchê-la." }
    ],
    /* Novembro */ [
      { nome: "Alma em luto",   texto: "Carrega alguém que já se foi. Cada passo é um enterro adiado." },
      { nome: "Alma metamorfa", texto: "Nunca é a mesma duas vezes. Até ela esquece qual era a forma original." }
    ],
    /* Dezembro */ [
      { nome: "Alma sufocada", texto: "Falta-lhe ar, voz e espaço. Tudo nela pede para ser dito e nada encontra saída." },
      { nome: "Alma caótica",  texto: "Onde passa, a ordem dura pouco. Não é maldade: é o jeito como o mundo a atravessa." },
      { nome: "Alma sombria",  texto: "Habita o canto onde a luz hesita. Não esconde nada, só não faz questão de mostrar." }
    ]
  ];

  const CORES = [
    { nome: "Carmesim",    hex: "#9b1c2e" },
    { nome: "Âmbar",       hex: "#c98a1f" },
    { nome: "Ocre",        hex: "#a8782f" },
    { nome: "Verde-musgo", hex: "#4f6b2f" },
    { nome: "Verde-água",  hex: "#2f8f86" },
    { nome: "Azul-noite",  hex: "#23307a" },
    { nome: "Violeta",     hex: "#6a3d9a" },
    { nome: "Cinza-cinza", hex: "#80808a" },
    { nome: "Branco-osso", hex: "#e4e0d2" },
    { nome: "Negro",       hex: "#0c0b10" }
  ];

  // Perguntas (usadas no print e no .txt)
  const PERGUNTAS = {
    quem:   { romano: "I",   rotulo: "Quem você é",                                        comentario: "Todos respondem com um nome. Poucos respondem com a verdade. Ambos serão lembrados, só que de formas diferentes." },
    objetivo:  { romano: "II",  rotulo: "Seu objetivo",                                       comentario: "Os deuses também começaram com um desejo. O de alguns apodreceu antes mesmo de a coroa chegar." },
    nunca: { romano: "III", rotulo: "Algo que nunca faria, exceto em situações extremas", comentario: "Aqui, “nunca” dura até a primeira fome de verdade. Seja honesto: a lista é mais curta do que você imagina." },
    medo: { romano: "IV", rotulo: "Do que você tem medo?", comentario: "O medo é a única honestidade que sobrevive à fome. Diga o seu antes que alguém o descubra por você." },
    arrependimento: { romano: "V", rotulo: "Qual é o seu maior arrependimento?", comentario: "Todo mundo carrega um. Os que dizem que não carregam dois." },
    deixouParaTras: { romano: "VI", rotulo: "Quem você deixou para trás?", comentario: "Quem fica raramente esquece. Quem vai embora, às vezes, também não." },
    poder: { romano: "VII", rotulo: "O que você faria por poder?", comentario: "Toda coroa tem um preço. Pergunte-se quem já o pagou antes de você." },
    recuperar: { romano: "VIII", rotulo: "O que você pegaria de volta, se pudesse?", comentario: "O que se perde não volta como era. Mas dá para tentar mesmo assim." },
    morte: { romano: "IX", rotulo: "Como você acha que vai morrer?", comentario: "Ninguém acerta. Mas quase todos têm um palpite, e é ele que ronda." },
    nascimento:  { romano: "X",   rotulo: "Quando você nasceu",                                 comentario: "A data não é vaidade. É o primeiro registro da sua alma, o único que você não escolheu." },
    cor: { romano: "XI",  rotulo: "A cor da sua alma",                                  comentario: "Não existe resposta errada. Existe a que você hesita em dizer, e é provavelmente essa." }
  };
  // Perguntas de resposta escrita, na ordem em que aparecem
  const CAMPOS_TEXTO = ["quem", "objetivo", "nunca", "medo", "arrependimento", "deixouParaTras", "poder", "recuperar", "morte"];

  /* ------------------------------------------------------------------
     FUNÇÕES AUXILIARES
  ------------------------------------------------------------------ */
  const $ = (s, reg = document) => reg.querySelector(s);
  const criar = (tag, classe, texto) => {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto != null) e.textContent = texto;
    return e;
  };
  const hexMaiusculo = (h) => h.toUpperCase();

  /* ------------------------------------------------------------------
     FAIXAS ANIMADAS (topo e rodapé)
  ------------------------------------------------------------------ */
  const FRASES_FAIXA = ["PERÍMETRO RPG", "REPLIKA", "Nascimento de uma Alma", "Nascimento de um Deus"];

  function comLetraCaixa(palavra) {
    const frag = document.createDocumentFragment();
    frag.appendChild(criar("span", "letra", palavra[0]));
    frag.appendChild(document.createTextNode(palavra.slice(1)));
    return frag;
  }
  function montarTrilho(trilho, frases) {
    const trecho = () => {
      const s = criar("span", "trecho");
      for (let reg = 0; reg < 3; reg++) {
        frases.forEach((p) => {
          const item = criar("span");
          item.appendChild(comLetraCaixa(p));
          s.appendChild(item);
          s.appendChild(criar("span", "ponto", "•"));
        });
      }
      return s;
    };
    trilho.appendChild(trecho());
    trilho.appendChild(trecho());
  }
  montarTrilho($("#trilhoTopo"), FRASES_FAIXA);
  montarTrilho($("#trilhoBase"), [FRASES_FAIXA[2], FRASES_FAIXA[3], FRASES_FAIXA[0], FRASES_FAIXA[1]]);

  /* ------------------------------------------------------------------
     MESES + REVELAÇÃO DA ALMA
  ------------------------------------------------------------------ */
  const campoNascimento = $("#nascimento");
  const revelacao = $("#revelacao");
  const tituloRevelacao = $("#tituloRevelacao");
  const subRevelacao = $("#subRevelacao");
  const caixaAlmas = $("#almas");
  const erroAlma = $("#erroAlma");

  let mesAtual = -1;

  // Lê "AAAA-MM-DD" e confere se é uma data real
  function lerNascimento(v) {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v || "");
    if (!m) return null;
    const y = +m[1], mo = +m[2], d = +m[3];
    const dt = new Date(y, mo - 1, d);
    if (y < 1 || dt.getFullYear() !== y || dt.getMonth() !== mo - 1 || dt.getDate() !== d) return null;
    return { y, d, idx: mo - 1 };
  }
  const formatarData = (b) => doisDigitos(b.d) + "/" + doisDigitos(b.idx + 1) + "/" + String(b.y).padStart(4, "0");

  function esconderAlmas() {
    mesAtual = -1;
    revelacao.hidden = true;
    caixaAlmas.textContent = "";
    erroAlma.textContent = "";
  }

  function mostrarAlmas(indMes) {
    mesAtual = indMes;
    const lista = ALMAS[indMes];
    caixaAlmas.textContent = "";
    erroAlma.textContent = "";
    tituloRevelacao.textContent = "Sua alma se revela";
    subRevelacao.textContent =
      MESES[indMes] + " abriga " + (lista.length === 2 ? "duas almas" : "três almas") +
      ". Apenas uma pode ser a sua; escolha com cuidado.";
    lista.forEach((s, i) => {
      const rotuloEl = criar("label", "alma");
      const entrada = criar("input");
      entrada.type = "radio";
      entrada.name = "alma";
      entrada.value = String(i);
      const cartao = criar("span", "cartao");
      cartao.appendChild(criar("span", "nome", s.nome));
      cartao.appendChild(criar("span", "nota", s.texto));
      rotuloEl.appendChild(entrada);
      rotuloEl.appendChild(cartao);
      caixaAlmas.appendChild(rotuloEl);
    });
    revelacao.hidden = false;
    revelacao.style.animation = "none";
    void revelacao.offsetWidth;
    revelacao.style.animation = "";
    limparInvalido($("#p-nascimento"));
  }

  function aoMudarNascimento() {
    const b = lerNascimento(campoNascimento.value);
    limparInvalido($("#p-nascimento"));
    if (!b) { esconderAlmas(); return; }
    if (b.idx !== mesAtual) mostrarAlmas(b.idx); // mesmo mês: mantém a escolha
  }
  campoNascimento.addEventListener("input", aoMudarNascimento);
  campoNascimento.addEventListener("change", aoMudarNascimento);

  /* ------------------------------------------------------------------
     COR DA ALMA
  ------------------------------------------------------------------ */
  const caixaCores = $("#cores");
  const orbe = $("#orbe");
  const nomeOrbe = $("#orbeNome");
  const personalizada = $("#corPersonalizada");
  let corEscolhida = null; // { nome, hex, personalizada }

  CORES.forEach((c) => {
    const rotuloEl = criar("label", "cor");
    rotuloEl.title = c.nome;
    const entrada = criar("input");
    entrada.type = "radio";
    entrada.name = "cor";
    entrada.value = c.hex;
    entrada.setAttribute("aria-label", c.nome);
    const amostra = criar("span");
    amostra.style.background = c.hex;
    rotuloEl.appendChild(entrada);
    rotuloEl.appendChild(amostra);
    caixaCores.appendChild(rotuloEl);
  });

  function definirCor(c) {
    corEscolhida = c;
    orbe.style.setProperty("--cor", c.hex);
    nomeOrbe.textContent = c.nome + " · " + hexMaiusculo(c.hex);
    limparInvalido($("#p-cor"));
  }
  caixaCores.addEventListener("change", (e) => {
    if (e.target.name === "cor") {
      definirCor(Object.assign({}, CORES.find((x) => x.hex === e.target.value), { personalizada: false }));
    }
  });
  personalizada.addEventListener("input", () => {
    caixaCores.querySelectorAll("input").forEach((i) => (i.checked = false));
    definirCor({ nome: "Cor própria", hex: personalizada.value, personalizada: true });
  });

  /* ------------------------------------------------------------------
     VALIDAÇÃO
  ------------------------------------------------------------------ */
  const formulario = $("#formulario");

  function marcarInvalido(painel, mensagem) {
    painel.classList.add("invalido");
    const erro = $(".erro", painel);
    if (erro) erro.textContent = mensagem;
  }
  function limparInvalido(painel) {
    painel.classList.remove("invalido");
    painel.querySelectorAll(".erro").forEach((e) => (e.textContent = ""));
  }

  CAMPOS_TEXTO.forEach((id) => {
    $("#" + id).addEventListener("input", () => limparInvalido($("#p-" + id)));
  });

  function validar() {
    let primeiro = null;
    const falhar = (painel, mensagem) => {
      marcarInvalido(painel, mensagem);
      if (!primeiro) primeiro = painel;
    };

    CAMPOS_TEXTO.forEach((id) => {
      const painel = $("#p-" + id);
      limparInvalido(painel);
      if (!$("#" + id).value.trim()) falhar(painel, "Este campo não pode ficar em branco.");
    });

    const painelNascimento = $("#p-nascimento");
    limparInvalido(painelNascimento);
    const nasc = lerNascimento(campoNascimento.value);
    if (!nasc) {
      falhar(painelNascimento, "Informe uma data de nascimento válida.");
    } else if (!formulario.alma.value) {
      erroAlma.textContent = "Escolha uma alma. Não pode ser as duas.";
      painelNascimento.classList.add("invalido");
      if (!primeiro) primeiro = painelNascimento;
    }

    const painelCor = $("#p-cor");
    limparInvalido(painelCor);
    if (!corEscolhida) falhar(painelCor, "Escolha a cor da sua alma.");

    if (primeiro) primeiro.scrollIntoView({ behavior: "smooth", block: "center" });
    return !primeiro;
  }

  /* ------------------------------------------------------------------
     COLETA DAS RESPOSTAS + TXT
  ------------------------------------------------------------------ */
  function coletar() {
    const nasc = lerNascimento(campoNascimento.value);
    const indMes = nasc.idx;
    const indAlma = Number(formulario.alma.value);
    const alma = ALMAS[indMes][indAlma];
    return {
      ...Object.fromEntries(CAMPOS_TEXTO.map((id) => [id, formulario[id].value.trim()])),
      nascimento: formatarData(nasc),
      indiceMes: indMes,
      indiceAlma: indAlma,
      mes: MESES[indMes],
      alma: alma.nome,
      comentarioAlma: alma.texto,
      cor: Object.assign({}, corEscolhida),
      salvoEm: new Date()
    };
  }

  function doisDigitos(n) { return String(n).padStart(2, "0"); }
  function carimbo(d) {
    return doisDigitos(d.getDate()) + "/" + doisDigitos(d.getMonth() + 1) + "/" + d.getFullYear() +
      " " + doisDigitos(d.getHours()) + ":" + doisDigitos(d.getMinutes());
  }

  function textoSimples(reg) {
    const linha = "=".repeat(48);
    return [
      "PERÍMETRO RPG · REPLIKA",
      "Nascimento de uma Alma · Nascimento de um Deus",
      linha,
      "Registro selado em " + carimbo(reg.salvoEm),
      "",
      ...CAMPOS_TEXTO.flatMap((id) => [
        PERGUNTAS[id].romano + ". " + PERGUNTAS[id].rotulo.toUpperCase(),
        reg[id],
        ""
      ]),
      PERGUNTAS.nascimento.romano + ". QUANDO VOCÊ NASCEU",
      "Data de nascimento: " + reg.nascimento,
      "Mês: " + reg.mes,
      "Alma: " + reg.alma,
      "Comentário: “" + reg.comentarioAlma + "”",
      "",
      PERGUNTAS.cor.romano + ". A COR DA SUA ALMA",
      "Cor: " + reg.cor.nome,
      "HEX: " + hexMaiusculo(reg.cor.hex),
      "",
      linha,
      ""
    ].join("\n");
  }

  function slug(s) {
    const t = s.normalize("NFD").replace(/[̀-ͯ]/g, "")
      .toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return t.split("-").slice(0, 4).join("-").slice(0, 32) || "personagem";
  }

  /* ------------------------------------------------------------------
     PRINT DO FORMULÁRIO (desenhado direto num canvas, sem bibliotecas)
     Reproduz o formulário preenchido: perguntas, respostas, comentários,
     mês, almas do mês (com a escolhida marcada) e a cor com o HEX.
  ------------------------------------------------------------------ */
  const FONTE_CORPO = '"Cormorant Garamond","Iowan Old Style","Palatino Linotype",Georgia,serif';
  const FONTE_GOTICA = '"UnifrakturCook","Old English Text MT","Luminari",Georgia,serif';
  const PALETA = {
    fundo: "#15141a", moldura: "#17161c", osso: "#cecad2", osso2: "#e4e0d8",
    suave: "#8c889c", fino: "#706a82", barra: "#4c475c", barraLinha: "#7a7490",
    painel: "#2c2b34", campo: "#15141a", azulA: "#2c3ae6", azulB: "#1c24b0", azulD: "#0a085a"
  };

  function rgbDe(h) {
    const n = parseInt(h.slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  function misturar(h, t, to) {
    const a = rgbDe(h);
    return "rgb(" + a.map((v, i) => Math.round(v + (to[i] - v) * t)).join(",") + ")";
  }

  async function carregarRecursos() {
    try {
      await Promise.all([
        document.fonts.load('700 22px "Cormorant Garamond"'),
        document.fonts.load('italic 500 20px "Cormorant Garamond"'),
        document.fonts.load('700 40px "UnifrakturCook"')
      ]);
      await document.fonts.ready;
    } catch (_) { /* segue com as fontes de reserva */ }
    let logo = null;
    if (window.LOGO_DADOS) {
      logo = new Image();
      logo.src = window.LOGO_DADOS;
      try { await logo.decode(); } catch (_) { logo = null; }
    }
    return logo;
  }

  // Desenha tudo. Retorna o y onde o conteúdo termina.
  function pintar(ctx, W, topoMoldura, alturaMoldura, reg, logo) {
    const xMoldura = 70, larguraMoldura = W - 140, margem = 52;
    const xInterno = xMoldura + margem, larguraInterna = larguraMoldura - margem * 2;
    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";

    const fonte = (estilo, tamanho, familia) => { ctx.font = estilo + " " + tamanho + "px " + (familia || FONTE_CORPO); };

    const espacado = (texto, x, y, espacamento, alinhamento) => {
      const caracteres = Array.from(texto);
      const larguras = caracteres.map((letra) => ctx.measureText(letra).width);
      const total = larguras.reduce((a, b) => a + b, 0) + espacamento * (caracteres.length - 1);
      let cx = alinhamento === "center" ? x - total / 2 : alinhamento === "right" ? x - total : x;
      const anterior = ctx.textAlign;
      ctx.textAlign = "left";
      caracteres.forEach((letra, i) => { ctx.fillText(letra, cx, y); cx += larguras[i] + espacamento; });
      ctx.textAlign = anterior;
      return total;
    };
    const larguraEspacada = (texto, espacamento) => {
      const caracteres = Array.from(texto);
      return caracteres.reduce((a, letra) => a + ctx.measureText(letra).width, 0) + espacamento * (caracteres.length - 1);
    };

    const quebrar = (texto, larguraMax) => {
      const linhasSaida = [];
      String(texto).split(/\r?\n/).forEach((paragrafo) => {
        if (!paragrafo.trim()) { linhasSaida.push(""); return; }
        let linha = "";
        paragrafo.split(/\s+/).filter(Boolean).forEach((palavra) => {
          const teste = linha ? linha + " " + palavra : palavra;
          if (ctx.measureText(teste).width <= larguraMax) { linha = teste; return; }
          if (linha) { linhasSaida.push(linha); linha = ""; }
          if (ctx.measureText(palavra).width <= larguraMax) { linha = palavra; return; }
          let pedaco = "";
          for (const letra of palavra) {
            if (ctx.measureText(pedaco + letra).width > larguraMax) { linhasSaida.push(pedaco); pedaco = letra; } else pedaco += letra;
          }
          linha = pedaco;
        });
        linhasSaida.push(linha);
      });
      return linhasSaida;
    };

    const retangulo = (x, y, w, h, preenchimento, contorno, espessura) => {
      if (preenchimento) { ctx.fillStyle = preenchimento; ctx.fillRect(x, y, w, h); }
      if (contorno) { ctx.lineWidth = espessura || 1; ctx.strokeStyle = contorno; ctx.strokeRect(x + (espessura || 1) / 2, y + (espessura || 1) / 2, w - (espessura || 1), h - (espessura || 1)); }
    };
    const azul = (x, y, w, h) => {
      const g = ctx.createLinearGradient(0, y, 0, y + h);
      g.addColorStop(0, PALETA.azulA); g.addColorStop(1, PALETA.azulB);
      retangulo(x, y, w, h, g, PALETA.azulD, 1);
    };
    const losango = (cx, cy, s, preenchimento) => {
      ctx.fillStyle = preenchimento;
      ctx.beginPath();
      ctx.moveTo(cx, cy - s); ctx.lineTo(cx + s, cy); ctx.lineTo(cx, cy + s); ctx.lineTo(cx - s, cy);
      ctx.closePath(); ctx.fill();
    };

    // ---- fundo
    ctx.fillStyle = PALETA.fundo;
    ctx.fillRect(0, 0, W, topoMoldura + alturaMoldura + 400 > 9000 ? 9000 : topoMoldura + alturaMoldura + 44 + 56);
    const gradVinheta = ctx.createRadialGradient(W / 2, 0, 0, W / 2, 0, W * 0.8);
    gradVinheta.addColorStop(0, "rgba(80,70,140,.16)"); gradVinheta.addColorStop(1, "rgba(80,70,140,0)");
    ctx.fillStyle = gradVinheta; ctx.fillRect(0, 0, W, 700);

    // ---- faixa de cima
    const faixa = (y, h, fundo, fg, boxBg, boxFg, offset) => {
      retangulo(0, y, W, h, fundo);
      fonte("700", 26);
      let x = -offset;
      const ordem = FRASES_FAIXA;
      let limite = 0;
      while (x < W && limite++ < 60) {
        for (const p of ordem) {
          const primeiro = p[0], resto = p.slice(1);
          const larguraCaixa = ctx.measureText(primeiro).width + 16;
          retangulo(x, y + (h - 34) / 2, larguraCaixa, 34, boxBg);
          ctx.fillStyle = boxFg; ctx.fillText(primeiro, x + 8, y + h / 2 + 9);
          x += larguraCaixa + 3;
          ctx.fillStyle = fg; ctx.fillText(resto, x, y + h / 2 + 9);
          x += ctx.measureText(resto).width + 26;
          ctx.fillText("•", x, y + h / 2 + 9);
          x += ctx.measureText("•").width + 26;
        }
      }
    };
    faixa(0, 56, "#d6d2cb", "#1c1a20", "#1c1a20", "#eeece8", 40);

    // ---- moldura
    if (alturaMoldura > 0) {
      retangulo(xMoldura, topoMoldura, larguraMoldura, alturaMoldura, PALETA.moldura);
      retangulo(xMoldura, topoMoldura, larguraMoldura, alturaMoldura, null, PALETA.osso, 5);
      retangulo(xMoldura - 10, topoMoldura - 10, larguraMoldura + 20, alturaMoldura + 20, null, PALETA.fino, 1);
      [[xMoldura - 24, topoMoldura - 24], [xMoldura + larguraMoldura + 24, topoMoldura - 24], [xMoldura - 24, topoMoldura + alturaMoldura + 24], [xMoldura + larguraMoldura + 24, topoMoldura + alturaMoldura + 24]]
        .forEach(([cx, cy]) => losango(cx, cy, 7, PALETA.osso));
      faixa(topoMoldura + alturaMoldura + 44, 56, "#464450", "#eeece8", "#eeece8", "#464450", 300);
    }

    let y = topoMoldura + 40;

    // ---- cabeçalho
    if (logo) {
      const larguraLogo = 300, alturaLogo = larguraLogo * (logo.height / logo.width);
      ctx.drawImage(logo, W / 2 - larguraLogo / 2, y, larguraLogo, alturaLogo);
      y += alturaLogo + 14;
    }
    fonte("700", 62, FONTE_GOTICA);
    ctx.fillStyle = PALETA.osso2; ctx.textAlign = "center";
    ctx.shadowColor = "rgba(120,110,210,.45)"; ctx.shadowBlur = 24;
    ctx.fillText("Registro de Almas", W / 2, y + 54);
    ctx.shadowBlur = 0; ctx.shadowColor = "transparent";
    y += 82;
    fonte("700", 17); ctx.fillStyle = PALETA.osso;
    espacado("PERÍMETRO RPG", W / 2, y + 12, 7.4, "center");
    ctx.textAlign = "left";
    y += 34;
    retangulo(W / 2 - 184, y, 170, 1, PALETA.fino); retangulo(W / 2 + 14, y, 170, 1, PALETA.fino);
    losango(W / 2, y, 5, PALETA.osso);
    y += 34;

    // ---- blocos reutilizáveis
    const barra = (perg) => {
      fonte("700", 20);
      const larguraRotulo = larguraInterna - 88;
      const linhas = quebrar(perg.rotulo, larguraRotulo);
      const h = 18 + linhas.length * 26;
      retangulo(xInterno, y, larguraInterna, h, PALETA.barra, PALETA.barraLinha, 1);
      fonte("700", 24, FONTE_GOTICA); ctx.fillStyle = PALETA.osso;
      ctx.fillText(perg.romano, xInterno + 14, y + 29);
      fonte("700", 20); ctx.fillStyle = "#f5f5f8";
      linhas.forEach((ln, i) => ctx.fillText(ln + (i === linhas.length - 1 ? " /" : ""), xInterno + 14 + 74, y + 29 + i * 26));
      y += h;
    };
    const caixaCorpo = (h) => { retangulo(xInterno, y, larguraInterna, h, PALETA.painel, PALETA.barraLinha, 1); };
    const comentario = (perg) => {
      y += 12;
      fonte("italic 500", 19);
      const linhas = quebrar(perg.comentario, larguraInterna - 44);
      const h = linhas.length * 27 + 4;
      retangulo(xInterno + 14, y, 2, h, PALETA.fino);
      ctx.fillStyle = PALETA.suave;
      linhas.forEach((ln, i) => ctx.fillText(ln, xInterno + 32, y + 20 + i * 27));
      y += h + 30;
    };
    const painelResposta = (perg, text) => {
      barra(perg);
      fonte("500", 20);
      const linhas = quebrar(text, larguraInterna - 32 - 28);
      const innerH = Math.max(2, linhas.length) * 29 + 22;
      const h = innerH + 32;
      caixaCorpo(h);
      retangulo(xInterno + 16, y + 16, larguraInterna - 32, innerH, PALETA.campo, PALETA.fino, 1);
      ctx.fillStyle = PALETA.osso2;
      linhas.forEach((ln, i) => ctx.fillText(ln, xInterno + 30, y + 16 + 29 + i * 29 - 5));
      y += h;
      comentario(perg);
    };

    // ---- I, II, III
    CAMPOS_TEXTO.forEach((id) => painelResposta(PERGUNTAS[id], reg[id]));

    // ---- divisor
    fonte("700", 14); ctx.fillStyle = PALETA.osso;
    const rotuloDivisor = "PERGUNTAS EXTRAS";
    const larguraDivisor = larguraEspacada(rotuloDivisor, 4.8);
    retangulo(xInterno, y + 8, (larguraInterna - larguraDivisor) / 2 - 18, 1, PALETA.fino);
    retangulo(xInterno + larguraInterna - ((larguraInterna - larguraDivisor) / 2 - 18), y + 8, (larguraInterna - larguraDivisor) / 2 - 18, 1, PALETA.fino);
    espacado(rotuloDivisor, W / 2, y + 13, 4.8, "center");
    y += 56;

    // ---- nascimento
    {
      const perg = PERGUNTAS.nascimento;
      barra(perg);
      const h = 32 + 62;
      caixaCorpo(h);
      retangulo(xInterno + 16, y + 16, 300, 62, PALETA.campo, PALETA.fino, 1);
      fonte("700", 28); ctx.fillStyle = PALETA.osso2;
      espacado(reg.nascimento, xInterno + 16 + 150, y + 16 + 41, 2.4, "center");
      fonte("italic 500", 19); ctx.fillStyle = PALETA.suave;
      ctx.fillText(MESES[reg.indiceMes], xInterno + 16 + 300 + 22, y + 16 + 38);
      y += h;
      comentario(perg);

      // revelação: almas do mês
      const lista = ALMAS[reg.indiceMes];
      const margemRev = 16, larguraRev = larguraInterna;
      // mede altura
      fonte("700", 30, FONTE_GOTICA);
      const textoSub = MESES[reg.indiceMes] + " abriga " + (lista.length === 2 ? "duas almas" : "três almas") + ". Apenas uma pode ser a sua; escolha com cuidado.";
      fonte("italic 500", 19);
      const linhasSub = quebrar(textoSub, larguraRev - margemRev * 2);
      const cartoes = lista.map((s) => {
        fonte("italic 500", 19);
        const linhasNota = quebrar("“" + s.texto + "”", larguraRev - margemRev * 2 - 40);
        return { alma: s, linhasNota, altura: 14 + 24 + 6 + linhasNota.length * 26 + 14 };
      });
      const total = 22 + 38 + linhasSub.length * 27 + 16 + cartoes.reduce((a, c) => a + c.altura + 12, 0) + margemRev - 12;
      retangulo(xInterno, y, larguraRev, total, "rgba(15,14,19,.85)", PALETA.barraLinha, 1);
      let yRev = y + 22;
      fonte("700", 30, FONTE_GOTICA); ctx.fillStyle = PALETA.osso2; ctx.textAlign = "center";
      ctx.fillText("Sua alma se revela", W / 2, yRev + 28);
      ctx.textAlign = "left";
      yRev += 38;
      fonte("italic 500", 19); ctx.fillStyle = PALETA.suave; ctx.textAlign = "center";
      linhasSub.forEach((ln, i) => ctx.fillText(ln, W / 2, yRev + 22 + i * 27));
      ctx.textAlign = "left";
      yRev += linhasSub.length * 27 + 16;
      cartoes.forEach((c, i) => {
        const selecionado = i === reg.indiceAlma;
        const cx = xInterno + margemRev, larguraCartao = larguraRev - margemRev * 2;
        if (selecionado) {
          const g = ctx.createLinearGradient(cx, 0, cx + larguraCartao, 0);
          g.addColorStop(0, "rgba(36,48,216,.42)"); g.addColorStop(1, "rgba(44,43,52,.95)");
          retangulo(cx, yRev, larguraCartao, c.altura, PALETA.painel); retangulo(cx, yRev, larguraCartao, c.altura, g, "#4b57ff", 1);
        } else retangulo(cx, yRev, larguraCartao, c.altura, PALETA.painel, PALETA.fino, 1);
        fonte("700", 22); ctx.fillStyle = PALETA.osso2;
        let nx = cx + 20;
        if (selecionado) { losango(nx + 6, yRev + 14 + 9, 7, "#7f89ff"); nx += 22; }
        espacado(c.alma.nome.toUpperCase(), nx, yRev + 14 + 17, 1.8, "left");
        fonte("italic 500", 19); ctx.fillStyle = selecionado ? "#bdb9ca" : "#aaa6b6";
        c.linhasNota.forEach((ln, k) => ctx.fillText(ln, cx + 20, yRev + 14 + 24 + 6 + 20 + k * 26 - 2));
        yRev += c.altura + 12;
      });
      y += total + 34;
    }

    // ---- cor
    {
      const perg = PERGUNTAS.cor;
      barra(perg);
      const larguraLateral = 200, larguraGrade = larguraInterna - 32 - larguraLateral - 20;
      const colunas = 5, espaco = 10, lado = Math.min(70, (larguraGrade - espaco * (colunas - 1)) / colunas);
      const qtdLinhas = 2;
      const alturaGrade = qtdLinhas * lado + espaco;
      const h = Math.max(alturaGrade, 190) + 32;
      caixaCorpo(h);
      CORES.forEach((c, i) => {
        const sx = xInterno + 16 + (i % colunas) * (lado + espaco);
        const sy = y + 16 + Math.floor(i / colunas) * (lado + espaco);
        retangulo(sx, sy, lado, lado, c.hex);
        ctx.lineWidth = 1; ctx.strokeStyle = PALETA.fino; ctx.strokeRect(sx - 2.5, sy - 2.5, lado + 5, lado + 5);
        if (!reg.cor.personalizada && c.hex === reg.cor.hex) {
          ctx.lineWidth = 2.5; ctx.strokeStyle = PALETA.osso2; ctx.strokeRect(sx - 4, sy - 4, lado + 8, lado + 8);
        }
      });
      if (reg.cor.personalizada) {
        fonte("italic 500", 17); ctx.fillStyle = PALETA.suave;
        ctx.fillText("outra cor escolhida: " + hexMaiusculo(reg.cor.hex), xInterno + 16, y + 16 + alturaGrade + 26);
      }
      // orbe
      const xOrbe = xInterno + larguraInterna - 16 - larguraLateral / 2, yOrbe = y + 16 + 62, raio = 56;
      ctx.save();
      ctx.shadowColor = misturar(reg.cor.hex, 0, [0, 0, 0]).replace("rgb", "rgba").replace(")", ",.55)");
      ctx.shadowBlur = 34;
      const gradOrbe = ctx.createRadialGradient(xOrbe - raio * 0.3, yOrbe - raio * 0.4, 2, xOrbe, yOrbe, raio);
      gradOrbe.addColorStop(0, misturar(reg.cor.hex, 0.6, [255, 255, 255]));
      gradOrbe.addColorStop(0.38, misturar(reg.cor.hex, 0, [0, 0, 0]));
      gradOrbe.addColorStop(1, misturar(reg.cor.hex, 0.6, [0, 0, 0]));
      ctx.fillStyle = gradOrbe; ctx.beginPath(); ctx.arc(xOrbe, yOrbe, raio, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      fonte("700", 14); ctx.fillStyle = PALETA.osso;
      espacado(reg.cor.nome.toUpperCase(), xOrbe, yOrbe + raio + 30, 2.6, "center");
      fonte("700", 18); ctx.fillStyle = PALETA.osso2;
      espacado(hexMaiusculo(reg.cor.hex), xOrbe, yOrbe + raio + 56, 3, "center");
      y += h;
      comentario(perg);
    }

    // ---- rodapé do conteúdo
    fonte("700", 13); ctx.fillStyle = "#6a667a";
    espacado("PERÍMETRO RPG · UNIVERSO REPLIKA", W / 2, y + 4, 4.2, "center");
    y += 18;
    fonte("italic 500", 16); ctx.fillStyle = "#5f5b70"; ctx.textAlign = "center";
    ctx.fillText("registro selado em " + carimbo(reg.salvoEm), W / 2, y + 14);
    ctx.textAlign = "left";
    y += 22;
    return y;
  }

  async function gerarImagem(reg) {
    const logo = await carregarRecursos();
    const W = 1200, topoMoldura = 100;

    // 1ª passada: só para medir a altura
    const medidor = document.createElement("canvas");
    medidor.width = W; medidor.height = 9000;
    const fim = pintar(medidor.getContext("2d"), W, topoMoldura, 0, reg, logo);
    const alturaMoldura = fim - topoMoldura + 26;
    const H = topoMoldura + alturaMoldura + 44 + 56;

    // 2ª passada: desenho final, em alta resolução
    const S = 2;
    const cv = document.createElement("canvas");
    cv.width = W * S; cv.height = H * S;
    const ctx = cv.getContext("2d");
    ctx.scale(S, S);
    pintar(ctx, W, topoMoldura, alturaMoldura, reg, logo);

    return new Promise((res, rej) => {
      cv.toBlob((b) => (b ? res(b) : rej(new Error("toBlob vazio"))), "image/png");
    });
  }

  /* ------------------------------------------------------------------
     DOWNLOADS
  ------------------------------------------------------------------ */
  function baixar(blob, name) {
    const url = URL.createObjectURL(blob);
    const a = criar("a");
    a.href = url; a.download = name;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  }
  const blobTxt = (reg) => new Blob(["﻿" + textoSimples(reg)], { type: "text/plain;charset=utf-8" });
  const nomeBase = (reg) => "registro-" + slug(reg.quem);

  /* ------------------------------------------------------------------
     REGISTRO FINAL (tela de resumo)
  ------------------------------------------------------------------ */
  const ficha = $("#ficha");
  const moldura = $("#moldura");
  const botaoSelar = $("#formulario .selo");
  let registro = null;
  let blobImagem = null;

  function montarFicha(reg) {
    const primeiro = reg.quem.split(/\s+/).slice(0, 6).join(" ");
    $("#fichaTitulo").textContent = primeiro.length > 48 ? primeiro.slice(0, 46) + "…" : primeiro;
    $("#fichaOrbe").style.setProperty("--cor", reg.cor.hex);
    $("#fichaAlmaNome").textContent = reg.alma;
    $("#fichaAlmaComentario").textContent = "“" + reg.comentarioAlma + "”";
    $("#fichaDetalhes").textContent = "Nascido em " + reg.nascimento + " · " + reg.cor.nome + " · " + hexMaiusculo(reg.cor.hex);

    const listaRespostas = $("#respostas");
    listaRespostas.textContent = "";
    CAMPOS_TEXTO.map((id) => [PERGUNTAS[id].romano + " · " + PERGUNTAS[id].rotulo, reg[id]]).forEach(([perg, a]) => {
      const d = criar("div");
      d.appendChild(criar("dt", null, perg + " /"));
      d.appendChild(criar("dd", null, a));
      listaRespostas.appendChild(d);
    });
  }

  formulario.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (botaoSelar.disabled || !validar()) return;

    const rotulo = botaoSelar.textContent;
    botaoSelar.disabled = true;
    botaoSelar.textContent = "Salvando…";

    registro = coletar();
    blobImagem = null;
    let printOk = true;
    try {
      blobImagem = await gerarImagem(registro);
    } catch (erro) {
      printOk = false;
      console.error("Não foi possível gerar o print:", erro);
    }

    // TXT primeiro, depois o print (alguns navegadores pedem permissão para baixar 2 arquivos)
    baixar(blobTxt(registro), nomeBase(registro) + ".txt");
    if (blobImagem) setTimeout(() => baixar(blobImagem, nomeBase(registro) + ".png"), 450);

    montarFicha(registro);
    formulario.hidden = true;
    $(".historia").hidden = true;
    ficha.hidden = false;
    $("#msgCopiar").textContent = printOk
      ? "Salvei o print (.png) e o arquivo de respostas (.txt) na sua pasta de downloads. Se o navegador pediu permissão para baixar vários arquivos, aceite."
      : "Salvei o arquivo de respostas (.txt), mas não consegui gerar o print.";
    botaoSelar.disabled = false;
    botaoSelar.textContent = rotulo;
    moldura.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  function voltarAoFormulario() {
    ficha.hidden = true;
    formulario.hidden = false;
    $(".historia").hidden = false;
    moldura.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  $("#btnEditar").addEventListener("click", voltarAoFormulario);
  $("#btnNovo").addEventListener("click", () => {
    formulario.reset();
    corEscolhida = null;
    orbe.style.removeProperty("--cor");
    nomeOrbe.textContent = "escolha uma cor";
    esconderAlmas();
    formulario.querySelectorAll(".painel").forEach(limparInvalido);
    registro = null; blobImagem = null;
    voltarAoFormulario();
  });

  $("#btnCopiar").addEventListener("click", async () => {
    if (!registro) return;
    const text = textoSimples(registro);
    const mensagem = $("#msgCopiar");
    try {
      await navigator.clipboard.writeText(text);
      mensagem.textContent = "Registro copiado.";
    } catch (_) {
      const areaTexto = criar("textarea");
      areaTexto.value = text;
      areaTexto.style.position = "fixed";
      areaTexto.style.opacity = "0";
      document.body.appendChild(areaTexto);
      areaTexto.select();
      let ok = false;
      try { ok = document.execCommand("copy"); } catch (__) { /* ignora */ }
      areaTexto.remove();
      mensagem.textContent = ok ? "Registro copiado." : "Não consegui copiar. Use o botão de baixar.";
    }
  });

  $("#btnBaixarTxt").addEventListener("click", () => {
    if (registro) baixar(blobTxt(registro), nomeBase(registro) + ".txt");
  });
  $("#btnBaixarPng").addEventListener("click", () => {
    if (registro && blobImagem) baixar(blobImagem, nomeBase(registro) + ".png");
    else $("#msgCopiar").textContent = "O print não está disponível. Volte, edite e sele o registro de novo.";
  });
})();
