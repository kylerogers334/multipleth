# Multipleth API Docs #

## Data Source ## 

All of the data (except for the 2016 election) is taken from the [U.S. Census Bureau FactFinder.](https://factfinder.census.gov/faces/nav/jsf/pages/index.xhtml)
The data it provides is in an awful format and requires significant manual manipulation
to consume easily (i.e. JSON). These docs detail easy retrieval of the Census Bureau data.

## Usage ##

GET endpoints are provided in the following format at https://multipleth.herokuapp.com
 
`/api/:category/:locale/:fips`

**:category** is one of: 

* unemployment
* population (for total population)
* white (for population by race)
* black
* latino
* asian
* income
* age
* education
* crime
* housing (for housing purchase cost)
* rent (for housing rental cost)
* crime
* election

**:locale** is either `state` (view data for all 50 states) or `county` (view all counties for 1 state)

**:fips** is ignored when :locate = state

If :locale is `county`, a Federal Information Processing Standard (FIPS) number is required.
These numbers can be found [here.](http://www.columbia.edu/~sue/state-fips.html)
Please note that leading zeroes are **required** (i.e. 01, 05).