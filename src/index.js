'use strict'

const path = require('path')
const sqlite3 = require('sqlite3').verbose()
const reverse = require('./reverse')
const find = require('./location')

function Geocoder(options) {
  var geocoder = function(options) {
    this.options = options || {}

    if (this.options.database === undefined) {
      this.options.database = path.join(__filename, '../../data/db.sqlite')
    }

    this.db = new sqlite3.Database(this.options.database)
  }

  geocoder.prototype.reverse = function(latitude, longitude, callback) {
    return reverse(this, latitude, longitude, callback)
  }

  geocoder.prototype.find = function(locationName, callback) {
    return find(this, locationName, callback)
  }

  return new geocoder(options)
}

module.exports = Geocoder
