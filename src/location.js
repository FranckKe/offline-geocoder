'use strict'

function find(geocoder, locationName, callback) {
  return new Promise(function(resolve, reject) {
    const query = `SELECT * FROM everything WHERE name = $locationName LIMIT 1 COLLATE NOCASE`

    geocoder.db.all(query, {
      $locationName: locationName
    }, function(err, rows) {
      if (err) {
        if (typeof (callback) === 'function') {
          callback(err, undefined)
        } else if (typeof (reject) === 'function') {
          reject(err)
        }
      } else {
        const result = formatResult(rows)
        if (typeof (callback) === 'function') {
          callback(undefined, result)
        } else if (typeof (resolve) === 'function') {
          resolve(result)
        }
      }
    })
  })
}

function formatResult(rows) {
  const row = rows[0]

  if (row === undefined) {
    return undefined
  } else {
    return format(row)
  }
}

function format(result) {
  // Construct the formatted name consisting of the name, admin1 name and
  // country name. Some features don't have an admin1, and others may have the
  // same name as the feature, so this handles that.
  let nameParts = []
  nameParts.push(result.name)
  if (result.admin1_name && result.admin1_name !== result.name) {
    nameParts.push(result.admin1_name)
  }
  nameParts.push(result.country_name)
  const formattedName = nameParts.join(', ')

  return {
    id: result.id,
    name: result.name,
    formatted: formattedName,
    country: {
      id: result.country_id,
      name: result.country_name
    },
    admin1: {
      id: result.admin1_id,
      name: result.admin1_name
    },
    coordinates: {
      latitude: result.latitude,
      longitude: result.longitude
    }
  }
}

function Find(geocoder, locationName, callback) {
  return find(geocoder, locationName, callback)
}

module.exports = Find
