const config = {
    clientId: '08d55a470aef4302b9b3a82d93aa3f05', // available on the app page
    clientSecret: 'c8dabbabf9fb4dfcb835dc3b8e8f26fb', // click "show client secret" to see this
    redirectUrl: 'exp://127.0.0.1:19006', // the redirect you defined after creating the app
    scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
    serviceConfiguration: {
        authorizationEndpoint: 'https://accounts.spotify.com/authorize',
        tokenEndpoint: 'https://accounts.spotify.com/api/token',
    },
};

export default config;