/*
 * Copyright (c) 2020 MarkLogic Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

const fs = require('fs');

const expect = require('chai').expect;

const testutil = require('../testutil');

const DescribedBundle = require("./DescribedBundle.js");

describe('jsdoc generation', function() {
  // merely confirming that the described class can be constructed
  const service = DescribedBundle.on(testutil.makeClient());

  // NOTE: must first use the gulp task to generate the jsDoc
  it('generated jsdoc', function(done) {
    const sourceAPI = './test-basic-proxy/doc/DescribedBundle.html';
    fs.readFile(sourceAPI, 'utf8', (err, data) => {
      if (err) {
        expect.fail(err.toString());
        done();
      } else {
        // TODO: parse and compare the HTML to the service.json and *.api declarations
        done();
      }
    });
  });
});
