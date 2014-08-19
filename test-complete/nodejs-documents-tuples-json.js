/*
 * Copyright 2014 MarkLogic Corporation
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
var should = require('should');

var testconfig = require('../etc/test-config.js');

var marklogic = require('../');
var q = marklogic.queryBuilder;
var t = marklogic.valuesBuilder;

var db = marklogic.createDatabaseClient(testconfig.restReaderConnection);
var dbWriter = marklogic.createDatabaseClient(testconfig.restWriterConnection);

describe('Document query test', function(){
  before(function(done){
    this.timeout(3000);
    dbWriter.documents.write({
      uri: '/test/query/matchDir/doc1.json',
      collections: ['matchCollection1'],
      contentType: 'application/json',
      content: {
        title: 'Vannevar Bush',
        popularity: 5,
        id: '0011',
        date: '2005-01-01',
        price: {
             amt: 0.1
           },
        values: [{score: 56.7}, {rate: 3}],
        p: 'Vannevar Bush wrote an article for The Atlantic Monthly'
        }
      }, { 
      uri: '/test/query/matchDir/doc2.json',
      collections: ['matchCollection1', 'matchCollection2'],
      contentType: 'application/json',
      content: {
        title: 'The Bush article',
        popularity: 4,
        id: '0012',
        date: '2006-02-02',
        price: {
             amt: 0.12
           },
        values: [{score: 92.45}, {rate: 5}],
        p: 'The Bush article described a device called a Memex'
        }
      }, { 
      uri: '/test/query/matchDir/doc3.json',
      collections: ['matchCollection2'],
      contentType: 'application/json',
      content: {
        title: 'For 1945',
        popularity: 3,
        id: '0013',
        date: '2007-03-03',
        price: {
             amt: 1.23
           },
        values: [{score: 33.56}, {rate: 1}],
        p: 'For 1945, the thoughts expressed in the Atlantic Monthly were groundbreaking'
        }
      }, { 
      uri: '/test/query/matchDir/doc4.json',
      collections: [],
      contentType: 'application/json',
      content: {
        title: 'Vannevar served',
        popularity: 5,
        id: '0024',
        date: '2008-04-04',
        price: {
             amt: 12.34
           },
        values: [{score: 12.34}, {rate: 3}],
        p: 'Vannevar served as a prominent policymaker and public intellectual'
        }
      }, { 
        uri: '/test/query/matchList/doc5.json',
        collections: ['matchList'],
        contentType: 'application/json',
        content: {
          title: 'The memex',
          popularity: 5,
          id: '0026',
          date: '2009-05-05',
          price: {
               amt: 123.45
             },
          values: [{score: 77.678}, {rate: 2}],
          p: 'The Memex, unfortunately, had no automated search feature'
          }
        }).
    result(function(response){done();}, done);
  });

  it('should do values on score', function(done){
    db.values.read(
      t.fromIndexes(
        t.range('score', 'xs:double')
        ).
      where(
        t.word('title', 'bush')
        )
      ).result(function(response) {
        console.log(JSON.stringify(response, null, 4));
        done();
      }, done);
  });

  it('should do sum aggregates', function(done){
    db.values.read(
      t.fromIndexes(
        t.range('score', 'xs:double')
        ).
      where(
        t.word('title', 'bush')
        ).
      aggregates('sum')
      ).result(function(response) {
        console.log(JSON.stringify(response, null, 4));
        done();
      }, done);
  });

  it('should do correlation and covariance aggregates', function(done){
    db.values.read(
      t.fromIndexes(
        t.range('rate', 'xs:int'),
        t.range(t.property('popularity'), t.datatype('int'))
        ).
      where(
        t.word('id', '00*', q.termOptions('wildcarded'))
        ).
      aggregates('correlation', 'covariance')
      ).result(function(response) {
        console.log('Correlation:');
        console.log(JSON.stringify(response, null, 4));
        done();
      }, done);
  });

  it('should do max, min, sum, average aggregates', function(done){
    db.values.read(
      t.fromIndexes(
        t.range(t.property('popularity'), t.datatype('int'))
        ).
      where(
        t.word('id', '00*', q.termOptions('wildcarded'))
        ).
      aggregates('max', 'min', 'sum', 'avg')
      ).result(function(response) {
        console.log('Max Min Sum Avg:');
        console.log(JSON.stringify(response, null, 4));
        done();
      }, done);
  });

});
