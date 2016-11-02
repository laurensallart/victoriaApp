'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Session = mongoose.model('Session'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Session
 */
exports.create = function(req, res) {
  var session = new Session(req.body);
  session.user = req.user;

  session.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(session);
    }
  });
};

/**
 * Show the current Session
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var session = req.session ? req.session.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  session.isCurrentUserOwner = req.user && session.user && session.user._id.toString() === req.user._id.toString() ? true : false;

  res.jsonp(session);
};

/**
 * Update a Session
 */
exports.update = function(req, res) {
  var session = req.session ;

  session = _.extend(session , req.body);

  session.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(session);
    }
  });
};

/**
 * Delete an Session
 */
exports.delete = function(req, res) {
  var session = req.session ;

  session.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(session);
    }
  });
};

/**
 * List of Sessions
 */
exports.list = function(req, res) { 
  Session.find().sort('-created').populate('user', 'displayName').exec(function(err, sessions) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(sessions);
    }
  });
};

/**
 * Session middleware
 */
exports.sessionByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Session is invalid'
    });
  }

  Session.findById(id).populate('user', 'displayName').exec(function (err, session) {
    if (err) {
      return next(err);
    } else if (!session) {
      return res.status(404).send({
        message: 'No Session with that identifier has been found'
      });
    }
    req.session = session;
    next();
  });
};
