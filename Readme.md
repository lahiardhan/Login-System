# Login System with Express JS

This login system was for server side application, styling layout with custom Bootstrap 5.
Feature : 
   - Sign Up
   - Login
   - Logout
   - Forgot Password

Reference : https://betterprogramming.pub/build-a-login-system-in-node-js-f1ba2abd19a

Required Package :
   - connect-flash
   - dotenv
   - express
   - express-session
   - mongoose
   - passport
   - passport-local
   - passport-local-mongoose

Folder Structure : 
LoginSystem
   -app
      -auth
      -users
   -config
      auth.js
      index.js
      passport.js
   -bin
      www
   -public
      -stylesheets
         style.css
   -views
      index.js
   app.js
   package-lock.json
   package.json

Alur :
   1. buat folder project
   2. npm i express
   3. install view engine ejs (express --view=ejs)
   3. git init
   4. gitignore untuk node_modules/
   5. hapus folder tak terpakai (router/)
   6. buat folder ngehandle CRUD (app/)
   7. buat folder untuk integrasiin database (db/ dan config/)