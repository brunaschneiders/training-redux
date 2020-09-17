export default {
  secret: process.env.PRIVATE_TOKEN,
  // é a nossa assinatura(da aplicação) para o token variável de ambiente
  expiresIn: '1d',
  // o token terá um dia de vida (1d)
};
