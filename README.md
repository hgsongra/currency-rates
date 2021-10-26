# currency-rates
REST APIs for currency rates 
# scp-service-message-faults

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

## License

Please see [LICENSE.md](LICENSE.md).