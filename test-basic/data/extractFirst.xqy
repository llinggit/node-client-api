xquery version "1.0-ml";
(:
 : Copyright (c) 2020 MarkLogic Corporation
 :
 : Licensed under the Apache License, Version 2.0 (the "License");
 : you may not use this file except in compliance with the License.
 : You may obtain a copy of the License at
 :
 :    http://www.apache.org/licenses/LICENSE-2.0
 :
 : Unless required by applicable law or agreed to in writing, software
 : distributed under the License is distributed on an "AS IS" BASIS,
 : WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 : See the License for the specific language governing permissions and
 : limitations under the License.
 :)

module namespace extractFirst = "http://marklogic.com/snippet/custom/extractFirst";

declare namespace search    = "http://marklogic.com/appservices/search";

declare default function namespace "http://www.w3.org/2005/xpath-functions";
declare option xdmp:mapping "false";

declare function extractFirst:snippet(
    $result    as node(),
    $ctsquery  as schema-element(cts:query),
    $transform as element(search:transform-results))
as element(search:snippet) {
    <search:snippet format="json">{
        concat('{first: "',string(($result//text())[1]),'"}')
    }</search:snippet>
};
