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
const db = require('../db/certifiers')
const agents = require('../db/agents')
const users = require('./users')
const { BadRequest } = require('./errors')

const USER_OMIT_OPTION = ['pincode', 'address',]
const CERTIFIER_PICK_OPTIONS = ['pincode', 'address', 'publicKey']

const createCertifier = certifier => {
  return Promise.resolve()
    .then(() => {
      return agents.fetch(certifier.publicKey, null)
        .catch(() => {
          throw new BadRequest('Public key must match an Agent on blockchain')
        })
    })
    .then(() => {
      return db.insert(certifier)
        .catch(err => { throw new BadRequest(err.message) })
    })
    .catch(err => { throw err })
}

const update = (changes, { authedKey }) => {
  return Promise.resolve()
    .then(() => db.update(authedKey, changes))
    .catch(err => { throw err })
}


//=========================================
// Helpers 
//=========================================
const create = incomingData => {
  return Promise.resolve()
    .then(() => {
      createCertifier(_.pick(incomingData, CERTIFIER_PICK_OPTIONS))
      return users.create(_.omit(incomingData, USER_OMIT_OPTION))
    })
    .catch(err => { throw err })
}

module.exports = {
  create,
  update
}