# AWS SAM local laboratory

This code repository users the following technologies, enabling step-through debugging for serverless large repositories. It implements a more friendly way to run a serverless architecture on local, for faster iterations on the codebase

- _Typescript_: `src/lambda` files are transpiled with sourcemaps into `build` folder. These build files are then mounted on the corresponding lambdas docker containers (SAM local) as per the step function definition execution
- _Webpack_: used to transpile typescript files into js files generating also the sourcemaps which are then used to map docker lambda container running code with source code (ts-files). Also, it enables hot reloading via `npm run watch`
- _AWS SAM_: AWS binary for working with serverless technologies. It allows to mount a lambda/api gateway architecture using `template.yaml` file. As per AWS documentation, this uses the same underlying technology used at AWS to orchestate the service. TODO: _put this into the same docker-compose file present at the current repo_
- _AWS Step functions local_: Docker image which mounts step function service locally. As per AWS documentation, this is also the oficial underlying technology used on AWS service. Can process step function definitions locally, and orchestate SAM local lambda calls accordingly.
- _VS Code debugging_: `launch.json` is configured to attach to remote node debugger port `5678` on localhost (A.K.A running lambda container with SAM local). It also maps local and remote folders with corresponding source maps.

  Since VScode have no way to know which lambda is being triggered by step function definition at time, we have to attach to each lambda individually. When launching debugger, you will be prompted to select which lambda sourcemap you want to use. Select the lambda you want to debug _et voilá_.

## How to try this out

https://docs.aws.amazon.com/step-functions/latest/dg/sfn-local-lambda.html#start-local-lambda

Before begin, follow the instructions located at [Installing the AWS SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install-linux.html) in order to install AWS SAM local. _This step would not be needed if adding AWS SAM local docker image to docker compose (some tweak needed)_

Having done that, execute the following commands to raise and debug lambdas through the step function orchestation. Some commands have been abstracted through npm scripts for readability:

- Install dependencies with `npm install`
- Start Webpack typescript transpilation with hot reloading (leave this terminal running)
  `npm run watch`
- Start SAM lambda local aws service with debug flag (will execute webpack build files, also leave this terminal running)
  `npm run service:lambda:debug`
- Start SAM step function local aws service (will raise a docker-compose file, leave this terminal running)
  `npm run service:step-function`
- Upload step function definition into SF service
  `npm run upload:sf-definition`
- run step function
  `npm run sf -- --name <step-function-execution-name>`

Once this is done, look at the window where `npm run service:lambda:debug` is running. It should have paused execution and waiting for your debugger.

- final step: put a breakpoint in the corresponding Lambda, then press `F5` and choose the lambda being debugged. The execution should resume and paused at your breakpoint. This process will continue until all step function process has been completed.

## Commands notes shortcuts

- Start SAM lambda local aws service
  `npm run service:lambda`

- Start SAM step function local aws service
  `npm run service:step-function`

- Upload step function definition into SF service
  `npm run upload:sf-definition`

- Update step function definition
  `npm run update:sf-definition`

- run step function
  `npm run sf -- --name <step-function-execution-name>`

- describe execution
  `npm run sf:describe -- --execution-arn <execution-arn-identifier>`

# Sam-app original README file

This project contains source code and supporting files for a serverless application that you can deploy with the SAM CLI. It includes the following files and folders.

- hello-world - Code for the application's Lambda function.
- events - Invocation events that you can use to invoke the function.
- hello-world/tests - Unit tests for the application code.
- template.yaml - A template that defines the application's AWS resources.

The application uses several AWS resources, including Lambda functions and an API Gateway API. These resources are defined in the `template.yaml` file in this project. You can update the template to add AWS resources through the same deployment process that updates your application code.

If you prefer to use an integrated development environment (IDE) to build and test your application, you can use the AWS Toolkit.  
The AWS Toolkit is an open source plug-in for popular IDEs that uses the SAM CLI to build and deploy serverless applications on AWS. The AWS Toolkit also adds a simplified step-through debugging experience for Lambda function code. See the following links to get started.

- [PyCharm](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
- [IntelliJ](https://docs.aws.amazon.com/toolkit-for-jetbrains/latest/userguide/welcome.html)
- [VS Code](https://docs.aws.amazon.com/toolkit-for-vscode/latest/userguide/welcome.html)
- [Visual Studio](https://docs.aws.amazon.com/toolkit-for-visual-studio/latest/user-guide/welcome.html)

## Deploy the sample application

The Serverless Application Model Command Line Interface (SAM CLI) is an extension of the AWS CLI that adds functionality for building and testing Lambda applications. It uses Docker to run your functions in an Amazon Linux environment that matches Lambda. It can also emulate your application's build environment and API.

To use the SAM CLI, you need the following tools.

- SAM CLI - [Install the SAM CLI](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-install.html)
- Node.js - [Install Node.js 10](https://nodejs.org/en/), including the NPM package management tool.
- Docker - [Install Docker community edition](https://hub.docker.com/search/?type=edition&offering=community)

To build and deploy your application for the first time, run the following in your shell:

```bash
sam build
sam deploy --guided
```

The first command will build the source of your application. The second command will package and deploy your application to AWS, with a series of prompts:

- **Stack Name**: The name of the stack to deploy to CloudFormation. This should be unique to your account and region, and a good starting point would be something matching your project name.
- **AWS Region**: The AWS region you want to deploy your app to.
- **Confirm changes before deploy**: If set to yes, any change sets will be shown to you before execution for manual review. If set to no, the AWS SAM CLI will automatically deploy application changes.
- **Allow SAM CLI IAM role creation**: Many AWS SAM templates, including this example, create AWS IAM roles required for the AWS Lambda function(s) included to access AWS services. By default, these are scoped down to minimum required permissions. To deploy an AWS CloudFormation stack which creates or modified IAM roles, the `CAPABILITY_IAM` value for `capabilities` must be provided. If permission isn't provided through this prompt, to deploy this example you must explicitly pass `--capabilities CAPABILITY_IAM` to the `sam deploy` command.
- **Save arguments to samconfig.toml**: If set to yes, your choices will be saved to a configuration file inside the project, so that in the future you can just re-run `sam deploy` without parameters to deploy changes to your application.

You can find your API Gateway Endpoint URL in the output values displayed after deployment.

## Use the SAM CLI to build and test locally

Build your application with the `sam build` command.

```bash
sam-app$ sam build
```

The SAM CLI installs dependencies defined in `hello-world/package.json`, creates a deployment package, and saves it in the `.aws-sam/build` folder.

Test a single function by invoking it directly with a test event. An event is a JSON document that represents the input that the function receives from the event source. Test events are included in the `events` folder in this project.

Run functions locally and invoke them with the `sam local invoke` command.

```bash
sam-app$ sam local invoke HelloWorldFunction --event events/event.json
```

The SAM CLI can also emulate your application's API. Use the `sam local start-api` to run the API locally on port 3000.

```bash
sam-app$ sam local start-api
sam-app$ curl http://localhost:3000/
```

The SAM CLI reads the application template to determine the API's routes and the functions that they invoke. The `Events` property on each function's definition includes the route and method for each path.

```yaml
Events:
  HelloWorld:
    Type: Api
    Properties:
      Path: /hello
      Method: get
```

## Add a resource to your application

The application template uses AWS Serverless Application Model (AWS SAM) to define application resources. AWS SAM is an extension of AWS CloudFormation with a simpler syntax for configuring common serverless application resources such as functions, triggers, and APIs. For resources not included in [the SAM specification](https://github.com/awslabs/serverless-application-model/blob/master/versions/2016-10-31.md), you can use standard [AWS CloudFormation](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-template-resource-type-ref.html) resource types.

## Fetch, tail, and filter Lambda function logs

To simplify troubleshooting, SAM CLI has a command called `sam logs`. `sam logs` lets you fetch logs generated by your deployed Lambda function from the command line. In addition to printing the logs on the terminal, this command has several nifty features to help you quickly find the bug.

`NOTE`: This command works for all AWS Lambda functions; not just the ones you deploy using SAM.

```bash
sam-app$ sam logs -n HelloWorldFunction --stack-name sam-app --tail
```

You can find more information and examples about filtering Lambda function logs in the [SAM CLI Documentation](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-sam-cli-logging.html).

## Unit tests

Tests are defined in the `hello-world/tests` folder in this project. Use NPM to install the [Mocha test framework](https://mochajs.org/) and run unit tests.

```bash
sam-app$ cd hello-world
hello-world$ npm install
hello-world$ npm run test
```

## Cleanup

To delete the sample application that you created, use the AWS CLI. Assuming you used your project name for the stack name, you can run the following:

```bash
aws cloudformation delete-stack --stack-name sam-app
```

## Resources

See the [AWS SAM developer guide](https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html) for an introduction to SAM specification, the SAM CLI, and serverless application concepts.

Next, you can use AWS Serverless Application Repository to deploy ready to use Apps that go beyond hello world samples and learn how authors developed their applications: [AWS Serverless Application Repository main page](https://aws.amazon.com/serverless/serverlessrepo/)
