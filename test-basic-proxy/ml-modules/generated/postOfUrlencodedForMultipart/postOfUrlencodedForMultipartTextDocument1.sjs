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
// declareUpdate(); // Note: uncomment if changing the database state

var param1; // instanceof xs.int+
const inspector = require('/dbf/test/testInspector.sjs');
const errorList = [];
const funcdef   = {
  "functionName" : "postOfUrlencodedForMultipartTextDocument1",
  "params" : [ {
    "name" : "param1",
    "datatype" : "int",
    "multiple" : true,
    "nullable" : false
  } ],
  "return" : {
    "datatype" : "textDocument",
    "multiple" : true,
    "nullable" : true
  }
};
let fields = {};
fields = inspector.addField(
  '/dbf/test/postOfUrlencodedForMultipart/postOfUrlencodedForMultipartTextDocument1', fields, 'param1', param1
  );

fields = inspector.getFields(funcdef, fields, errorList);
inspector.makeResult('/dbf/test/postOfUrlencodedForMultipart/postOfUrlencodedForMultipartTextDocument1', funcdef, fields, errorList);
