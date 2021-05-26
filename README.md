# Welkom bij de Dark souls matcher!

![Banner README](https://github.com/Rellor/project-tech/blob/main/static/img/githubimg/BannerREADME.png)

Wil je gemakkelijk matches zoeken tegen andere spelers? Dan is deze app perfect voor jou! Met de dark souls matcher kan je zoeken naar jouw ideale tegenstander. Je kan je tegenstander vinden op basis van level en bepaalde items die hij/zij gebruikt. Heb je een match gevonden? Perfect! Chat met je tegenstander en bespreek waar en wanneer. Als je gevecht klaar is kan je na afloop je tegenstander een like of dislike geven. Dit kan andere mensen eventueel waarschuwen voor dit persoon.

# Hoe gebruik je de app?

De app is te gebruiken via heroku met de link https://dark-souls-matcher.herokuapp.com/

# Locale installatie

### App klonen

Eerst moet je de repository klonen. Dit kan je doen door in de terminal `gh repo clone Rellor/project-tech` te zetten. Als je dat hebt gedaan moet je alle benodigde packages installeren via `npm install`

### Database connectie

Wanneer je daarmee klaar bent moet je nog de database opzetten. Voor de database gebruik ik Mongodb. Om de database op te zetten kan je de documentatie van Mongodb zelf gebruiken. Deze vind je hier https://docs.mongodb.com/manual/installation/

Als je je database opgezet hebt kan je een `.env` file maken. Deze file zet je dan in dezelfde locatie als je `server.js` file. In de .env moet je dan deze lijn zetten: 

```
MONGO_CONNECTION_URI = 
```

Dit is de connectie string die je krijgt als je op connect klikt bij je collection in mongodb.

### App starten

Wanneer je dit allemaal hebt gedaan kan je je applicatie starten door in je terminal `nodemon start` te zetten.

Als je dit allemaal gedaan hebt moet alles het doen! 

Wanneer er iets niet goed is gegaan kan je altijd contact met me opnemen zodat ik kan helpen.

# Licence

Binnen dit project maak ik gebruik van een [MIT licence](https://opensource.org/licenses/MIT)

# Mogelijk gemaakt door
Bas de Roller // Basderoller@gmail.com
