# Use the official Coturn Docker image
FROM coturn/coturn

# Copy the Coturn configuration file into the container
COPY turnserver.conf /etc/turnserver.conf

# Set the environment variable to enable the Coturn server
ENV TURNSERVER_ENABLED=1

# Start the Coturn server with custom configuration
CMD ["turnserver", "-c", "/etc/turnserver.conf"]
