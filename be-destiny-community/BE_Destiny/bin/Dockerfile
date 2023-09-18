# #
# # Build stage
# #
# FROM maven:3.8.2-jdk-11 AS builder
# COPY . .
# RUN mvn clean package -Pprod -DskipTests

# #
# # Package stage
# #
# FROM openjdk:11-jdk-slim
# COPY --from=build /target/*.war demo.war
# # ENV PORT=8080
# EXPOSE 8080
# ENTRYPOINT ["java","-jar","./demo.war"]

FROM maven:3.9.2-eclipse-temurin-11-alpine as builder

# COPY ./src src/
# COPY ./pom.xml pom.xml
COPY . .

RUN mvn clean package -DskipTests

FROM eclipse-temurin:11-jre-alpine
COPY --from=builder target/demo-0.0.1-SNAPSHOT.war demo.war
EXPOSE 8080
CMD ["java","-jar","./demo.war"]