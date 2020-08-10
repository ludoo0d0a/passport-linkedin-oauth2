
// This sample code will make a request to LinkedIn's API to retrieve and print out some
// basic profile information for the user whose access token you provide.

const https = require('https');
const axios = require('axios').default;

const clientId = process.env.LINKEDIN_CLIENT_ID;
const clientSecret = process.env.LINKEDIN_CLIENT_SECRET;
const redirectUrl = 'http://localhost';
const state = 'aRandomHashDCEeFWf45A53sdfKef424CSRF'

const accessTokenUrl2legged = 'https://www.linkedin.com/oauth/v2/accessToken?grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}'
axios.defaults.baseURL = 'https://www.linkedin.com';

// https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow
// GET
const authorizationUrl = '/oauth/v2/authorization'
let accessToken = 'YOUR_ACCESS_TOKEN';
let code = 'YOUR_AUTHORIZATION_CODE';

axios.get(authorizationUrl, {
  params: {
    response_type: 'code',
    client_id: clientId,
    redirect_uri: redirectUrl,
    scope: ['r_liteprofile', 'r_emailaddress', 'w_member_social'],
    state: state
  }
})
.then(function (response) {
  console.log(response); // {code, state}
  code = response.code;
})
.catch(function (error) {
  console.log(error);
});

// Replace with access token for the r_liteprofile permission

const options = {
  host: 'api.linkedin.com',
  path: '/v2/me',
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'cache-control': 'no-cache',
    'X-Restli-Protocol-Version': '2.0.0'
  }
};

axios(options)
.then(function (response) {
  console.log(response);
})