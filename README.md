# Jobster

## Description

Jobster is a job application tracker that allows users to keep track of their job applications. Users can create, update, and delete job listings. They can also update the status of their job applications.

(!NOTE) First request to the site may take a while to load as the server is hosted on a free tier of Render.
You can check out the live demo here [https://jobs-api-y1nf.onrender.com/](https://jobs-api-y1nf.onrender.com/)

## API Documentation

For more details on the API endpoints and their usage, refer to the API documentation.
Documentation: [https://jobs-api-y1nf.onrender.com/api/v1/docs/](https://jobs-api-y1nf.onrender.com/api/v1/docs/)

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
