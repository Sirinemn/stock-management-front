# Étape 1 : Build de l'application Angular
FROM node:lts-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --configuration=production

# Étape 2 : Serveur Nginx pour le front
FROM nginx:lts-alpine
# Copier les fichiers build dans le dossier nginx par défaut
COPY --from=build /app/dist/stock-management-front /usr/share/nginx/html

# Supprimer le fichier de configuration par défaut de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Ajouter un fichier de config nginx (optionnel, recommandé pour les routes Angular)
COPY nginx.conf /etc/nginx/conf.d

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
