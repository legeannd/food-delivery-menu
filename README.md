<p align="center">
  <img src="public/icons/logo.svg" width="200"/>
</p>

# [Food Delivery Menu](https://food-delivery-menu.vercel.app/)

![stacks](https://img.shields.io/badge/React-v19.0.0-brightgreen) ![stacks](https://img.shields.io/badge/Next.js-v15.3.2-brightgreen) ![stacks](https://img.shields.io/badge/TanStack%20Query-v5.75.5-brightgreen) ![stacks](https://img.shields.io/badge/TailwindCSS-v4-brightgreen) ![stacks](https://img.shields.io/badge/Stack-Typescript-blue) ![GitHub](https://img.shields.io/github/license/legeannd/food-delivery-menu)

<p align="center">
  <img height="600" src="public/docs/web.gif"/>
</p>

- [Content (en-US)](#section-en_us)
- [Conteúdo (pt-BR)](#secao-pt_br)

---

## About the project <a id="section-en_us"></a>

This is a food delivery application that allows users to browse restaurants, view their menus, customize dishes with options, and place orders. The app includes features like filtering restaurants by name, selecting dish options, and reviewing items in the cart before checkout.

## Content

- [Techs](#techs)
- [How to execute the project](#how-to-run)
  - [Installation - Front-end (Web)](#build-front)
  - [Installation - Back-end (Web)](#build-back)

## Techs <a id="techs"></a>

- [x] React
- [x] Next.js
- [x] TypeScript
- [x] TanStack Query
- [x] Tailwind CSS

## How to execute the project <a id="how-to-run"></a>

To execute the project, you'll need to have Node and PNPM or Yarn installed to set up all the dependencies.

### Installation - Front-end (Web) <a id="build-front"></a>

In the project root folder:

```bash
pnpm install
pnpm run dev
```

If you are using Yarn, use this:

```bash
yarn install
yarn dev
```

### Installation - Back-end (Web) <a id="build-back"></a>

Create a new .env file and update it as in the .env.example with the value of the localhost url and port.
To change the port (default: 3001), go to `package.json` and change the --port flag in the `local-server` script
After this, you can run the local mocked server:

```bash
pnpm run local-server
```

Or:

```bash
yarn local-server
```

<!-- Remember to create a .env file to put the environment variables exemplified in the .env.example file with your personal data. -->

After finishing the installation, the web page will open in your browser.

---

## Sobre o projeto <a id="secao-pt_br"></a>

Este é um aplicativo de delivery de comida que permite aos usuários navegar por restaurantes, visualizar seus menus, personalizar pratos com opções e realizar pedidos. O app inclui funcionalidades como filtrar restaurantes por nome, selecionar opções de pratos e revisar itens no carrinho antes de finalizar o pedido.

## Conteúdo

- [Tecnologias](#tecnologias)
- [Como executar o projeto](#como-executar)
  - [Instalação - Front-end (Web)](#instalacao-front)
  - [Instalação - Back-end (Web)](#instalacao-back)

## Tecnologias <a id="tecnologias"></a>

- [x] React
- [x] Next.js
- [x] TypeScript
- [x] TanStack Query
- [x] Tailwind CSS

## Como executar o projeto <a id="como-executar"></a>

Para executar o projeto, você precisará ter o Node e o PNPM ou Yarn instalados para configurar todas as dependências.

### Instalação - Front-end (Web) <a id="instalacao-front"></a>

Na pasta raiz do projeto:

```bash
pnpm install
pnpm run dev
```

If you are using Yarn, use this:

```bash
yarn install
yarn dev
```

### Installation - Back-end (Web) <a id="build-back"></a>

Crie um novo arquivo .env e atualize-o conforme o .env.example com o valor da URL e porta do localhost.
Para alterar a porta (padrão: 3001), vá até o arquivo `package.json` e modifique a flag --port no script `local-server`.
Após isso, você pode rodar o servidor local simulado:

```bash
pnpm run local-server
```

Ou:

```bash
yarn local-server
```

<!-- Lembre-se de criar um arquivo .env para colocar as variáveis de ambiente exemplificadas no arquivo .env.example com os seus dados pessoais. -->

Após finalizar a instalação, a página web será aberta no seu navegador.
