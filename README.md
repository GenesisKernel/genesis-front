[![Throughput Graph](https://graphs.waffle.io/AplaProject/apla-front/throughput.svg)](https://waffle.io/AplaProject/apla-front/metrics/throughput)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![](https://tokei.rs/b1/github/AplaProject/apla-front)](https://github.com/AplaProject/apla-front)
![](https://reposs.herokuapp.com/?path=AplaProject/apla-front&style=flat)
[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/AplaProject?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)


## Apla-front
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You will find most of the information of how to use it there.

----------

## Installation
Project requires [Node.js](https://nodejs.org/) v6+ to run.

We use [yarn](https://yarnpkg.com/en/docs/install) as a package manager, so you will need to install yarn as well. Please refer to the instructions for your operating system.

Install the dependencies and devDependencies and start the server.

```bash
$ yarn install
$ yarn start
```

Start script will launch the development server which binds to http://127.0.0.1:7079 by default. You can also use start-desktop to debug the project in desktop environment

API binding can be customized to the value of your choice. Simply create a settings.json in your public directory. Example settings.json.dist is included in /public directory

### Example configuration

```json
{
    "defaultNetwork": "DEFAULT_NETWORK",
    "networks": [
        {
            "key": "DEFAULT_NETWORK",
            "name": "Default Network",
            "networkID": 100,
            "fullNodes": [
                "http://127.0.0.1:7079"
            ],
            "socketUrl": "",
            "activationEmail": "",
            "enableDemoMode": true,
            "disableSync": false
        }
    ]
}
```
- **defaultNetwork** - Key of the default network that will be connected automatically
- **networks.key** - Specifies a unique key for a network
- **networks.name** - A human readable network name that will be shown in the interface
- **networks.networkID** - Unique identificator that is imprinted in all transactions. Refer to the configuration of your go-apla instance
- **networks.fullNodes** - Prebuilt list of URLs that will be used for synchronization
- **networks.socketUrl** - Optional parameter that overrides Centrifugo connection endpoint. Default: provided by go-apla configuration
- **networks.activationEmail** - Optional parameter that will be shown to a user when there are no active endpoints to log in. Used for KYC
- **networks.enableDemoMode** - When set to true, will enable authorization using the guest key
- **networks.disableSync** - Optional parameter that disables synchronization of the full nodes. Unsafe, use with caution

Development server emits warnings and will report errors in readable format. You can hack around it, but it is suited only for development/testing. To use it in production environment you will need to build the project.

----------

## Build
Install the dependencies if you not did it already:
```bash
$ yarn install
```

Create your settings.json configuration file and build the project

### Example

```bash
$ yarn build
```

After building, redistributable files will be placed to the '/build' directory. You can serve it with any web-server of your choice. Settings file must be also placed there

----------

## Building desktop application
Install the dependencies if you not did it already:
```bash
$ yarn install
```

Create your settings.json configuration file and build the project

### Example

```bash
$ yarn build-desktop
```

When build process finishes you will need to package your application using "release". You will also need to specify "--publish never" so your project will not be published to github

Platforms can be specified with the combination of m/w/l arguments, where "m" stands for macOS, "w" for windows and "l" for linux

### Example

```bash
$ yarn release --publish never -mwl
```
Will release desktop applications for macOS, windows and linux

----------

### Questions?

Feel free to contact us if you experience any kind of problems while using Apla: hello@apla.io
