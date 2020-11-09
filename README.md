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

## API Endpoints
The base URL of the Heroku application is http://murmuring-shore-39160.herokuapp.com  

<table>
  <tr>
    <th>EndPoints</th>
    <th>Method</th>
    <th>Request Query</th>
    <th>Request Params</th>
    <th>Request Body</th>
    <th>Authentication Header</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>/movies</td>
    <td>GET</td>
    <td>order_by (optional)<br>
    	sort_by (optional)<br>
        genre[genre_name] (optional)<br>
        search (optional)<br>
    </td>
    <td>-</td>
    <td>-</td>
    <td>not required</td>
    <td>Gets all movies matching particular parameters, returns all movies if no parameters passed, query params can be chained together</td>
  </tr>
  <tr>
    <td>/movie/:id</td>
    <td>GET</td>
    <td>-</td>
    <td>id (movie_id)</td>
    <td>-</td>
    <td>not required</td>
    <td>Get all data for a particular movie id</td>
  </tr>
  <tr>
    <td>/movie/:id</td>
    <td>DELETE</td>
    <td>-</td>
    <td>id (movie_id)</td>
    <td>-</td>
    <td>not required</td>
    <td>Delete data for a particular movie id</td>
  </tr>
  <tr>
    <td>/movie</td>
    <td>PATCH</td>
    <td>-</td>
    <td>-</td>
    <td>
    99popularity,
    director,
    genre,
    imdb_score,
    id
	</td>
    <td>required</td>
    <td>Update movie by id</td>
  </tr>
  <tr>
    <td>/movie</td>
    <td>POST</td>
    <td>-</td>
    <td>-</td>
    <td>99popularity, director, 
    genre, imdb_score
    </td>
    <td>required</td>
    <td>Add new movie</td>
  </tr>
  <tr>
    <td>/genres</td>
    <td>GET</td>
    <td>-</td>
    <td>-</td>
    <td>-</td>
    <td>not required</td>
    <td>Get genres of all movies</td>
  </tr>
  <tr>
    <td>/login</td>
    <td>POST</td>
    <td>-</td>
    <td>-</td>
    <td>email,password</td>
    <td>not required</td>
    <td>Login for Admin User</td>
  </tr>
  <tr>
    <td>/user</td>
    <td>POST</td>
    <td>-</td>
    <td>-</td>
    <td>email,password</td>
    <td>not required</td>
    <td>Register a new user (not exposed on frontend)</td>
  </tr>
</table>


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
