import swaggerAutogen from "swagger-autogen";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const _dirname = dirname(fileURLToPath(import.meta.url));
const options = {
  openapi: "3.0.1", // Enable/Disable OpenAPI. By default is null
  language: "en-US", // Change response language. By default is 'en-US'
  disableLogs: false, // Enable/Disable logs. By default is false
  autoHeaders: true, // Enable/Disable automatic headers capture. By default is true
  autoQuery: true, // Enable/Disable automatic query capture. By default is true
  autoBody: true, // Enable/Disable automatic body capture. By default is true
};
const doc = {
  openapi: "3.0.1",
  info: {
    version: "2.0.2",
    title: "API documentation",
    description: "REST API for ",
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
  },
  consumes: ["application/json"],
  produces: ["application/json"],
  servers: [{ url: "http://localhost:3000" }],
  tags: [
    {
      name: "Auth",
      description: "Authorization endpoints",
    },
    {
      name: "Tasks",
      description: "Tasks endpoints",
    },
    {
      name: "Reviews",
      description: "Reviews endpoints",
    },
  ],
};

const outputFile = join(_dirname, "./swagger.json");
const endpointsFiles = [
  join(_dirname, "./routes/api/auth-router.js"),
  join(_dirname, "./routes/api/reviews-router.js"),
  join(_dirname, "./routes/api/tasks-router.js"),
];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(options)(outputFile, endpointsFiles, doc).then(({ success }) => {
  console.log(`Generated: ${success}`);
});

/*
openapi: 3.0.3
info:
  title: Wallet API docs - OpenAPI 3.0
  description: |-
    API documentation for project Wallet. 
    
    Цей проект є веб-додатком для керування особистими фінансами, який дозволяє користувачам вести облік своїх доходів та витрат. Головна мета проекту полягає в тому, щоб забезпечити користувачів інструментами для контролю своїх фінансів, планування їхнього бюджету та відслідковування своїх витрат.

    У проекті передбачено можливість реєстрації користувачів, їх аутентифікації та авторизації. Крім того, користувачі можуть створювати та відстежувати свої транзакції, розподіляти їх по категоріях, переглядати статистику своїх витрат за певний період часу, а також виконувати редагування та видалення своїх транзакцій.

    Окрім того, додаток має дружній та зрозумілий інтерфейс користувача, що дозволяє зручно та швидко виконувати всі необхідні дії. Проект також забезпечує безпеку користувачів за допомогою шифрування паролів та ідентифікації за допомогою токенів.
    
    **Функціональні можливості:**

    Реєстрація та авторизація користувачів
    
    Додавання, перегляд та видалення транзакцій
    
    Отримання категорій транзакцій та їх додавання/видалення
    
    Відображення детальної статистики за місяць та рік за транзакціями користувача
    
    Відображення загальної статистики користувачів
    
    **Стек технологій, що використовується у проекті:**
    
    Node.js - середовище виконання JavaScript на сервері
    
    Express.js - фреймворк для розробки веб-додатків на Node.js
    
    MongoDB - NoSQL база даних
    
    Mongoose - бібліотека для роботи з MongoDB у Node.js
    
  contact:
    email: n.khrystiuk@goit.ua
  version: 1.0.12
servers:
  - url: https://wallet.goit.ua
tags:
  - name: Auth
    description: Authorization endpoints
  - name: User
    description: User endpoints
  - name: Transaction
    description: Transaction endpoints
  - name: Category
    description: Category endpoints
paths:
  /api/auth/sign-up:
      post:
        operationId: AuthController_signUp
        summary: Sign up new user - User registration
        parameters: []
        requestBody:
          required: true
          description: |
            # Опис параметрів запиту:
            
            **username** - string, ім'я користувача.
            
            **email** - string, електронна пошта користувача. 
            
            **password** - string, зашифрований пароль користувача. 

          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SignUpDto'
        responses:
          '201':
            description: |
              New User Registered
              
              Опис параметрів відповіді:
              
              **id** - ObjectId, унікальний ідентифікатор користувача
              
              **username** - string, ім'я користувача.
              
              **email** - string, електронна пошта користувача.
              
              **balance** - number, баланс користувача.
              
              **token** - string, токен використовується для зберігання стану авторизації користувача в системі, що дозволяє користувачам здійснювати захищені запити до API. Токен є довільним рядком символів і генерується при кожній новій авторизації користувача..

            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/UserWithTokenSerializer'
          '400':
            description: Validation error
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/errorBadRequesResponse'
          '409':
            description: User with such email already exists
        tags:
          - Auth
  /api/auth/sign-in:
      post:
        operationId: AuthController_signIn
        summary: Sign in existing user
        parameters: []
        requestBody:
          required: true
          description: |
            # Опис параметрів запиту:
            
            **email** - string, електронна пошта користувача. **Обов'язковий параметр**
            
            **password** - string, зашифрований пароль користувача. **Обов'язковий параметр**

          content:
            application/json:
              schema:
                $ref: '#/components/schemas/SignInDto'
        responses:
          '201':
            description: |
             Created session for existing user
              
              Опис параметрів відповіді:
              
              **id** - ObjectId, унікальний ідентифікатор користувача
              
              **username** - string, ім'я користувача.
              
              **email** - string, електронна пошта користувача.
              
              **balance** - number, баланс користувача.
              
              **token** - string, токен використовується для зберігання стану авторизації користувача в системі, що дозволяє користувачам здійснювати захищені запити до API. Токен є довільним рядком символів і генерується при кожній новій авторизації користувача..

            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/UserWithTokenSerializer'
          '400':
            description: Validation error
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/errorBadRequesResponse'
          '403':
            description: Provided password is incorrect
          '404':
            description: User with such email not found
        tags:
          - Auth
  /api/auth/sign-out:
      delete:
        operationId: AuthController_signOut
        summary: Signs out user
        description: |
            Ендпоінт логауту - це механізм виходу з системи, який припиняє дію сесії користувача та знищує токен доступу, що був виданий при попередній аутентифікації.
            
            Опис: Коли користувач натискає кнопку вийти з системи, він робить запит на URL /api/auth/sign-out з валідним токеном у заголовку Authorization. Сервер перевіряє валідність токена, якщо токен є дійсним, то сесія користувача закривається, токен видаляється і користувач повертається на сторінку входу в систему. Якщо токен не є валідним, то сервер повертає статус 401 і повідомляє про невалідність токена.

        parameters: []
        security:
          - bearerAuth: []
        responses:
          '204':
            description: User signed out - успішний вихід з системи
          '401':
            description: Bearer auth failed - невалідний токен - Якщо запит не містить дійсний токен або токен вже вичерпав свій термін дії, сервер поверне відповідь з кодом статусу HTTP 401 Unauthorized.
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      description: Description of the error.
                example:
                  message: Authentication failed. Please log in.
            
        tags:
          - Auth
  /api/users/current:
      get:
        operationId: UsersController_getLoggedUser
        summary: Get current user info
        description: |
            Ендпоінт "current" використовується для отримання інформації про поточного авторизованого користувача. Цей ендпоінт повертає об'єкт, який містить інформацію про користувача, таку як ім'я, електронна пошта, ідентифікатор користувача тощо.
            
            Параметри: відсутні

            Опис: Коли користувач натискає кнопку вийти з системи, він робить запит на URL /api/auth/sign-out з валідним токеном у заголовку Authorization. Сервер перевіряє валідність токена, якщо токен є дійсним, то сесія користувача закривається, токен видаляється і користувач повертається на сторінку входу в систему. Якщо токен не є валідним, то сервер повертає статус 401 і повідомляє про невалідність токена.

        parameters: []
        security:
          - bearerAuth: []
        responses:
          '200':
            description: |
              Logged user returned
            
              JSON-об'єкт, який містить інформацію про поточного авторизованого користувача.
              
              Опис параметрів відповіді:
              
              **id** - ObjectId, унікальний ідентифікатор користувача
              
              **username** - string, ім'я користувача.
              
              **email** - string, електронна пошта користувача.
              
              **balance** - number, баланс користувача.
            
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/UserSerializer'
          '401':
            description: Bearer auth failed - Якщо запит не містить дійсний токен або токен вже вичерпав свій термін дії, сервер поверне відповідь з кодом статусу HTTP 401 Unauthorized.
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      description: Description of the error.
                example:
                  message: Authentication failed. Please log in.
        tags:
          - User
  /api/transactions:
      post:
        operationId: TransactionsController_createTransaction
        summary: Create new transaction for logged in user
        parameters: []
        security:
          - bearerAuth: []
        requestBody:
          required: true
          description: |
            # Опис параметрів запиту:
            
            **transactionDate** - string, дата транзакції. **Обов'язковий параметр**
            
            **type** - string, тип транзакції - "INCOME" або "EXPENSE". **Обов'язковий параметр**
            
            **categoryId** - ObjectId, унікальний ідентифікатор категорії. **Обов'язковий параметр**
            
            **comment** - опис транзакції. **Обов'язковий параметр**
                        
            **amount** - number, сума транзакції. **Обов'язковий параметр**

          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CreateTransactionDto'
        responses:
          '201':
            description: |
              Transaction created
              
              Опис параметрів відповіді:
              
              **id** - ObjectId, унікальний ідентифікатор транзакції
              
              **transactionDate** - string, дата транзакції. 
              
              **type** - string, тип транзакції - "INCOME" або "EXPENSE".
              
              **userId** - ObjectId, унікальний ідентифікатор користувача
              
              **categoryId** - ObjectId, унікальний ідентифікатор категорії. 
              
              **comment** - опис транзакції. 
                          
              **amount** - number, сума транзакції.
              
              **balanceAfter** - number, баланс користувача після тразакції
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/TransactionSerializer'
          '400':
            description: Validation error
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/errorBadRequesResponse'
          '401':
            description: Bearer auth failed - Якщо запит не містить дійсний токен або токен вже вичерпав свій термін дії, сервер поверне відповідь з кодом статусу HTTP 401 Unauthorized.
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      description: Description of the error.
                example:
                  message: Authentication failed. Please log in.
          '404':
            description: Transaction category not found
          '409':
            description: Transaction category type does not match transaction type
        tags:
          - Transaction
      get:
        operationId: TransactionsController_getTransactions
        summary: Get all transactions for logged in user
        description: |
              Ендпоінт /api/transactions типу GET призначений для отримання інформації про всі транзакції користувача. Для доступу до цього ендпоінту потрібна аутентифікація, тому у заголовку запиту має бути переданий токен авторизації.

              При успішному виконанні запиту сервер повертає статус код 200 та список усіх транзакцій користувача з детальною інформацією про кожну з них, таку як категорія, сума, дата та коментар (якщо він є).
              
              У разі, якщо користувач не має жодної транзакції, то сервер поверне статус код 200 та порожній список.
        parameters: []
        security:
          - bearerAuth: []
        responses:
          '200':
            description: |
              Get all transactions for logged in user 
              
              Опис параметрів відповіді:
              
              **id** - ObjectId, унікальний ідентифікатор транзакції
              
              **transactionDate** - string, дата транзакції. 
              
              **type** - string, тип транзакції - "INCOME" або "EXPENSE".
              
              **userId** - ObjectId, унікальний ідентифікатор користувача
              
              **categoryId** - ObjectId, унікальний ідентифікатор категорії. 
              
              **comment** - опис транзакції. 
                          
              **amount** - number, сума транзакції.
              
              **balanceAfter** - number, баланс користувача після тразакції 

            content:
              application/json:
                schema:
                  type: array
                  items:
                    $ref: '#/components/schemas/TransactionSerializer'
          '400':
            description: Validation error
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/errorBadRequesResponse'
          '401':
            description: Bearer auth failed - Якщо запит не містить дійсний токен або токен вже вичерпав свій термін дії, сервер поверне відповідь з кодом статусу HTTP 401 Unauthorized.
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      description: Description of the error.
                example:
                  message: Authentication failed. Please log in.
        tags:
          - Transaction
  /api/transactions/{transactionId}:
      patch:
        operationId: TransactionsController_updateTransaction
        summary: Update transaction
        parameters:
          - name: transactionId
            required: true
            in: path
            schema:
              type: string
        security:
          - bearerAuth: []
        requestBody:
          required: true
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UpdateTransactionDto'
        responses:
          '200':
            description: Transaction updated
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/TransactionSerializer'
          '400':
            description: Validation error
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/errorBadRequesResponse'
          '401':
            description: Bearer auth failed - Якщо запит не містить дійсний токен або токен вже вичерпав свій термін дії, сервер поверне відповідь з кодом статусу HTTP 401 Unauthorized.
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      description: Description of the error.
                example:
                  message: Authentication failed. Please log in.
          '403':
            description: User does not owns transaction
          '404':
            description: Transaction or transaction category not found
        tags:
          - Transaction
      delete:
        operationId: TransactionsController_deleteTransaction
        summary: Remove transaction
        parameters:
          - name: transactionId
            required: true
            in: path
            schema:
              type: string
        security:
          - bearerAuth: []
        responses:
          '204':
            description: Transaction deleted
          '400':
            description: Validation error
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/errorBadRequesResponse'
          '401':
            description: Bearer auth failed - Якщо запит не містить дійсний токен або токен вже вичерпав свій термін дії, сервер поверне відповідь з кодом статусу HTTP 401 Unauthorized.
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      description: Description of the error.
                example:
                  message: Authentication failed. Please log in.
          '403':
            description: User does not owns transaction
          '404':
            description: Transaction not found
        tags:
          - Transaction
  /api/transaction-categories:
      get:
        operationId: TransactionCategoriesController_getTransactionCategories
        parameters: []
        security:
          - bearerAuth: []
        responses:
          '200':
            description: Transaction returned
            content:
              application/json:
                schema:
                  type: array
                  items:
                    $ref: '#/components/schemas/TransactionCategorySerializer'
          '401':
            description: Bearer auth failed - Якщо запит не містить дійсний токен або токен вже вичерпав свій термін дії, сервер поверне відповідь з кодом статусу HTTP 401 Unauthorized.
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      description: Description of the error.
                example:
                  message: Authentication failed. Please log in.
        tags:
          - Transaction
  /api/transactions-summary:
      get:
        operationId: TransactionsSummaryController_getTransactionsSummary
        summary: Get transactions summary for period
        parameters:
          - name: month
            required: false
            in: query
            schema:
              type: number
          - name: year
            required: false
            in: query
            schema:
              type: number
        security:
          - bearerAuth: []
        responses:
          '200':
            description: Transaction summary returned
            content:
              application/json:
                schema:
                  $ref: '#/components/schemas/TransactionsSummarySerializer'
          '400':
            description: Validation error
          '401':
            description: Bearer auth failed - Якщо запит не містить дійсний токен або токен вже вичерпав свій термін дії, сервер поверне відповідь з кодом статусу HTTP 401 Unauthorized.
            content:
              application/json:
                schema:
                  type: object
                  properties:
                    message:
                      type: string
                      description: Description of the error.
                example:
                  message: Authentication failed. Please log in.
        tags:
          - Transaction Summary Controller
components:
  securitySchemes:
    bearerAuth:   # arbitrary name for the security scheme
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
      UserSerializer:
        type: object
        properties:
          id:
            type: string
            example: 9578a252-1d7a-4fcc-82e2-d1a528dd3d0c
          username:
            type: string
            example: Mark
          email:
            type: string
            example: mark@gmail.com
          balance:
            type: number
            example: 100500
        required:
          - id
          - username
          - email
          - balance
      CreateTransactionDto:
        type: object
        properties:
          transactionDate:
            type: string
            example: 2020-07-20
          type:
            type: string
            enum:
              - INCOME
              - EXPENSE
            example: EXPENSE
          categoryId:
            type: string
            example: 128673b5-2f9a-46ae-a428-ec48cf1effa1
          comment:
            type: string
            example: by car
          amount:
            type: number
            example: -1000
        required:
          - transactionDate
          - type
          - categoryId
          - comment
          - amount
      TransactionSerializer:
        type: object
        properties:
          id:
            type: string
            example: 7527bd28-f4a7-4355-bf09-f17dffeb3582
          transactionDate:
            type: string
            example: 2020-07-20
          type:
            type: string
            example: EXPENSE
            enum: 
              - INCOME
              - EXPENSE
          categoryId:
            type: string
            example: 128673b5-2f9a-46ae-a428-ec48cf1effa1
          userId:
            type: string
            example: 32d44950-ccb7-4ba9-8193-c2024f0a9d1d
          comment:
            type: string
            example: by car
          amount:
            type: number
            example: -1000
          balanceAfter:
            type: number
            example: -2000
        required:
          - id
          - transactionDate
          - type
          - categoryId
          - userId
          - comment
          - amount
          - balanceAfter
      UpdateTransactionDto:
        type: object
        properties:
          transactionDate:
            type: string
            example: 2020-07-20
          type:
            type: string
            example: EXPENSE
            enum:
              - INCOME
              - EXPENSE
          categoryId:
            type: string
            example: 128673b5-2f9a-46ae-a428-ec48cf1effa1
          comment:
            type: string
            example: by fly
          amount:
            type: number
            example: -50
      TransactionCategorySerializer:
        type: object
        properties:
          id:
            type: string
            example: c9d9e447-1b83-4238-8712-edc77b18b739
          name:
            type: string
            example: Main expenses
          type:
            type: string
            example: EXPENSE
            enum:
              - INCOME
              - EXPENSE
        required:
          - id
          - name
          - type
      SignUpDto:
        type: object
        properties:
          username:
            type: string
            description: Username
            example: Mark
          email:
            type: string
            example: mark@gmail.com
          password: 
            type: string
            example: mark
        required:
          - username
          - email
          - password
      UserWithTokenSerializer:
        type: object
        properties:
          user:
            $ref: '#/components/schemas/UserSerializer'
          token:
            type: string
            example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzaWQiOiIyOWI4ZmZmNS0xN2NjLTQ5NTYtOTViZC1jN2U3N2FkZDEwOWEiLCJpYXQiOjE2ODE4OTM3MzEsImV4cCI6MTAwMDAwMDE2ODE4OTM3MzJ9.hQpNKIj4SR7Gm9waUMn7hzwKQyqwKrniL_qSW7SxrjM
        required:
          - user
          - token
      SignInDto:
        type: object
        properties:
          email:
            type: string
            example: mark@gmail.com
          password:
            type: string
            example: mark
        required:
          - email
          - password
      CategorySummarySerializer:
        type: object
        properties:
          name:
            type: string
            example: Household products
          type:
            type: string
            example: EXPENSE
            enum:
              - INCOME
              - EXPENSE
          total:
            type: number
            example: -1000
        required:
          - name
          - type
          - total
      TransactionsSummarySerializer:
        type: object
        properties:
          categoriesSummary:
            type: array
            items:
              $ref: '#/components/schemas/CategorySummarySerializer'
          incomeSummary:
            type: number
            example: 0
          expenseSummary:
            type: number
            example: -1000
          periodTotal:
            type: number
            example: -1000
          year:
            type: number
            example: 2020
          month:
            type: number
            example: 7
        required:
          - categoriesSummary
          - incomeSummary
          - expenseSummary
          - periodTotal
          - year
          - month
      errorBadRequesResponse:
        type: object
        properties:
          status:
            type: integer
            description: Error status code
            example: '400'
          message:
            type: string
            description: Error message
            example: Bad request
      errorConflictResponse:
        type: object
        properties:
          status:
            type: integer
            description: Error status code
            example: '409'
          message:
            type: string
            description: Error message
            example: User with email - user@example.com, already exist
      errorUnauthorizedResponse:
        type: object
        properties:
          status:
            type: integer
            description: Error status code
            example: '401'
          message:
            type: string
            description: Error message
            example: Not authorized
      errorNotFoundResponse:
        type: object
        properties:
          status:
            type: integer
            description: Error status code
            example: '404'
          message:
            type: string
            description: Error message
            example: Not found
      errorAddCategoryResponse:
        type: object
        properties:
          status:
            type: string
            example: failure
          code:
            type: integer
            example: '409'
          message:
            type: string
            description: Error message
            example: The category you are trying to add already exists
      errorRemoveCategoryResponse:
        type: object
        properties:
          status:
            type: string
            example: failure
          code:
            type: integer
            example: '409'
          message:
            type: string
            description: Error message
            example: The category you are trying to delete is not exist
            */
