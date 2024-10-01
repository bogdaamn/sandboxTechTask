In order to start application follow these steps: 
1. mvn clean install
2. Open docker-compose.yaml in the root folder and start a container. 
3. In startup configuration for the application specify "local" profile. (Edit configurations -> Active profiles -> local)
4. Start the spring boot application. Liquibase scripts will automatically create table and populate test data. Backend started
5. In order to start frontend open terminal and navigate to the folder in root package with the name employee-frontend(SandboxTechTask -> employee-frontend)
6. In terminal firstly type - npm install , then - npm start - in order to start the frontend part. The frontend will be up on port localhost:3000.
------------------------------------------------------------------------------------------------
For frontend interface and backend logic explanation please read README.md in documentation folder. 