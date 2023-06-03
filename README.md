## Nodejs Task

### How to Run the application

first install dep
```
yarn
```

run the application on port 3000

```
yarn start:dev
```

### Import Swagger json into Postman collection
you can import the file `./swagger-spec.json` into your postman collections and start play with the API

### The project code architecture 

following Design pattern principles imposed by Nestjs Node js framework we have 

* **Controller** : where our routing are defined
* **Data Validation/ transormation**: where we define our DTO
* **services** : where we define our bussiness logic
* **Database Access Layer / Repository**: the database access layer need's to be defined in seperate layer / module
* **Interceptor** : is the last layer in the Req/Res life cycle and in this application were are using a cenralized interceptor for users module to filter the password, generate age from birthday ,and concate first/last name into fullname attribute
* **Exception filters** : will handle in our case a centralized place to handle the error message that we will expose in our APIs

### Unit test 

as requested at least 3 unit test

i did some unit testing in the service layer , where i needed to mock the *userRepositoryService* (database access layer)

see `/src/users/users.service.spec.ts`


run test


`yarn test:watch`
