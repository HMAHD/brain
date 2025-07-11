#Docker #RabbitMQ
# Implement RabbitMQ on Docker in 20 minutes
Here at Architect, it’s no secret that we love portable microservices. And what better way to make your services portable than by decoupling their interactions?

Today we talk about decoupling your services using a classic communication pattern: the message queue. In this tutorial, we’ll show you how to get our favorite open source message broker–RabbitMQ–up and running in just 20 minutes. Then we’ll use Architect to deploy the stack to both your local and remote environments.

If you’re following along with this tutorial at home, you’ll need a few pre-reqs:

-   [Docker](https://docs.docker.com/get-docker/)
-   [Node](https://nodejs.org/en/) >= 8.2.0
-   [Python](https://www.python.org/) >= 3
-   [Architect](https://cloud.architect.io/signup)

## RabbitMQ Instance with Docker[](https://www.architect.io/blog/2021-01-19/rabbitmq-docker-tutorial#rabbitmq-instance-with-docker)[](https://www.architect.io/blog/2021-01-19/rabbitmq-docker-tutorial/#rabbitmq-instance-with-docker)

First, let’s pull the RabbitMQ docker image. We’ll use the `3-management` version, so we get the Management plugin pre-installed.

```
docker pull rabbitmq:3-management
```

Now let’s stand it up. We’ll map port `15672` for the management web app and port `5672` for the message broker.

```
docker run --rm -it -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

Assuming that ran successfully, you’ve got an instance of RabbitMQ running! Bounce over to [http://localhost:15672](http://localhost:15672/) to check out the management web app.

Log in using the default username (`guest`) and password (`guest`) and explore the management app a little bit. Here you can see an overview of your RabbitMQ instance and the message broker’s basic components: Connections, Channels, Exchanges, and Queues.

## Send Messages to RabbitMQ from a Producer[](https://www.architect.io/blog/2021-01-19/rabbitmq-docker-tutorial#send-messages-to-rabbitmq-from-a-producer)[](https://www.architect.io/blog/2021-01-19/rabbitmq-docker-tutorial/#send-messages-to-rabbitmq-from-a-producer)

RabbitMQ is only interesting if we can send messages, so let’s create an example publisher to push messages to RabbitMQ. In a new session (keep RabbitMQ running), we’ll use the following directory structure:

```
mkdir -p rabbitmq/rabbitmq-producer
mkdir -p rabbitmq/rabbitmq-consumer
```

Our publisher will be a simple Node.js Express web application. Use the Express app generator to bootstrap a simple Express app. We’ll use the `amqplib` Node library, the recommended AMQP client.

```
cd rabbitmq/rabbitmq-producer
npx express-generator
npm install
npm install amqplib
```

The plan is to add a route that accepts requests to `POST /message` with a body that looks something like this: `{'message': 'my message'}`. That route will publish each message it receives to our RabbitMQ instance.

First, create a new file called `message.js` next to `index.js`.

Import `amqplib`, set the URL to the location of the RabbitMQ instance, and give our queue a name:

```
var express = require('express');
var router = express.Router();

var amqp = require('amqplib/callback_api');

const url = 'amqp://localhost';
const queue = 'my-queue';
```

Next, initialize the connection:

```
let channel = null;
amqp.connect(url, function (err, conn) {
  if (!conn) {
    throw new Error(`AMQP connection not available on ${url}`);
  }
  conn.createChannel(function (err, ch) {
    channel = ch;
  });
});
```

And it’s important that we not forget to add an exit handler to close the channel:

```
process.on('exit', code => {
  channel.close();
  console.log(`Closing`);
});
```

Now for the meat. We’ll add a route that receives the message, converts the `body.message` string into a Buffer, and sends it to the queue:

```
router.post('/', function (req, res, next) {
  channel.sendToQueue(queue, new Buffer.from(req.body.message));
  res.render('index', { response: `Successfully sent: ${req.body.message}` });
});

module.exports = router;
```

Last, we’ll need to register our new route in `app.js`. We’ll put it underneath the existing index route, and we’ll nest our routes under `/message`:

```
var messagesRouter = require('./routes/message');

app.use('/', indexRouter);
app.use('/message', messagesRouter);
```

We’ll also add a simple HTML form to our view to post messages to the `/messages` endpoint. Replace `index.js` with the following:

```
extends layout

block content
  h1= 'Example RabbitMQ Producer'

  div
    form(action='/message',method='post')
      div.input
          span.label Message:&emsp;
          input(type="text", name="message")
          span.actions &emsp;
            input(type="submit", value="Send")

  div
    p= response
```

That should do it! See the full Express app [source code here](https://github.com/architect-team/architect-cli/tree/tutorials/rabbit-mq-1/examples/rabbitmq/rabbit-producer)

Now we can run the sample producer app:

```
npm start
```

And we can visit it here: [http://localhost:3000](http://localhost:3000/).

Try sending a message from the browser. It should send a `POST` HTTP request to the Express app, which will subsequently stick it on the queue. If you navigate to the RabbitMQ management app, you should see traffic coming through [http://localhost:15672](http://localhost:15672/#/).

## Receive Messages from RabbitMQ with a Consumer[](https://www.architect.io/blog/2021-01-19/rabbitmq-docker-tutorial#receive-messages-from-rabbitmq-with-a-consumer)[](https://www.architect.io/blog/2021-01-19/rabbitmq-docker-tutorial/#receive-messages-from-rabbitmq-with-a-consumer)

Now that we’re publishing messages let’s see if we can receive them with a consumer application.

We’ll use Python for our sample consumer application. This illustrates the flexibility that a message queue introduces to our stack. While we wouldn’t suggest a multi-language stack just for the hell of it, using AMQP for inter-process communication does give us the polyglot option in a pinch!

In a new session (keep RabbitMQ and the producer running):

```
cd rabbitmq/rabbitmq-consumer
touch consumer.py
touch requirements.txt
```

We’ll use `pika`, a recommended AMQP Python client:

```
pip install 'pika==1.1.0'
echo 'pika == 1.1.0' > requirements.txt
```

In `consumer.py`, first import `pika`:

```
import pika
```

And just like we did in the producer app, set the AMQP host and the queue name that our app will listen on:

```
host = 'localhost'
queue = 'my-queue'
```

Next, define a method for handling the messages coming off the queue. For the sake of this tutorial, our app will simply log all received messages to stdout:

```
def on_message(ch, method, properties, body):
    message = body.decode('UTF-8')
    print(message)
```

Let’s create a `main()` method for the core logic. Here we create the connection and ensure the queue exists. Last, we pass in the message handler and start consuming.

```
def main():
    connection_params = pika.ConnectionParameters(host=host)
    connection = pika.BlockingConnection(connection_params)
    channel = connection.channel()

    channel.queue_declare(queue=queue)

    channel.basic_consume(queue=queue, on_message_callback=on_message, auto_ack=True)

    print('Subscribed to ' + queue + ', waiting for messages...')
    channel.start_consuming()
```

Finally, call the `main()` method:

```
if __name__ == '__main__':
    main()
```

See the full Python consumer app [source code here](https://github.com/architect-team/architect-cli/blob/tutorials/rabbit-mq-1/examples/rabbitmq/rabbit-consumer/consumer.py).

Now run the consumer:

```
python consumer.py
```

If we navigate back to our [producer webapp](http://localhost:3000/), we can publish a message. The browser app posts the message to our Node Express server, which publishes the message to RabbitMQ. If you’re watching the logs in our Python command line consumer app, you should see the message come across. Works like a charm!

Queues are a nifty decoupling mechanism. We’ve got a Node app and a Python app seamlessly communicating! Even better- neither one depends on the uptime of the other. Try killing the consumer application and then publish a message from the producer. Now restart the Python consumer. You should see the message come through! No traffic was lost while the consumer was down.

## Deploy RabbitMQ with Docker[](https://www.architect.io/blog/2021-01-19/rabbitmq-docker-tutorial#deploy-rabbitmq-with-docker)[](https://www.architect.io/blog/2021-01-19/rabbitmq-docker-tutorial/#deploy-rabbitmq-with-docker)

We already have three components in our stack: the web app producer, the message broker, and the command line consumer. How are we going to deploy this stack into a remote or production environment?

First, let’s make these applications a little bit more portable using docker. The RabbitMQ container is already Dockerized, so we’ll create Dockerfiles for both the Express server and the Python consumer.

First, the producer Dockerfile:

```
cd rabbitmq/rabbit-producer
touch Dockerfile
```

Add the following contents:

```
FROM node:14

WORKDIR /usr/src/app

## copying package.json and npm install before copying directory saves time w/ caching
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]
```

Adding a `.dockerignore` file next to the producer `Dockerfile` will save us some build time here too:

```
node_modules
npm-debug.log
```

Next, add the consumer Dockerfile:

```
cd rabbitmq/rabbit-consumer
touch Dockerfile
```

Add the following:

```
FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD [ "python", "-u", "consumer.py" ]
```

Let’s fire them all up locally. First, in one session, we’ll run RabbitMQ:

```
docker run --rm -it -p 15672:15672 -p 5672:5672 rabbitmq:3-management
```

Next, open up another session and run the producer. We’ll map port 3000, so we can access our Express app.

```
cd rabbitmq/rabbit-producer
docker docker build -t rabbit-producer .
docker run -it --rm -p 3000:3000 rabbit-producer
```

Uh oh… that crashed. Looks like we got an error:

```
Error: AMQP connection not available on amqp://localhost
```

This makes sense: `localhost` no longer resolves to RabbitMQ now that we’re running the producer inside a docker container. The RabbitMQ instance is running in a different container! We might make this work by changing the URL to `host.docker.internal`, but this is just as brittle: now we can’t run the producer without docker. Further, once we try to deploy this remotely, we’ll need to change this again.

This sounds like a good candidate for an environment variable! So let’s factor it out. While we’re at it, let’s do the same for the queue name since this is liable to change across environments as well.

In our Node.js producer `message.js`, we’ll change the url and queue:

```
const url = `amqp://${process.env.AMQP_HOST}`;
const queue = process.env.QUEUE_NAME;
```

Likewise, in our Python `consumer.py`, we’ll do the same (you’ll need to `import os` at the top of the file).

```
host = os.environ.get('AMQP_HOST')
queue = os.environ.get('QUEUE_NAME')
```

Be sure the `rabbitmq` docker container is still running in another shell. Now, in a new shell, we should be able to run the producer and pass in the environment variables:

```
cd rabbitmq/rabbit-producer
docker build -t rabbit-producer .
docker run -it --rm -p 3000:3000 -e QUEUE_NAME='my-queue' -e AMQP_HOST='host.docker.internal' rabbit-producer
```

Keep the producer running and open up a new shell. Then run the consumer:

```
cd rabbitmq/rabbit-consumer
docker build -t rabbit-consumer .
docker run -it --rm -e QUEUE_NAME='my-queue' -e AMQP_HOST='host.docker.internal' rabbit-consumer
```

Now, if you navigate to [http://localhost:3000](http://localhost:3000/), you should be able to publish a message and watch that messages flow!

## Deploy RabbitMQ with Docker and Architect[](https://www.architect.io/blog/2021-01-19/rabbitmq-docker-tutorial#deploy-rabbitmq-with-docker-and-architect)[](https://www.architect.io/blog/2021-01-19/rabbitmq-docker-tutorial/#deploy-rabbitmq-with-docker-and-architect)

By Dockerizing our services, we’ve taken a great step toward a more portable application.

But deploying these services remotely still requires several steps with manual configuration. While Docker makes individual services more portable, [it doesn’t quite do the same for the full stack.](https://www.architect.io/blog/the-feature-docker-forgot#make-apps-portable-with-network-awareness) Docker Compose gets us some of the way there for local development, but an important principle of portable application development is that we operate our services the same way, regardless of the environment! A developer shouldn’t have to change the way they deploy services between local and remote environments. [Architect](https://cloud.architect.io/signup) solves that.

Using Architect to make a fully deployable stack is easy:

1.  Mark up your services with a YML file
2.  Deploy

If you haven’t signed up for Architect yet, [do it now](https://cloud.architect.io/signup)! It’s fast, free, and we’ll blow you away with our deploy process!

Download the Architect CLI and log in to Architect Cloud:

```
npm install -g @architect-io/cli
architect login
```

To get started, we’ve composed an example [architect.yml](https://github.com/architect-team/architect-cli/blob/tutorials/rabbit-mq-2/examples/rabbitmq/architect.yml) for this rabbitmq stack. You can copy it to your directory with:

```
cd rabbitmq
curl https://raw.githubusercontent.com/architect-team/architect-cli/tutorials/rabbit-mq-2/examples/rabbitmq/architect.yml > architect.yml
```

When you registered with Architect Cloud, you were prompted to create an account. Change the top line of the `architect.yml` to match your new account name:

```
name: <your-account-name>/rabbitmq
```

Now, deploying the example RabbitMQ stack on your local environment becomes as easy as:

```
architect link architect.yml
architect dev <your-account-name>/rabbitmq:latest -p QUEUE_NAME=my-queue -i app:app mgmt:mgmt
```

Then navigate to [app.localhost](http://app.localhost/) to see your running producer or [mgmt.localhost](http://mgmt.localhost/) to see the RabbitMQ management webapp.

To deploy the same app to a remote staging or production environment, first register it with Architect Cloud:

```
architect register architect.yml -t latest
```

Then deploy with a similar command:

```
architect deploy <your-account-name>/rabbitmq:latest -a <your-account-name> -e example-environment -p QUEUE_NAME=my-queue -i app:app mgmt:mgmt
```

Architect Cloud will generate a deployment diff and prompt you to review it. Press `Y` to continue and deploy. Architect is now deploying your RabbitMQ stack–producer, consumer, and broker–to a remote Kubernetes cluster.

You can watch the deployment unfold here: [https://cloud.architect.io/<your-account-name>/environments/example-environment/](https://cloud.architect.io/%3Cyour-account-name%3E/environments/example-environment/)

While you’re waiting for that deployment to complete, you can also explore deploying this stack to your infrastructure by registering your AWS account or Kubernetes Cluster with Architect: [https://cloud.architect.io/<your-account-name>/platforms/new](https://cloud.architect.io/%3Cyour-account-name%3E/platforms/new).

Once the deployment completes, you should be able to see the message consumer and broker running live:

`https://app.example-environment..arc.domains/`

Likewise, your RabbitMQ management interface:

`https://mgmt.example-environment.<your-account-name>.arc.domains/`

_Note: it takes a few minutes for new SSL certificates to propagate, so domains may appear to be insecure initially. Rest assured, they will propagate._

Finally, to clean up this environment and break down your deployed services, use:

```
architect destroy -a <your-account-name> -e example-environment
```