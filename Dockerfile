# Use a lightweight Eclipse Temurin JDK 17 image
FROM eclipse-temurin:17-jre-alpine

# Set working directory inside the container
WORKDIR /app

# Copy the built JAR into the container (ensure target/*.jar matches your version)
COPY target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]