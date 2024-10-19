# Table of contents:
- [Table of contents:](#table-of-contents)
  - [Introduction ](#introduction-)
  - [Installation ](#installation-)
  - [Execution ](#execution-)

## Introduction <a name="introduction"></a>

`restaurant-api-proxy` is a a [Yelp GraphQL proxy](https://docs.developer.yelp.com/docs/graphql-intro).

## Installation <a name="installation"></a>

Install the dependencies:

```
$ npm install
```

## Execution <a name="execution"></a>

To start the Graphql server:

```
$ npm run build
$ npm run start
```

The GraphQL Server will be running on http://localhost:3001/graphql. Use the playground to explore and try out the available queries.

❗Important: you need to generate an API key and include it as a Bearer token at the HTTP header of your requests. Example:

```
curl 'http://localhost:3001/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3001' -H 'Authorization: Bearer YOUR_TOKEN_GOES_HERE' --data-binary '{"query":"query {\n  searchBusinesses(term: \"hamburger\", location: \"San Francisco, CA\", offset: 0, limit: 5) {\n    total\n    businesses {\n      id\n      name\n      location {\n        address1\n        city\n        state\n        postal_code\n      }\n    }\n  }\n}\n"}' --compressed
```

Sample response:

```
{
  "data": {
    "searchBusinesses": {
      "total": 4164,
      "businesses": [
        {
          "id": "AonBwLuprSoZ1dx9iYaDBw",
          "name": "Native Burger",
          "location": {
            "address1": "3420 Geary Blvd",
            "city": "San Francisco",
            "state": "CA",
            "postal_code": "94118"
          }
        },
        {
          "id": "YwhwhVHDOgci8uyZMcsy8A",
          "name": "Maillards Smash Burgers",
          "location": {
            "address1": "1994 37th Ave",
            "city": "San Francisco",
            "state": "CA",
            "postal_code": "94116"
          }
        },
        {
          "id": "ozlI8JnsCs4meAh_ZsvUbg",
          "name": "The Barn",
          "location": {
            "address1": "3068 N Cabrillo Hwy",
            "city": "Half Moon Bay",
            "state": "CA",
            "postal_code": "94019"
          }
        },
        {
          "id": "hXeusGZQvH5oMxaR6XgYwA",
          "name": "Super Duper Burgers",
          "location": {
            "address1": "2304 Market St",
            "city": "San Francisco",
            "state": "CA",
            "postal_code": "94114"
          }
        },
        {
          "id": "KnZsWEZfYwoSvITVWe2apA",
          "name": "SHMASH’D Burgers",
          "location": {
            "address1": null,
            "city": "Pacifica",
            "state": "CA",
            "postal_code": "94044"
          }
        }
      ]
    }
  }
}
```