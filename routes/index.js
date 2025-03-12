/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    // Default values for when user is not authenticated
    var roles = [];
    var isMsr = false;
    var isMember = false;
    var isMsr2 = false;
    var name = null;
    var username = null;

    // If authenticated, populate values from session
    if (req.session.account) {
        roles = req.session.account.idTokenClaims?.roles || [];
        isMsr = Array.isArray(roles) && roles.includes('msr');
        isMember = Array.isArray(roles) && roles.includes('member');
        isMsr2 = Array.isArray(roles) && roles.includes('msrlevel2');
        isMsr3 = Array.isArray(roles) && roles.includes('msr3');
        name = req.session.account.name;
        username = req.session.account.username !== '' ? req.session.account.username : req.session.account.name;
    }

    res.render('index', {
        title: 'UNFCU External ID Demo',
        isAuthenticated: req.session.isAuthenticated,
        username: username,
        name: name,
        isMsr: isMsr,
        isMember: isMember,
        isMsr2: isMsr2
    });
});

module.exports = router;