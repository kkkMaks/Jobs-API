# Joblog

## Description

Joblog is a job application tracker that allows users to keep track of their job applications. Users can create, update, and delete job listings. They can also update the status of their job applications.

You can check out the live demo here [https://Joblog-zj5wu.ondigitalocean.app](https://Joblog-zj5wu.ondigitalocean.app)

## Technologies Used

- Backend Framework: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Deployment: DigitalOcean
- API Documentation: Swagger

## Local Installation and Setup

1. Clone the repository and navigate to the project directory.

```bash
git clone https://github.com/kkkMaks/Jobs-API.git
cd Jobs-API
```

2. Install the required dependencies using [package manager]. Run the following command:

```bash
npm install
```

3. Configure the environment variables:

- MONGO_URL - mongodb url
- JWT_SECRET - secret key for jwt
- JWT_EXPIRES_IN - jwt expiration time

4. Run the application using [package manager]. Execute the following command:

```bash
npm start
```

5. Access the application by visiting [http://localhost:5000] in your web browser.

## API Documentation

For more details on the API endpoints and their usage, refer to the API documentation.
Documentation: [https://joblog-zclzm.ondigitalocean.app/api/v1/docs/](https://joblog-zclzm.ondigitalocean.app/api/v1/docs/)

## Endpoints

### Authentication

`/auth/register` (POST): Allows users to register by providing their name, email, and password.

`/auth/login` (POST): Allows users to log in by providing their email and password.

`/auth/updateUser` (PATCH): Allows users to update info.

### Jobs

`/jobs` (GET): Retrieves all jobs available in the system.

`/jobs` (POST): Creates a new job listing by providing the company name and position.

`/jobs/{id} `(GET): Retrieves a specific job listing based on the provided ID.

`/jobs/{id}` (PATCH): Updates a specific job listing by providing the ID and the new values for the company name, position, and status.

`/jobs/{id}` (DELETE): Deletes a specific job listing based on the provided ID.

`/jobs/stats` (GET): Retrieves the number of jobs in each status and the total number of jobs per each month.

The API supports authentication using bearer tokens. The user needs to authenticate and include the token in the request headers for endpoints that require authentication.

To use this API, you can make requests to the base URL https://jobs-api-y1nf.onrender.com/api/v1. Make sure to include the necessary headers and request bodies as specified in the API documentation.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.
