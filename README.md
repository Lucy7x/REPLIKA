<div align="center">

# REPLIKA

### Registro de Almas
*Perímetro RPG · Nascimento de uma Alma · Nascimento de um Deus*

◆ ─────────────── ◆

</div>

> *Toda pessoa nasce com uma alma designada, uma essência que a acompanha desde o primeiro instante
> de sua existência.*

## A proposta

Antes de existir uma ficha, existe uma alma. O **Registro de Almas** é o ritual que abre a campanha:
um formulário em que cada jogador entrega o que o personagem é, antes que o mundo comece a decidir por ele.

Ninguém aqui preenche atributos. As perguntas não pedem números, pedem **verdades**. Cada uma vem
acompanhada de um comentário de uma voz que ninguém vê, como se o próprio registro observasse as respostas.

**O que o registro pergunta**

- **Quem você é**, e o que você quer, de verdade.
- **O que nunca faria**, exceto em situações extremas.
- **Do que tem medo**, o que lamenta, quem deixou para trás.
- **O que faria por poder**, porque toda glória tem um preço.
- **Como acha que vai morrer**, porque quase todos têm um palpite.

**A data e a alma**

A data de nascimento do personagem decide muito. O mês em que ele nasceu revela duas ou três almas
possíveis, entre as 28 que existem. Só **uma** pode ser a dele, e a escolha é de quem preenche:
a alma radiante ou a corrompida, a infinita ou a bestial, a pastora ou a submissa.
Cada alma carrega um comentário, um sussurro sobre o que ela faz com quem a carrega.

**A cor da alma**

Por fim, o jogador dá uma cor à própria alma, entre dez tons ou uma cor livre. O código HEX fica
gravado no registro.

**O selo**

Ao selar o registro, o formulário vira um **print** do que foi dito e um **arquivo de texto** com as
respostas. É o que o jogador leva para a mesa e o que o mestre guarda. Depois de selado, uma alma
já nasceu, e o que acontece com ela é com a campanha.

<div align="center">

◆ ─────────────── ◆

</div>

# Sobre o projeto

Site estático (HTML, CSS e JavaScript puro) que implementa o Registro de Almas. Roda inteiro no
navegador, sem servidor, banco de dados nem envio de dados para fora.

## Como usar

1. Abra o arquivo `index.html` em qualquer navegador moderno (Chrome, Edge, Firefox, Safari).
2. Preencha as perguntas, a data de nascimento e escolha a alma e a cor.
3. Clique em **Selar registro**. O navegador baixa:
   - `registro-<nome>.png`: print do formulário inteiro, já preenchido;
   - `registro-<nome>.txt`: respostas, alma escolhida e a cor com o código HEX.
4. Na tela de resumo também é possível copiar o registro, baixar os arquivos de novo, voltar e editar ou começar um novo.

Se o navegador perguntar se permite baixar vários arquivos, aceite.

> As fontes (Cormorant Garamond e UnifrakturCook) vêm do Google Fonts. Sem internet o site continua
> funcionando, mas com fontes de reserva, e o print também sai com elas.

## Estrutura

```
registro-de-almas/
├── index.html           página e formulário
├── styles/
│   ├── estilo.css       todo o visual (tema escuro, faixas, moldura, painéis)
│   └── logo.png         logo da Replika (versão clara)
└── js/
    ├── formulario.js    lógica do formulário, validação, print e .txt
    └── logo-dados.js    a mesma logo em base64, usada para desenhar o print
```

`logo-dados.js` existe porque o print é desenhado num canvas, e o navegador bloqueia imagens
carregadas de arquivos locais nesse caso. Se trocar `logo.png`, gere de novo o base64 e atualize
`window.LOGO_DADOS`.

## Como funciona

- **Data de nascimento:** o mês da data define quais almas aparecem (duas ou três). A pessoa deve
  escolher exatamente uma. Mudar o dia dentro do mesmo mês mantém a escolha; mudar de mês zera.
- **Cor da alma:** dez cores prontas ou uma cor livre. O código HEX aparece no resumo, no print e no `.txt`.
- **Print:** desenhado direto num canvas (sem bibliotecas), em duas passadas: uma para medir a
  altura e outra para desenhar em alta resolução.
- **Validação:** todas as perguntas são obrigatórias. Campos vazios ficam marcados e a página rola até o primeiro.

## Como editar o conteúdo

Tudo fica no início de `js/formulario.js`:

| O que mudar | Onde |
|---|---|
| Almas de cada mês e seus comentários | lista `ALMAS` (uma entrada por mês, de janeiro a dezembro) |
| Cores disponíveis | lista `CORES` (`nome` e `hex`) |
| Títulos, numeração e comentários das perguntas | objeto `PERGUNTAS` |
| Ordem das perguntas de texto | lista `CAMPOS_TEXTO` |
| Frases das faixas animadas | lista `FRASES_FAIXA` |

Para **adicionar uma pergunta de texto**:

1. No `index.html`, copie um painel existente (por exemplo `p-medo`) e troque `id`, `name`, `for`, o número romano, o título e o comentário.
2. Em `js/formulario.js`, inclua a pergunta em `PERGUNTAS` e o `id` em `CAMPOS_TEXTO`.

O print, o `.txt`, a validação e a tela de resumo passam a incluir a nova pergunta sozinhos.
Se a pergunta ficar depois de "Quando você nasceu", ajuste também os números romanos das últimas.

O texto de abertura sobre as almas está no `index.html`, dentro de `<section class="historia">`.
O visual (cores, fontes, espaçamentos) está nas variáveis do início de `styles/estilo.css`.

## Convenções do código

Nomes de classes, ids, variáveis e funções estão em português (`.painel`, `#nascimento`,
`mostrarAlmas()`, `validar()`, `gerarImagem()`). Só o que é fixo do navegador ou do HTML,
como `class`, `input`, `document` e `addEventListener`, permanece em inglês.

## Limitações

- O print é gerado quando o registro é selado. Se o jogador voltar e editar, é preciso selar de novo.
- O seletor de data usa o calendário do próprio navegador, então o visual dele varia entre navegadores.
