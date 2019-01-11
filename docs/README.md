# HS Deck Builder

## Overview
This API is designed to enable users to store and access information about Hearthstone cards into decks.
It allows users to create accounts to login and logout of which are provisioned using jwt tokens.
HS Deck Builder follows RESTful architecture and allows decks to be CRUDed using info from omgvamp's Hearthstone API.

## Examples

Create a deck:
https://sleepy-beyond-72468.herokuapp.com/user/deck

View a deck:
https://sleepy-beyond-72468.herokuapp.com/user/deck/:id

Add and Remove Card from deck:
https://sleepy-beyond-72468.herokuapp.com/user/deck/:id/card/:cardName

Delete a deck:
https://sleepy-beyond-72468.herokuapp.com/user/deck/:id

## Powered By
Application:
- Node.js
- Mongo DB
- Heroku

External API:
- http://hearthstoneapi.com/

Authentication and Authorization:
- JSON Webtokens
