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

const m = require('mithril')

const Dashboard = {
  view (vnode) {
    return [
      m('.header.text-center.mb-4',
        m('h4', 'Welcome To'),
        m('h1.mb-3', 'Certifying Client'),
        m('h5',
          m('em',
            'Powered by ',
            
            m('a[href="https://livechain.in/"]',
              { target: '_blank' },
              "Livechain.in")),
        m('p',
            m("img", { src: "data:image/png;base64,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"})
            )
              
              ))
            // ,
    //   m('.blurb',
    //     m('p',
    //        m("img", { src: "https://www.kindpng.com/picc/m/418-4187833_factory-clipart-manufacturing-company-manufacturing-facility-factory-icon.png"})
    //      ))
    ]
  }
}

module.exports = Dashboard
