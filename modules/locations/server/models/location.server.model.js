'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Location Schema
 */
var LocationSchema = new Schema({
  name: {
    type: String,
    default: '',
    required: 'Please fill in Location\'s name',
    trim: true
  },
  
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

mongoose.model('Location', LocationSchema);
