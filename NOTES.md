## Main notes

- run SAM lambda service API on debug mode (all lambdas are run with --inspect-brk flag)
  `sam local start-lambda -d 5678`

- run step function service docker with docker compose
  `docker-compose up`

- load step function definition

```
aws stepfunctions --endpoint http://localhost:8083 create-state-machine --definition "{\
  \"Comment\": \"A Hello World example of the Amazon States Language using an AWS Lambda Local function\",\
  \"StartAt\": \"HelloWorld\",\
  \"States\": {\
    \"HelloWorld\": {\
      \"Type\": \"Task\",\
      \"Resource\": \"arn:aws:lambda:us-east-1:123456789012:function:HelloWorldFunction\",\
      \"End\": true\
    }\
  }\
}\
}}" --name "HelloWorld" --role-arn "arn:aws:iam::012345678901:role/DummyRole"
```

or, using utils folder

`aws stepfunctions --endpoint http://localhost:8083 create-state-machine --definition $(node ./utils/parse-definition.js) --name "step-function-test" --role-arn "arn:aws:iam::012345678901:role/DummyRole"`

on npm scripts

`npm run upload:sf-definition`

- start execution
  `aws stepfunctions --endpoint http://localhost:8083 start-execution --state-machine arn:aws:states:us-east-1:123456789012:stateMachine:step-function-test --name test`

- describe execution
  `aws stepfunctions --endpoint http://localhost:8083 describe-execution --execution-arn arn:aws:states:us-east-1:123456789012:execution:step-function-test:test4`



## Short Hands (A.K.A. TL;DR)

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


## Main resources

https://docs.aws.amazon.com/step-functions/latest/dg/sfn-local-lambda.html#start-local-lambda

https://gist.github.com/heitorlessa/a087f4394b38562e1a0aa128386b38b8

https://aws.amazon.com/blogs/compute/working-with-aws-lambda-and-lambda-layers-in-aws-sam/

https://github.com/aws/aws-toolkit-vscode/blob/master/docs/debugging-nodejs-lambda-functions.md

_[Spawn docker containers from within a cotainer (SAM local on a docker container, able to create lambdas containers)](https://www.reddit.com/r/docker/comments/5qdhq7/spawning_containers_from_within_a_container/dcyieiy/)_


## Other resources

https://stackoverflow.com/questions/48273346/vscode-command-for-user-input-in-debug-launch-config

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-resource-function.html#sam-function-environment

https://code.visualstudio.com/docs/editor/variables-reference#_configuration-variables

https://code.visualstudio.com/docs/editor/variables-reference

https://stackoverflow.com/questions/39108476/ts-node-programmatic-usage-with-requirets-node-register

https://hackernoon.com/using-typescript-for-aws-lambda-a-how-to-guide-juf3yh3

https://medium.com/@henrikbjorn/using-typescript-with-aws-sam-local-4a73b4a9aef0

https://levelup.gitconnected.com/how-to-use-typescript-for-aws-lambda-in-3-steps-1996243547eb

https://www.blackpepper.co.uk/blog/getting-started-with-aws-sam

https://levelup.gitconnected.com/how-to-test-aws-lambda-locally-3395ca785276

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-specification-template-anatomy-globals.html

https://docs.docker.com/compose/environment-variables/


