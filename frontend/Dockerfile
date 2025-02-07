# Use Nginx to serve the frontend
FROM nginx:alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default Nginx files
RUN rm -rf /usr/share/nginx/html/*

# Copy frontend files (ensure the 'dist' folder exists in frontend build)
COPY ./dist /usr/share/nginx/html

# Expose the correct port for Cloud Run
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
