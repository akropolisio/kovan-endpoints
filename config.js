const config = {
    // The exposed port for the endpoints server.
    port: 8080,
    kovan: {
        // The port forwarding to the kovan node.
        port: 8546,
        host: 'localhost',
        // The owner of dummy tokens, etc. on kovan node.
        owner: '0x84e2229ec0c4031e7ceb78aaaa8421e48022d0c3',
        gas: 4000000
    }
};

module.exports = config;