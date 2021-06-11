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
        m('h1.mb-3', 'Agent Client'),
        m('h5',
          m('em',
            'Powered by ',
            
            m('a[href="https://livechain.in/"]',
              { target: '_blank' },
              "Livechain.in")),
        m('p',
            m("img", { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeTN7jEtKCexwvk6vS3TPK4wFBN0pvzQ9g_w&usqp=CAU"})
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
