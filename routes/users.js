/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

const express = require('express');
const router = express.Router();

// custom middleware to check auth state
function isAuthenticated(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/signin'); // redirect to sign-in route
    }
    next();
};

router.get('/id',
    isAuthenticated, // check if user is authenticated
    async function (req, res, next) {
        // Check if roles exist in idTokenClaims and determine user type
        const roles = req.session.account.idTokenClaims?.roles || [];
        const isMsr = Array.isArray(roles) && roles.includes('msr');
        const isMsr2 = Array.isArray(roles) && roles.includes('msrlevel2');
        const isMember = Array.isArray(roles) && roles.includes('member');
        const username = req.session.account?.username !== '' ? req.session.account?.username : req.session.account?.name;

        res.render('id', { 
            idTokenClaims: req.session.account.idTokenClaims,
            isMsr: isMsr,
            isMember: isMember
            username: username
        });
    }
);

module.exports = router;