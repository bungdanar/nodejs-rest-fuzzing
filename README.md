# NodeJs REST Fuzzing
This application is a Web API application written with NodeJs which is used as a fuzzing target to test the implementation of input and business logic validation mechanisms.

This application has 3 types of validation modes, namely no validation, partial validation, and full validation. In partial validation mode, the input validation only checks the data type and does not check data constraints such as minimum and maximum length of the data. For example, if the expected input is integer data type with minimum value of 0 and maximum value of 100, then partial validation mode only checks whether the data type is integer or not and does not check the minimum/maximum size of the data. For full validation mode, validation is also carried out on the minimum/maximum size of the data, in addition to validating the data type.

This application uses the [Joi](https://joi.dev/) and [Zod](https://zod.dev/) libraries to validate input payloads.

Currently, the application <b>has no authentication and authorization mechanisms</b> and is only used for research and testing purposes.

## Functionality
This application is a simple e-commerce application that has 7 endpoints as follows:

| Method | Endpoint                       | Description                                                                                                                      |
|:------:|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------|
|  POST  | /product                       | Create a new product                                                                                                             |
|  POST  | /product-tag-category          | Create a new product along with tags and category for that product                                                               |
|  POST  | /product-tag-category-coupon   | Create a new product along with tags, categories and coupons for that product                                                    |
|  POST  | /user                          | Create a new user                                                                                                                |
|  POST  | /user-address                  | Create a new user along with the address for that user                                                                           |
|  POST  | /user-address-product          | Create a new user along with the user’s addresses and product sold by that user                                                  |
|  POST  | /user-address-product-shipping | Create a new user along with the user’s addresses and product (along with the shipping method for the product) sold by that user |

## How to Run
I highly recommend running this application using docker compose. The compose file in this code base will run the application server as well as run the MySQL database server so you no longer need to setup the database server manually.

First, create an `.env` file then copy and paste the contents of the `.env.example` file into the `.env` file.

In the `.env` file, there is a `VALIDATION` environment variable that can be filled with 1 of the 5 available validation modes. An explanation of the validation mode value is as follows:

| VALIDATION  | Description                                                               |
|-------------|---------------------------------------------------------------------------|
| no          | Running the application without input validation mechanism                |
| joi-partial | Running the application with partial input validation mechanism using Joi |
| joi-full    | Running the application with full input validation mechanism using Joi    |
| zod-partial | Running the application with partial input validation mechanism using Zod |
| zod-full    | Running the application with full input validation mechanism using Zod    |

If you run this application with docker compose then you do not need to change the values of the `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, and `DB_PASSWORD` environment variables. You may want to change the value of the `PORT` environment variable as the default value is 5000.

To run the application, you can build docker image first with command `docker compose build` or pull the docker image of this application from the docker hub with command `docker compose pull`. Next, run the application with command `docker compose up`.
