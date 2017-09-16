# [Multipleth](https://multipleth.herokuapp.com) #

<img src="https://i.imgur.com/izvcH4Y.png" style="height: 300px; width: 400px"/>

Multipleth is a data visualization tool for viewing various sets U.S. Census data.
Data tables include Statewide and Countywide datasets for the following: 
* Unemployment Rate 
* Population and Population by race (White, Black, Latino, Asian)
* Median Income
* Median Age
* Bachelor Degree Attainment Rate
* Median Purchase Cost for homes
* Median Rent Cost for homes
* Violet Crimes per 100k People
* 2016 Election Results

## What can I use this for? ##

This project was initially created the solve the problem of: "I want to move 
somewhere else, but I have no idea where (In the US)." Multipleth solves this problem 
by giving users a way to view the most relevant factors in choosing a place to live.

It can also be used to find something interesting about the US. Try out population
by race or the 2016 Election, I found those the most enlightening.


## Multipleth API ## 

Multipleth also provides access to all of its data through a consumable API.
Documentation can be found [here.](https://github.com/kylerogers334/multipleth/blob/master/API.md)

## Usage ##
The live version can be found [here.](https://multipleth.herokuapp.com)

For local deployment: 

`git clone https://github.com/kylerogers334/multipleth.git`

`npm install`

You will need to setup a local Postgres database, and seed it with all of 
[these](https://github.com/kylerogers334/multipleth/tree/master/server/sql) files.

The server requires environment variables to find the database's location.

`export DATABASE_URL='your_local_database_url'`

`export PORT=3000`

Lastly run the app by using:

`npm run dev`

Tests can be run with `npm run test`.

The linter can be run with `npm run lint`.

## Tech Stack ##

I wrote a [Medium post](https://medium.com/@kylerogers334/things-i-learned-making-my-first-d3-react-redux-app-called-multipleth-c0bfc088093c) 
outlining the design choices, challenges, and learning experiences.

The main tech used: 

* React + Redux
* D3
* Express
* Postgres
* Webpack (custom build)

Minor tech used:
* TopoJSON
* reactstrap 
* Mocha + Chai + Jest