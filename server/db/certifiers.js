/**
 * Copyright 2017 Intel Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ----------------------------------------------------------------------------
 */
'use strict'

const _ = require('lodash')
const db = require('.')

const CERTIFIER_SCHEMA = {
    pincode: String,
    address: String,
    publicKey: String,
    '*': null
}

// Modified certifier schema with optional keys
const UPDATE_SCHEMA = _.mapKeys(CERTIFIER_SCHEMA, (_, key) => {
  if (key === '*' || key[0] === '?') return key
  return '?' + key
})

const query = query => db.queryTable('certifiers', query)

const insert = certifier => {
  return db.validate(certifier, CERTIFIER_SCHEMA)
    .then(() => db.insertTable('certifiers', certifier))
    .catch(err => {
        // Delete certifier, before re-throwing error
        return db.modifyTable('certifiers', certifiers => {
          return certifiers.get(certifier.publicKey).delete()
        })
          .then(() => { throw err })
      })
}

const update = (publicKey, changes) => {
  return db.validate(changes, UPDATE_SCHEMA)
    .then(() => db.updateTable('certifiers', publicKey, changes))
    .then(results => {
      // If changes did not change the resource, just fetch it
      if (results.unchanged === 1) {
        return db.queryTable('certifiers', certifiers => certifiers.get(publicKey), false)
      }

      const newCertifier = results.changes[0].new_val

      return newCertifier
    })
    .catch(err => { throw err })
}

module.exports = {
  query,
  insert,
  update
}