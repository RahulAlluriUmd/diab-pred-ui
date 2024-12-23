# DiabPredUi

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.10.
This project acts as an front-end repo for the course Fall 2024 ECE-528 Cloud Computing project.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.


## Juper Notebook
The system is deployed on AWS SageMaker, where it executes core machine learning predictions efficiently. We have chosen the XGBoost model due to its impressive performance metrics, achieving an accuracy rate of 85% and a recall rate of 80%. XGBoost is an advanced gradient-boosting framework known for its speed and accuracy, making it well-suited for handling complex datasets. By leveraging this model, we aim to enhance the predictive capabilities of our application, ensuring reliable and accurate outcomes for our users.

Complete details about the model training and endpoint creation can be found in the [Jupyter Notebook][02]

## Lambda Functions
- Executes and manages requests for making predictions based on input data.  
- Oversees the transformation and preparation of data to ensure it meets the required format for analysis.  
- Establishes and maintains communication with the SageMaker endpoint to facilitate seamless data processing and model deployment.
- Entire lambda function can be accessed from [here][01]


[01]: ./ext_files/invoke-api-diabetics-prediction-model.py
[02]: ./ext_files/Diabetes_prediction.ipynb