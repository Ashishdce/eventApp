const RoboHydraHead = require("robohydra").heads.RoboHydraHead;
const RoboHydraHeadStatic = require("robohydra").heads.RoboHydraHeadStatic;
const cookie = require("cookie");

let userLoginCredentials = require('../mock/userlogins.json');
const pageData = require('../mock/pageData.json');
const events = require('../mock/events.json');

exports.getBodyParts = function(conf) {
    return {
        heads: [
            new RoboHydraHead({
                path: '/vue/login',
                handler: function(req, res) {
                    res.headers['Access-Control-Allow-Origin'] = "*";
                    res.headers['Access-Control-Allow-Credentials'] = "true";
                    res.headers['Access-Control-Allow-Methods'] = "GET,HEAD,OPTIONS,POST,PUT";
                    res.headers['Access-Control-Allow-Headers'] = "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers";
                    if (req.method === 'POST') {
                        const reqData = JSON.parse(Object.keys(req.bodyParams)[0]);
                        if (!(reqData['email'] in userLoginCredentials)) {
                            res.write(JSON.stringify({ 'status': 'Failed', 'code': 401, 'message': 'Username does not exists. Sign Up...Its free' }));
                        } else if (reqData['email'] in userLoginCredentials && userLoginCredentials[reqData['email']]['password'] === reqData['password']) {
                            const data = userLoginCredentials[reqData['email']]['userDetails'];
                            const token = (Math.random() * 20).toString(32).replace('.', 'a');
                            userLoginCredentials[reqData['email']]['token'] = token;
                            res.headers['set-cookie'] = cookie.serialize('sessionId', data['firstname'] + data['lastname']);
                            res.write(JSON.stringify(token));

                        } else {
                            res.write(JSON.stringify({ 'status': 'Failed', 'code': 401, 'message': 'Username or password is incorrect. Try again.' }));
                        }
                    }
                    res.end();
                }
            }),
            new RoboHydraHead({
                path: '/vue/getUserInfo',
                handler: function(req, res) {
                    res.headers['Access-Control-Allow-Origin'] = "*";
                    res.headers['Access-Control-Allow-Credentials'] = "true";
                    res.headers['Access-Control-Allow-Methods'] = "GET,HEAD,OPTIONS,POST,PUT";
                    res.headers['Access-Control-Allow-Headers'] = "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers";
                    if (req.method === 'POST') {
                        const token = JSON.parse(Object.keys(req.bodyParams)[0]);
                        Object.keys(userLoginCredentials).forEach(key => {
                            if (userLoginCredentials[key]['token'] === token['token']) {
                                res.write(JSON.stringify(userLoginCredentials[key]['userDetails']));
                            }
                        })
                    }
                    res.end();
                }
            }),
            new RoboHydraHead({
                path: '/vue/pagedata',
                handler: function(req, res) {
                    res.headers['Access-Control-Allow-Origin'] = "*";
                    res.headers['Access-Control-Allow-Credentials'] = "true";
                    res.headers['Access-Control-Allow-Methods'] = "GET,HEAD,OPTIONS,POST,PUT";
                    res.headers['Access-Control-Allow-Headers'] = "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers";
                    res.write(JSON.stringify(pageData));
                    res.end();
                }
            }),
            new RoboHydraHead({
                path: '/vue/events',
                handler: function(req, res) {
                    res.headers['Access-Control-Allow-Origin'] = "*";
                    res.headers['Access-Control-Allow-Credentials'] = "true";
                    res.headers['Access-Control-Allow-Methods'] = "GET,HEAD,OPTIONS,POST,PUT";
                    res.headers['Access-Control-Allow-Headers'] = "Access-Control-Allow-Headers, Access-Control-Allow-Origin, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers";
                    res.write(JSON.stringify(events));
                    res.end();
                }
            })
        ]
    };
};