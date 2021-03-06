# currency-rates
REST APIs for currency rates 

## Establish environment variables (workstation installation)
Copy the .env.example file with default/sample environment variables for development to .env.
Examine the variables and edit as necessary/appropriate for your workstation environment.

```
cp .env.example .env
```

## Installation

Then install the dependency packages:
```
npm install
```

## Building the service

First, make sure you've followed the instructions in the [Installation](installation) section.


Then, to build the component library:
```
$ npm run build
```

You can then also run tests and coverage:
```
$ npm run test
$ npm run test:ci
```


And finally start the app
```
$ npm start
```

Go to the any rest client and hit the below endpoint to get the currency rates based on desired input(`base` and `target`)
```
$ http://localhost:3000/rates?base=USD&target=SGD
```

## License

Please see [LICENSE.md](LICENSE.md).
