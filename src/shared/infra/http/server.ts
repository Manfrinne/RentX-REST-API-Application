import { app } from "./app";

// Quando eu separo o servido o arquivo app, eu consigo isolar os dois
// serviços, isto é, eu posso rodar o arquivo app sem necessariamente
// startar o servidor na porta 3333. Vamos precisar disso c/ "supertest".
app.listen(3333, () => console.log("🔥Server is burning!🔥"));
