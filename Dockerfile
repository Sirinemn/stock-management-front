# Stage 1: Build the Angular application
FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --configuration=production

# Stage 2:  The final image, using Nginx to serve the built app
FROM nginx:lts-alpine
# Copy the built Angular app from the 'build' stage
COPY --from=build /app/dist/stock-management-front /usr/share/nginx/html

# Supprimer le fichier de configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Ajouter un fichier de config nginx (recommandé pour les routes Angular)
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]