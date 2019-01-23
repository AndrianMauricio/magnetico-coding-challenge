# Magnetico Coding Challenge

Follow the next steps in order to run the application:

1. Add an `.env` file in the `client` folder with the key-value `SKIP_PREFLIGHT_CHECK=true`. Otherwise, the React won't build.

2. Download and install MongoDB from https://www.mongodb.com/download-center/community

3. Add your `<mongodb installation dir>/bin` to the **PATH** environment variable. For example `C:\Program Files\MongoDB\Server\4.0\bin`.

4. In order to run the finished application, go to the `client` folder, and execute `yarn run build` inside the `client` folder. Otherwise, execute `yarn start`.

5. Run `mongod` and `yarn run dev` in different consoles.

6. Navigate to http://localhost:9000/ if you're running the finished application. Other wise go to http://localhost:3000/.
