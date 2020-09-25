<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

### NestJs starter

##### configuration
- clone
```
git clone
```
- cd to this directory
````shell script
cd nest-starter
````
- if you have not installed sequelize-cli yet 
````shell script
npm i -g sequelize-cli
````
- install packages
````shell script
npm install
````
- configure env, fill in all the blanks accordingly
````shell script
mv .env.example .env
````
- do migrations
````shell script
sequelize db:migrate
````
- run seeds
````shell script
sequelize db:seed:all
````
- run the app
````shell script
npm run dev:start
````
