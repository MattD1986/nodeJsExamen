eind-assignment-examen-datum-13-01-MattD1986 created by GitHub Classroom


Link live versie:  tba
LINK LIVE VERSION
-
tba


API documentatie

API DOCUMENTATION
-
Users:
-
POST: http://localhost:3000/api/users

> info: administrator and moderator are default false
  body:
> body:
  {
    "username": "username",
    "email": "mail@mail.com",
    "password": "username/1234",
    "username": "username (4-20 characters)",
    "email": "mail@mail.com (email validation)",
    "password": "username/1234 (min 8 characters)",
    "administrator": false,
    "moderator": false
  }
GET: http://localhost:3000/api/users/me

> info: returns information about the authenticated user
> header info: x-auth-token needed

Authors:
-
POST: http://localhost:3000/api/authors

> info: post a author object to DB, returns the created object as response
> header info: x-auth-token needed / user must be moderator or administrator
> body:
  {
    "name":"authorName",
    "dateOfBirth":"birthday"
}
GET: http://localhost:3000/api/authors

> info: returns a JSON with all authors and their information
GET: http://localhost:3000/api/authors/:id

> info: returns the information of the author with the specified Id
PUT: http://localhost:3000/api/authors/:id

> info: updates the information of the author with the specified Id, returns the updated object as response
> header info: x-auth-token needed / user must be moderator or administrator
> body:
  {
    "name":"authorName",
    "dateOfBirth":"birthday"
  }
DELETE: http://localhost:3000/api/authors/:id

> info: deletes the specified author from the DB, returns the deleted object as response
> header info: x-auth-token needed / user must be administrator

Series:
-
POST: http://localhost:3000/api/series

> info: post a author object to DB, returns the created object as response
> header info: x-auth-token needed / user must be moderator or administrator
> body:
  {
    "name":"nameSeries",
    "yearPublished":"yearPublished(4digits)",
    "authorId":"objectId"
  }
GET: http://localhost:3000/api/series

> info: returns a JSON with all series and their complete information
GET: http://localhost:3000/api/series/:id

> info: returns the complete information of the series with the specified Id
GET: http://localhost:3000/api/series/name/:name
> info: returns the series and authors name of the specified serie name
GET: http://localhost:3000/api/series/author/:name

> info: returns all the series with the specified author name
PUT: http://localhost:3000/api/series/:id

> info: updates the information of the series with the specified Id, returns the updated object as response
> header info: x-auth-token needed / user must be moderator or administrator
> body:
  {
    "name":"nameSeries",
    "yearPublished":"yearPublished(4digits)",
    "authorId":"objectId"
  }
  
DELETE: http://localhost:3000/api/series/:id

> info: deletes the specified series from the DB, returns the deleted object as response
> header info: x-auth-token needed / user must be administrator

Comics:
-
POST: http://localhost:3000/api/comics

> info: post a comic object to DB, returns the created object as response
> header info: x-auth-token needed / user must be moderator or administrator
> body:
{
  "title":"title of the comic",
  "number": number of the comic,
  "shortDescription":"text / if no description provided, a message will be generated",
  "seriesId":"objectId",
  "authorId":"objectId",
  "publisher":"name publisher"
}
GET: http://localhost:3000/api/comics

> info: returns a JSON with all comics and their complete information
GET: http://localhost:3000/api/comics/:id

> info: returns the complete information of the comic with the specified Id
GET: http://localhost:3000/api/comics/title/:title
> info: returns the number, title, shortDescription, publisher en series name of the specified title
GET: http://localhost:3000/api/comics/series/:name

> info: returns all the comics (number and title), sorted by number, of the given series
GET: http://localhost:3000/api/comics/publisher/:name

> info: returns all the comics (number, title, series name), sorted by series name, of the given publisher
PUT: http://localhost:3000/api/comics/:id

> info: updates the information of the comic with the specified Id, returns the updated object as response
> header info: x-auth-token needed / user must be moderator or administrator
{
  "title":"title of the comic",
  "number": number of the comic,
  "shortDescription":"text / if no description provided, a message will be generated",
  "seriesId":"objectId",
  "authorId":"objectId",
  "publisher":"name publisher"
}

DELETE: http://localhost:3000/api/series/:id

> info: deletes the specified comic from the DB, returns the deleted object as response
> header info: x-auth-token needed / user must be administrator