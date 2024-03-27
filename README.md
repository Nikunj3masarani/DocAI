# DocAI App 

  DocAI app with haystack pipeline.

![App Image](resources/OIG2.eCHkxNCFo2UPskuoK29j.jpg)

## Installation
   - used python version 3.10
   - create a virtualenv env
   - Install requirements.txt
   - copy sample.env to .env file
       ```bash
      cp sample.env .env
       ```
   - update value for all env variable in .env file
   - run
      ````bash
     python3 main.py
     ````

## Code Structure
  - main.py - Entry point of application when we run locally.
  - app - package with application code for business logic.
      - constants - constants package for all required constants and messages in application.
      - exception - custom exceptions
      - helper - application level utils and helper functionality.
      - middleware - middleware for custom middleware classes
      - services - external service client dependency and lifecycle related functionality.
      - web - api specific code, sub packages divided by entity
      - application.py - application instance factory to create app instance and add app configurations.
      - lifetime.py -  has functions to register and close dependency functionality on app event
      - settings.py - global settings file that reads env file and creates variables.
## Pre-Commit check
pre-commit package helps to check all linting related issues before committing code. it formats code automatically
 - How to add new hooks in pre-commit config?

    - find required hook from available hooks at
        https://pre-commit.com/hooks.html
    - add hook details in .pre-commit-config.yaml file.
    - run
      ``
        pre-commit install
      ``
    - Ref: https://medium.com/@anton-k./how-to-set-up-pre-commit-hooks-with-python-2b512290436

## i18n support
 steps to update localization
 - add messages to locales/base.pot file
 - run ``msgmerge locales/{language}/LC_MESSAGES/base.po locales/base.pot -U`` for each supported language
 - create .mo file with ``msgfmt -o locales/{language}/LC_MESSAGES/base.mo locales/{language}/LC_MESSAGES/base``
 - ref: https://sbabashahi.medium.com/add-translation-to-fastapi-with-gettext-a769ae6dd6bb

## Action points
Please consider below action points before starting new task with this framework
  - [ ] Before creating new API give a thought this API be sync or async?
  - [ ] Before creating new functionality or adding a package spend some time to find the best possible way to implement.
  - [ ] Before committing any changes check functionality locally. verify data changes in DB/ES/Redis..
  - [ ] If any api taking more than 1 second to serve response locally. please review the code
  - [ ] For any api changes do a load testing with JMeter
  - [ ] Before committing make sure code is written as per decided framework.

## Note
  - No need follow this framework if there is bare minimum requirement like creating 1-2 api and not full fledge service

## Deployment
  - Deploy application with gunicorn with below arguments (Recommended in FastAPI document)
    - `--worker-class=uvicorn.workers.UvicornWorker` Async worker class for FastAPI
    - `--timeout=120`  Workers silent for more than this many seconds are killed and restarted. Default: 5 (SIG 6 warning.)

  - Deploy application with uvicorn with below arguments
    - `--timeout-keep-alive=120`  Close Keep-Alive connections if no new data is received within this timeout. Default: 5
