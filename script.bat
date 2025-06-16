@echo off
echo Setting up Instagram-like Project...

REM Create project root folder
mkdir posthub
cd insta-clone

REM --- Create Backend with Spring Boot ---
echo Creating backend project with Spring Boot...
mkdir backend
cd backend

REM Using curl to download Spring Boot initializer
curl -o backend.zip "https://start.spring.io/starter.zip?type=maven-project&language=java&bootVersion=3.2.5&baseDir=backend&groupId=com.insta.clone&artifactId=backend&name=InstaClone&description=Instagram+Clone+API&packageName=com.insta.clone&packaging=jar&javaVersion=17&dependencies=web,data-jpa,security,postgresql"

REM Unzip and clean up
tar -xf backend.zip




echo ✅ Project setup complete!
echo.
echo Open backend and frontend folders in your IDE to start working.
