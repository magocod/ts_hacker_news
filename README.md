# Express Hacker News.

## Considerations

- structure based on express generator, check https://expressjs.com/en/starter/generator.html 
- the start of the application is maintained by means of a js file without an extension, as the documentation suggests

## Project setup

### 1 - Install dependencies

- node js 16 or higher (https://nodejs.org/en/) 

```bash
npm install
```

### 2 - Set environment variables

- Clone the ```.env.example``` file and rename it to ```.env```

- Change environment variables
```text
// important, it is only possible to start the background tasks (cron) through the environment variable, 
// if this function is not needed, keep the value false
ACTIVE_SCHEDULE_TASKS=true
```

### 3 - Start db container
```bash
docker-compose up -d
```

### 4 - Translate code to javascript (dist)

```bash
npm run build:clean
```

### 5 - Run db migrations

- you must compile the application before using this command (step 4)
```bash
npm run migration:run
```

### 6 - Start the app

- in reload mode with changes (option 1)
```bash
npm run dev
```

- start the app with node (option 2)
```bash
npm run start
```

### 7 - populate the database (optional)

- send a network request, to the endpoint ({domain_here}/articles/seed)
```
http://localhost:3000/articles/seed - GET
```

### 8 - Use postman documentation (optional)

select import in postman and select file located in (rootDir = repository base folder, In case of not modifying it, 
it would be ts_hacker_news)
```
rootDir/docs/express_hacker_news.postman_collection.json
```

## Contributing

### Run tests

- verify correct installation by running the tests
```bash
npm run test
```

- run tests in parallel
```bash
npm run test:parallel
```

- checking coverage
```bash
npm run test:coverage
```

## Code style

### Eslint

- check encoding rules
```bash
npm run lint
```

### Prettier

- just check code
```bash
npm run format:check
```

- format code
```bash
npm run format:check
```
