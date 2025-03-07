/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

require('dotenv').config();

const TENANT_SUBDOMAIN = process.env.TENANT_SUBDOMAIN || 'unfcuappsInfraPOC';
const REDIRECT_URI = process.env.REDIRECT_URI || 'https://unfcudemo-fcg3bga8c5ejd3de.eastus2-01.azurewebsites.net/auth/redirect';
const POST_LOGOUT_REDIRECT_URI = process.env.POST_LOGOUT_REDIRECT_URI || 'https://unfcudemo-fcg3bga8c5ejd3de.eastus2-01.azurewebsites.net';

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL Node configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-node/docs/configuration.md
 */
const msalConfig = {
    auth: {
        clientId: process.env.CLIENT_ID || '93415181-5d5a-426d-b50c-07ed37833261', // 'Application (client) ID' of app registration in Microsoft Entra admin center - this value is a GUID
        authority: process.env.AUTHORITY || `https://unfcuappsInfraPOC.ciamlogin.com/`, // Replace the placeholder with your tenant name
        clientSecret: process.env.CLIENT_SECRET || 'BlL8Q~BI1Lg40ta-ee3g9raLbcvRoOMOwaFh1bXr', // Client secret generated from the app registration in Microsoft Entra admin center
    },
    system: {
        loggerOptions: {
            loggerCallback(loglevel, message, containsPii) {
                console.log(message);
            },
            piiLoggingEnabled: false,
            logLevel: 'Info',
        },
    },
};

module.exports = {
    msalConfig,
    REDIRECT_URI,
    POST_LOGOUT_REDIRECT_URI,
    TENANT_SUBDOMAIN,
};
