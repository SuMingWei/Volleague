# volleague

## Developement

1-1. Project setup
    - Install dependent modules

```bash
    $ npm install
```

1-2. Use the command below to use Openssl.

```bash
    # MAC/Linux user
    $ export NODE_OPTIONS=--openssl-legacy-provider

    # PowerShell
    $ $env:NODE_OPTIONS="--openssl-legacy-provider"
```

2. Compiles and hot-reloads for **development**
    - Type the command below for development.

         ```bash
            # It will reload every time you save it.
            $ npm run serve 
        ```

## Testing
- You can use the following command to add the Vue Test Utils
    ```bash
        $ vue add unit-jest
    ```
    - Then the CLI will add the testing command in `packet.json`
        ```json
            "scripts": {
	            "test:unit": "vue-cli-service test:unit"
            }
        ```
- Run all the test files in `tests/unit/`
    ```bash
        $ npm run test:unit
    ```
- Run specified test file in `tests/unit/`
    ```bash
        $ npm run test:unit --file /tests/unit/<filename>
    ```

## Deployment

- This github project is synchronized to Heroku. Everytime we push to master, Heroku will automatically deploy this project to a webiste.
- If you want to deploy your own version, you will have to fork this project and build it up on Heroku yourself.

## Environment

1. Vue: ``2.6.11`` (Frontend framework)
2. Bootstrap: ``5.1.3`` (Frontend toolkit)
3. Firebase: ``9.8.1`` (Backend)
4. Heroku: (Deployment)

## Note

If you want to update Vue2 to Vue3, you will have to tackle incompatible modules (27 modules in total). GOOD LUCK 😄

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
