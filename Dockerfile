# Utiliza una imagen liviana de NGINX
FROM nginx:alpine

# Elimina los archivos por defecto del nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia el contenido del build Angular al directorio de NGINX
COPY dist/ibrsg-frontend-core/browser /usr/share/nginx/html

# Copia configuración personalizada de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto en el que escuchará nginx (80)
EXPOSE 80

# Comando para mantener nginx corriendo
CMD ["nginx", "-g", "daemon off;"]