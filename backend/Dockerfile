FROM maven:3.9.11-eclipse-temurin-25-alpine@sha256:68e1589d77f6907e44a5884898a2ce5f8aa4e4e73fcec167f8c953d6a0f6e8bd AS build
COPY src /usr/src/app/src  
COPY pom.xml /usr/src/app  
RUN mvn -f /usr/src/app/pom.xml clean install package

FROM openjdk:26-slim-trixie@sha256:c8597888f3558775e454041acfa7a349b6bfae1c7f3895ab2fb790af4b556c18
COPY --from=build /usr/src/app/target/seekretsanta-backend-0.0.1-SNAPSHOT.jar /usr/app/seekretsanta-backend-0.0.1-SNAPSHOT.jar
ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE 8080
CMD ["java","-jar","/usr/app/seekretsanta-backend-0.0.1-SNAPSHOT.jar"]
