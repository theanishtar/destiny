FROM maven:3.9.2-eclipse-temurin-17-alpine as build

# COPY ./src src/
# COPY ./pom.xml pom.xml
COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre-alpine
COPY --from=build ../target/demo-1.0.jar demo.jar
EXPOSE 8080
ARG REDIS_HOST
ARG REDIS_PORT
CMD ["java","-jar","./demo.jar"]


# webrtc
## Build stage
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline

COPY src/ /app/src/
RUN mvn clean package -DskipTests

# Step : Package image
FROM openjdk:11-jdk-slim
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080 8000
ENTRYPOINT ["java", "-jar" , "app.jar"]