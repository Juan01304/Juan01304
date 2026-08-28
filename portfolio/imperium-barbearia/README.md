# Imperium Barbearia ✂️

Landing page responsiva para uma **barbearia premium fictícia**, desenvolvida como projeto demonstrativo de portfólio.

> **Importante:** este projeto não representa um estabelecimento real. Nome, preços, equipe, avaliações, endereço e telefone são fictícios e existem apenas para demonstrar uma solução comercial completa.

## Objetivo do projeto

Mostrar, de forma prática, como um site para negócio local pode combinar **identidade visual, experiência do usuário e conversão**. A página foi estruturada para apresentar serviços, equipe, avaliações, horários e conduzir o visitante até um pedido de agendamento via WhatsApp.

## Funcionalidades

- Layout totalmente responsivo para desktop, tablet e celular;
- Menu mobile acessível;
- Seção hero com proposta de valor e CTAs;
- Tabela visual de serviços, duração e preços;
- Apresentação da experiência da barbearia;
- Cards de barbeiros e especialidades;
- Depoimentos e avaliação média;
- Formulário de agendamento;
- Geração automática de mensagem para WhatsApp;
- Botão para copiar a mensagem do agendamento;
- Data mínima do agendamento ajustada automaticamente para o dia atual;
- Animações de entrada com `IntersectionObserver`;
- Tratamento de `prefers-reduced-motion` para acessibilidade;
- SVGs próprios para logo e ilustração, sem depender de banco de imagens.

## Tecnologias

- HTML5 semântico
- CSS3
- JavaScript Vanilla
- Google Fonts
- SVG

Não há framework, biblioteca de UI ou etapa de build. Basta abrir o `index.html` no navegador.

## Estrutura

```text
imperium-barbearia/
├── assets/
│   ├── barber-chair.svg
│   └── logo.svg
├── index.html
├── script.js
├── styles.css
└── README.md
```

## Como executar localmente

Abra `index.html` no navegador ou rode `python -m http.server 8000` dentro da pasta.

## Personalização para um cliente real

### WhatsApp
No arquivo `script.js`, troque `const WHATSAPP_NUMBER = "5521000000000";` pelo telefone real no formato DDI + DDD + número.

### Serviços, equipe e endereço
Edite as respectivas seções do `index.html` e mantenha as opções do formulário sincronizadas.

### Cores
A paleta principal está centralizada nas variáveis `:root` no início de `styles.css`.

## Decisões de UX

- CTA de agendamento recorrente para reduzir distância entre interesse e conversão;
- Formulário sem backend, adequado a uma primeira versão de negócio local;
- HTML/CSS/JS e SVG para manter carregamento leve;
- Elementos semânticos, foco visível e suporte a `prefers-reduced-motion`.

## Próximas evoluções possíveis

- Agenda real e bloqueio de horários;
- Área administrativa;
- Banco de dados de clientes e agendamentos;
- Pagamento/sinal online;
- Galeria real de cortes;
- Integração com Google Maps;
- SEO local com Schema.org;
- PWA.

## Autor

Desenvolvido por **Juan Gabriel** como projeto de portfólio.

GitHub: [Juan01304](https://github.com/Juan01304)
