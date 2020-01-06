function camelToSnake(string) {
  return string.replace( /([a-z])([A-Z])/g, '$1_$2' ).toLowerCase();
};

function toSnake(string) {
  return string.split(' ').map(s => s.trim()).join('_').toLowerCase();
}

// ID UTIL
function generateUUID() { // Generates a unique ID
  return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16|0, v = c == `x` ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

function objectsArrayToObjectsHash(objectsArray, hashAttr) {
  return objectsArray.reduce((objectsHash, object) => {
    return {
      ...objectsHash,
      [object[hashAttr]]: object
    };
  }, {});
};

// STRING NORMALIZATION
// https://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
// _escapeString(str) {
//   return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
//     switch (char) {
//       case '\0':
//         return '\\0'
//       case '\x08':
//         return '\\b'
//       case '\x09':
//         return '\\t'
//       case '\x1a':
//         return '\\z'
//       case '\n':
//         return '\\n'
//       case '\r':
//         return '\\r'
//       case '"':
//       case "'":
//       case '\\':
//       case '%':
//         return '\\' + char // prepends a backslash to backslash, percent,
//                   // and double/single quotes
//     }
//   })
// }


function escapeStr(val) {
  val = val.replace(/[\0\n\r\b\t\\'"\x1a]/g, function (s) {
    switch (s) {
      case '\0':
        return '\\0';
      case '\n':
        return '\\n';
      case '\r':
        return '\\r';
      case '\b':
        return '\\b';
      case '\t':
        return '\\t';
      case '\x1a':
        return '\\Z';
      case `'`:
        return `''`;
      case `"`:
        return `""`;
      default:
        return '\\' + s;
    }
  });

  return val;
}

// JSON UTIL
function flattenJSON(data) {
  let result = {}
  function recurse (cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur
    } else if (Array.isArray(cur)) {
      for(let i = 0, l = cur.length; i < l; i++) {
        recurse(cur[i], prop + `[${i}]`)
        if (l == 0)
          result[prop] = []
      }
    } else {
      let isEmpty = true
      for (let p in cur) {
        isEmpty = false
        recurse(cur[p], prop ? prop + "." + p : p)
      }
      if (isEmpty && prop)
        result[prop] = {};
    }
  }
  recurse(data, "");
  return result;
}

function unflattenJSON(data) {
  "use strict"
  if (Object(data) !== data || Array.isArray(data))
    return data;
  let regex = /\.?([^.\[\]]+)|\[(\d+)\]/g,
    resultholder = {};
  for (let p in data) {
    let cur = resultholder,
        prop = "",
        m
    while (m = regex.exec(p)) {
        cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}))
        prop = m[2] || m[1]
    }
    cur[prop] = data[p]
  }
  return resultholder[""] || resultholder;
}

function normalizeResponse(res) {
  return {
    // config: res.config,
    data: res.data,
    headers: res.headers,
    // request: res.request,
    status: res.status,
    statusText: res.statusText
  };
};

// Mock Http
function reqFactory(body, params) {
  return (function(){
    const request = {
      body: body || {},
      params: params || {},
    };

    return request;
  }());
};

function resFactory() {
  return (function(){
    const response = {
      statusCode: undefined,
      data: undefined,
      status: (code) => {
        response.statusCode = code;
        return response;
      },
      send: (payload) => {
        response.data = payload;
        return response;
      },
      json: (payload) => {
        response.data = payload;
        return response;
      },
    };

    return response;
  }());
};


/*

Queue.js

A function to represent a queue
Created by Kate Morley - http://code.iamkate.com/ - and released under the terms
of the CC0 1.0 Universal legal code:
http://creativecommons.org/publicdomain/zero/1.0/legalcode

*/

/* Creates a new queue. A queue is a first-in-first-out (FIFO) data structure -
 * items are added to the end of the queue and removed from the front.
 */
function Queue() {
  // initialise the queue and offset
  var queue  = [];
  var offset = 0;
  // Returns the length of the queue.
  this.getLength = function(){
    return (queue.length - offset);
  }
  // Returns true if the queue is empty, and false otherwise.
  this.isEmpty = function(){
    return (queue.length == 0);
  }

  /* Enqueues the specified item. The parameter is:
   *
   * item - the item to enqueue
   */
  this.enqueue = function(item){
    queue.push(item);
  }

  /* Dequeues an item and returns it. If the queue is empty, the value
   * 'undefined' is returned.
   */
  this.dequeue = function(){
    // if the queue is empty, return immediately
    if (queue.length == 0) return undefined;
    // store the item at the front of the queue
    var item = queue[offset];
    // increment the offset and remove the free space if necessary
    if (++ offset * 2 >= queue.length){
      queue  = queue.slice(offset);
      offset = 0;
    }
    // return the dequeued item
    return item;
  }

  /* Returns the item at the front of the queue (without dequeuing it). If the
   * queue is empty then undefined is returned.
   */
  this.peek = function(){
    return (queue.length > 0 ? queue[offset] : undefined);
  }
}



// EXPORTS
//---------------------------------//
exports.camelToSnake = camelToSnake;
exports.toSnake = toSnake;
exports.generateUUID = generateUUID;
exports.objectsArrayToObjectsHash = objectsArrayToObjectsHash;
exports.escapeStr = escapeStr;
exports.unflattenJSON = unflattenJSON;
exports.flattenJSON = flattenJSON;
exports.normalizeResponse = normalizeResponse;
exports.reqFactory = reqFactory;
exports.resFactory = resFactory;
exports.Queue = Queue;
