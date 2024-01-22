# Dockerfile
FROM nginx:alpine

# Set the working directory to the default Nginx web server directory
WORKDIR /usr/share/nginx/html

# Copy HTML files
COPY ./*.html ./

# Copy CSS, image, and JS directories
COPY ./css/ ./css/
COPY ./image/ ./image/
COPY ./js/ ./js/

# Expose the default Nginx port
EXPOSE 80