#
# BUILD STAGE
#
FROM maven:latest AS build
COPY src /usr/src/app/src  
COPY pom.xml /usr/src/app  
RUN mvn -f /usr/src/app/pom.xml clean install package

#
# PACKAGE STAGE
#
FROM openjdk:latest
COPY --from=build /usr/src/app/target/seekretsanta-backend-0.0.1-SNAPSHOT.jar /usr/app/seekretsanta-backend-0.0.1-SNAPSHOT.jar
ENV SPRING_PROFILES_ACTIVE=docker
EXPOSE 8080
CMD ["java","-jar","/usr/app/seekretsanta-backend-0.0.1-SNAPSHOT.jar"]
