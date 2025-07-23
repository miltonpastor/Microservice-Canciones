# Songs Microservice

This is a simple RESTful API for managing songs using Node.js, Express, and AWS DynamoDB. The API supports basic CRUD operations for a microservice called "Canciones".

## Project Structure

```
songs-microservice
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers           # Contains controller functions for handling requests
│   │   └── songsController.js
│   ├── routes                # Defines the API routes
│   │   └── songs.js
│   ├── models                # Contains the Song model
│   │   └── song.js
│   ├── middleware            # Middleware for request validation
│   │   └── validation.js
│   └── config                # Configuration for DynamoDB connection
│       └── dynamodb.js
├── package.json              # NPM package configuration
└── README.md                 # Project documentation
```

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd songs-microservice
   ```

2. Install the dependencies:
   ```
   npm install
   ```

## Configuration

Before running the application, ensure that you have configured your AWS credentials. You can do this by setting up the `~/.aws/credentials` file or by using environment variables.

## API Endpoints

- **GET /songs**: Retrieve all songs.
- **POST /songs**: Create a new song. Requires `name`, `path`, and `plays` in the request body.
- **PUT /songs/:id**: Update an existing song by ID. Requires `name`, `path`, and `plays` in the request body.
- **DELETE /songs/:id**: Delete a song by ID.

## Usage

To start the server, run:
```
node src/app.js
```

The server will be running on `http://localhost:3000`.

## License

This project is licensed under the MIT License.