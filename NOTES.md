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


