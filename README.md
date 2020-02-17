# Semana OmniStack 10.0 da Rocketseat :rocket:

## :rocket: Tecnologias usadas
Este maravilhoso projeto foi desenvolvido com as seguintes tecnologias:

Utilização de API do Github e artifícios de localização com a utilização:
- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)

## :computer: Projeto

O DevRadar é um projeto que visa conectar desenvolvedores com clientes por meio da localidade, em um raio de 10km.

## :mortar_board: Quem ministrou?

A semana foi ministrada pelo Mestre Jedi [Diego Fernandes](https://github.com/diego3g)

## Como usar

<h1 align="center"><img align="center" alt="Frontend" src=".github/dev-radar-web.png" width="700"></img></h1>

### Instalação - Backend
Clone o projeto em seu computador. Configure o MongoDB e crie uma arquivo **.env** dentro da pasta  backend para configurar as variavel de ambiente.  

```bash
MONGO_URL: url de conexão com o mongo
PORT: porta para estartar o servidor 
<!-- REACT_APP_API_URL: url que vai acessar a api `cors` -->
```
Para instalar as dependências e executar o **Servidor** (modo desenvolvimento) execute:
```bash
cd backend
yarn
yarn dev
```

### Instalação - Web
 Crie uma arquivo **.env** dentro da pasta web para configurar as variavel de ambiente. 
  
 ```bash
REACT_APP_API_URL: url da api
```
Para iniciar o **Web** do React utilize os comandos:
```bash
cd web
yarn install
yarn start
```
Assim que o processo terminar, automaticamente será aberta no seu navegador a página `localhost:3000` contendo o Projeto desenvolvido.  

### Mobile

Resultado da aplicação mobile utilizando WebSockets:

<h1 align="center"><img align="center" alt="Mobile" src=".github/dev-radar-mobile.png" width="300" height="600"></img></h1>
<br>

Para ver a aplicação mobile com o React Native primeiro é necessário colocar o IP do seu servidor (ou computador) no arquivo `src/services/api.js`, e depois executar os comandos:
```bash
# NÃO é preciso executar a linha de baixo caso ja tenha o Expo (CLI) instalado
yarn global add install expo-cli
cd mobile
yarn install
yarn start
```
Assim que o processo terminar, automaticamente será aberta no seu navegador a página `localhost:19002`. Conecte seu emulador, ou teste o aplicativo por `LAN`: baixe o aplicativo *Expo* da Play Store ou App Store e em seguida escaneie o código QR.

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Feito com :purple_heart: by  Henrique Brites :wave:
