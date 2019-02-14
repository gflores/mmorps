module.exports = {
  servers: {
    one: {
      "host": "52.163.81.49",
      "username": "gael",
      "password": "HappyPangolin!91113"
      // or pem file (ssh based authentication)
/*       "pem": "/home/gael/.ssh/id_rsa" */
    }
  },

  meteor: {
    name: 'mmorps',
    path: '../',

    docker: {
      image: 'abernix/meteord:base', // use this image if using Meteor 1.4+
      args:[ // lets you add/overwrite any parameter on the docker run command (optional)
      ],
      buildInstructions: [
        'RUN npm install node-pre-gyp -g'
      ]
    },

    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true
    },
    env: {
      ROOT_URL: 'http://www.blitzrps.com',
      MONGO_URL: 'mongodb://localhost/meteor'
    },
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {}
    }
  }
};