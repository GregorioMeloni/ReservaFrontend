# Etapa de compilación
FROM node:20 as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build --prod

# Etapa de producción
FROM nginx:latest

# Eliminar los archivos existentes en la carpeta html
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos estáticos de la etapa de compilación al directorio de Nginx
COPY --from=build /app/dist/desarrollo-web-reserva usr/share/nginx/html

# Exponer el puerto 80 para acceder a la aplicación desde el host
EXPOSE 80

# Iniciar el servidor Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]
