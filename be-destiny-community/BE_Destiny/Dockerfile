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