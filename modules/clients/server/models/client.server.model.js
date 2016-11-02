'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Client Schema
 */
var ClientSchema = new Schema({
  first_name: {
    type: String,
    default: '',
    required: 'Please fill in clients first name',
    trim: true
  },
  last_name: {
    type: String,
    default: '',
    required: 'Please fill in clients first name',
    trim: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    default: '',
  },
  birthdate: {
    type: Date
  },
  health_insurance: {
    type: String,
    trim: true,
    default: ''
  },
  profileImageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  location: {
    type: Schema.ObjectId,
    ref: 'Location'
  },
  sessions: [{
    type: Schema.ObjectId,
    ref: 'Session'
  }],
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Client', ClientSchema);
