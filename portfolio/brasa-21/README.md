# Brasa 21 🍔🔥

Site responsivo de uma **hamburgueria fictícia**, criado como projeto demonstrativo de portfólio.

> **Importante:** Brasa 21 não representa um estabelecimento real. Nome, endereço, telefone, produtos, preços, horários e demais informações são fictícios e existem apenas para demonstração.

## Objetivo

Demonstrar uma solução de delivery mais interativa do que uma landing page tradicional. Além da apresentação da marca, o projeto possui cardápio dinâmico, filtros, carrinho persistente e fechamento de pedido via WhatsApp.

## Funcionalidades

- Layout responsivo para desktop, tablet e celular;
- Identidade visual própria;
- Cardápio renderizado via JavaScript;
- Filtros por categoria;
- Carrinho lateral;
- Controle de quantidade de itens;
- Remoção de produtos;
- Persistência do carrinho com `localStorage`;
- Opção entre retirada e entrega;
- Campo de endereço obrigatório apenas para entrega;
- Taxa de entrega calculada automaticamente;
- Cálculo de subtotal e total;
- Formulário com nome, pagamento e observação;
- Geração automática da mensagem completa de pedido para WhatsApp;
- Indicador demonstrativo de loja aberta/fechada de acordo com o horário do navegador;
- Animações com `IntersectionObserver`;
- Respeito a `prefers-reduced-motion`;
- Ilustrações SVG próprias.

## Tecnologias

- HTML5
- CSS3
- JavaScript Vanilla
- LocalStorage
- SVG
- Google Fonts

Não há framework nem etapa de build.

## Estrutura

```text
brasa-21/
├── assets/
│   ├── burger.svg
│   └── logo.svg
├── index.html
├── script.js
├── styles.css
└── README.md
```

## Como executar

Abra `index.html` diretamente no navegador ou, dentro da pasta, execute:

```bash
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Personalização para cliente real

### WhatsApp

No início de `script.js`, altere:

```js
const WHATSAPP_NUMBER = '5521000000000';
```

Use DDI + DDD + número, sem espaços ou símbolos.

### Taxa de entrega

Altere:

```js
const DELIVERY_FEE = 6;
```

### Cardápio

Os itens ficam no array `menu` em `script.js`. Cada produto possui nome, categoria, preço, descrição, tag e elemento visual.

### Horário

A função `setStoreStatus()` contém a regra demonstrativa de funcionamento. Em produção, ela pode ser adaptada para horários reais ou substituída por uma API/backend.

## Decisões de UX

- Carrinho lateral evita tirar o usuário do cardápio;
- Filtros reduzem a quantidade de informação exibida de uma vez;
- Dados do carrinho permanecem salvos após atualizar a página;
- Campos de checkout aparecem conforme a modalidade escolhida;
- WhatsApp oferece um MVP simples para negócios que ainda não precisam de backend de pedidos.

## Evoluções possíveis

- Backend e banco de dados;
- Painel administrativo;
- Controle de estoque;
- Cupons;
- Cálculo de frete por CEP ou distância;
- Pagamento online;
- Login de clientes;
- Histórico e status de pedidos;
- Integração com impressão de cozinha;
- PWA.

## Autor

Desenvolvido por **Juan Gabriel** como projeto de portfólio.

GitHub: [Juan01304](https://github.com/Juan01304)
