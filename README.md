# IMDB Clone Backend

## Description
This is a Node project made with Express showcasing an IMDB clone backend. 
The website has two users : an anonymous user and an admin user.  
**Anonymous Users:** can view / sort / filter the movies  
**Admin Users:** have the functionality of anonymous users as well as they can create / update movies  
Project uses JWT tokens for authentication.

## Requirements
The project is tested on Node.js v12.18.1 (consider using nvm to upgrade / downgrade node) and npm v6.14.1

## Postman Collection
The postman collection for the API's can be found here: [Link to Postman Collection!](https://www.getpostman.com/collections/c2b860f1fed43007fc02)

## Schemas:
### User  
1. **email**: Email Id of the Admin  
type: String (unique, required)
2.  **password**: Password of the Admin in Hash form  
type: String (required)  

### Movies  
1. **name**: Name of the movie  
type: String (required)
2. **director**: Name of the director   
type: String (required)
3. **genre**: Genre of the movie (can be multiple)   
type: Array of Strings (required)
4. **imdb_score**: IMDB score of the movie  
type: Number (required)
5. **99popularity**: The 99popularity score of the movie   
type: Number (required)

  

## Contributing
Pull requests are welcome.
