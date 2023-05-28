# volleague

## Developement

1-1. Project setup
    - Install dependent modules

```bash
    npm install
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

### Unit test

- You can use the following command to add the Vue Test Utils

    ```bash
        vue add unit-jest
    ```

  - Then the CLI will add the testing command in `packet.json`

    ```json
        "scripts": {
            "test:unit": "vue-cli-service test:unit"
        }
    ```

- Run the test files in `tests/unit/`

    ```bash
        npm run test:unit [--file /tests/unit/<filename>]
    ```

- Show the test coverage in `tests/unit/`

    ```bash
        npm run test:coverage [--file /tests/unit/<filename>]
    ```

### Selenium

- Before running selenium test, there are several things you need to make sure:
    1. You have **Google Chrome** installed.
    2. You have `unittest` and `selenium` installed. If you don't any of them, you can install them by the following command:
        ```bash
        pip install unittest
        pip install selenium
        ```
    3. Your website is up and running
        ```bash
        npm run serve
        ```
    4. Set your website URL in `seleniumTest.py` > `TestScoring` class > `setUpClass` function > `cls.rootURL` variable.
        ```python
        # in `seleniumTest.py`
        class TestScoring(unittest.TestCase):

            @classmethod
            def setUpClass(cls):
                cls.driver = webdriver.Chrome()
                cls.rootURL = 'http://localhost:8080/'  # <<< set your website URL here
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
