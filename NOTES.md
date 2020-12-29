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

https://aws.amazon.com/blogs/compute/the-aws-serverless-application-model-cli-is-now-generally-available/

https://docs.aws.amazon.com/step-functions/latest/dg/sfn-local-lambda.html#start-local-lambda

https://gist.github.com/heitorlessa/a087f4394b38562e1a0aa128386b38b8

https://aws.amazon.com/blogs/compute/working-with-aws-lambda-and-lambda-layers-in-aws-sam/

https://github.com/aws/aws-toolkit-vscode/blob/master/docs/debugging-nodejs-lambda-functions.md

_[Spawn docker containers from within a container (SAM local on a docker container, able to create lambdas containers)](https://www.reddit.com/r/docker/comments/5qdhq7/spawning_containers_from_within_a_container/dcyieiy/)_


## Docker related resources

https://serverfault.com/questions/1018655/cant-ping-access-docker-host-on-172-17-0-1-from-inside-a-container

https://serverfault.com/questions/705192/iptables-rule-set-so-that-a-docker-container-can-access-a-service-on-a-host-ip

https://github.com/docker/for-linux/issues/264#issuecomment-714253414

https://stackoverflow.com/questions/31324981/how-to-access-host-port-from-docker-container/61424570#61424570

https://dev.to/natterstefan/docker-tip-how-to-get-host-s-ip-address-inside-a-docker-container-5anh

## Docker networks and service discovery

https://stackoverflow.com/questions/54798633/how-to-connect-rds-instance-when-running-sam-locally/54857559

https://stackoverflow.com/questions/46781444/docker-service-discovery-does-not-work-with-default-bridge

https://docs.docker.com/config/containers/container-networking/

https://collabnix.com/demonstrating-docker-1-12-service-discovery-with-docker-compose/

https://docs.docker.com/network/network-tutorial-standalone/

https://forums.docker.com/t/set-default-network-name-for-compose/36779/2

---

https://serverfault.com/questions/634823/in-which-order-are-rules-of-custom-iptables-chains-evaluated

https://www.howtogeek.com/177621/the-beginners-guide-to-iptables-the-linux-firewall/

https://www.cyberciti.biz/faq/how-to-list-all-iptables-rules-in-linux/

https://stackoverflow.com/questions/30383845/what-is-the-best-practice-of-docker-ufw-under-ubuntu

https://www.informit.com/articles/article.aspx?p=421057&seqNum=4

https://medium.com/faun/run-the-containers-in-default-bridge-network-with-docker-compose-yml-f8e57590722

https://docs.docker.com/network/bridge/#connect-a-container-to-a-user-defined-bridge

https://github.com/docker/for-win/issues/2402

https://stackoverflow.com/questions/29076194/using-add-host-or-extra-hosts-with-docker-compose

---

https://medium.com/monsoon-engineering/running-aws-sam-in-a-docker-container-2491596672c2

https://dev.to/martzcodes/aws-sam-local-with-postgres-ogh

https://github.com/docker/compose/issues/2999

https://nickjanetakis.com/blog/docker-tip-65-get-your-docker-hosts-ip-address-from-in-a-container

https://stackoverflow.com/questions/24319662/from-inside-of-a-docker-container-how-do-i-connect-to-the-localhost-of-the-mach#:~:text=Use%20%2D%2Dnetwork%3D%22host%22,for%20Linux%2C%20per%20the%20documentation.

https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/sam-cli-command-reference-sam-local-start-lambda.html

https://stackoverflow.com/questions/48104665/aws-sam-local-environment-variables

https://stackoverflow.com/questions/11580961/sending-command-line-arguments-to-npm-script

https://github.com/ruyadorno/ntl

https://github.com/aws/aws-sam-cli/issues/1163#issuecomment-557874976

https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/parameters-section-structure.html


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


