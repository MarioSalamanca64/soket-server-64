//es una varioable global
//process.env.port es para crear el puerto automatico cuando lo desplegemos en un servidor
export const SERVER_PORT: number = Number(process.env.PORT) || 5000;