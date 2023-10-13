# NodeJs REST Fuzzing
This application is a Web API application written with NodeJs which is used as a fuzzing target to test the implementation of input and business logic validation mechanisms.

This application has 3 types of validation modes, namely no validation, partial validation, and full validation. In partial validation mode, the input validation only checks the data type and does not check data constraints such as minimum and maximum length of the data. For example, if the expected input is integer data type with minimum value of 0 and maximum value of 100, then partial validation mode only checks whether the data type is integer or not and does not check the minimum/maximum size of the data. For full validation mode, validation is also carried out on the minimum/maximum size of the data, in addition to validating the data type.

This application uses the [Joi](https://joi.dev/) and [Zod](https://zod.dev/) libraries to validate input payloads.

Currently, the application <b>has no authentication and authorization mechanisms</b> and is only used for research and testing purposes.
