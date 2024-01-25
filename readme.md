# Mentallyc

mentallyc is a platform for therapists to manage their clients and recordings data

## Used technologies:

    *React js
    *Tailwind css
    *Node js
    *Express js
    *SQL lite

## how it works

you have 4 pages

1.  Login : lets you login to a therapist account (every therapist have his own credentials , patients and recordings)
2.  Patient : lets you show the patients , you can add delete and modify them
3.  Record : lets you add new session by choosing the patient the date and lets you take notes and upload the recording audio either by drag and drop or by choosing from your system files
4.  Recordings : lets you see your recording and delete it

## live demo

    https://mentalyc-demo.netlify.app
    you can use username : admin & password : admin || username : test & password: psy2

## github repo

    https://github.com/Omar-bit/mentalyc

## how to install the project loacally

run this in the terminal and make sure you have git , node js installed
$ git clone https://github.com/Omar-bit/mentalyc
$ cd mentallyc
$ cd server
$ npm install
$ cd ..
$ cd client
$ npm install
// add .env file that contains VITE_BACKEND variable that contains the backend url

## how to run the project loacally

enter the client folder and run $ npm run dev
enter the server folder and run $ npm start
