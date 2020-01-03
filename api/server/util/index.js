// ID UTIL
function generateUUID() { // Generates a unique ID
  return `xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16|0, v = c == `x` ? r : (r&0x3|0x8);
    return v.toString(16);
  });
}

// STRING NORMALIZATION
// https://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
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


// EXPORTS
//---------------------------------//
exports.generateUUID = generateUUID;
exports.escapeStr = escapeStr;
exports.unflattenJSON = unflattenJSON;
exports.flattenJSON = flattenJSON;
exports.reqFactory = reqFactory;
exports.resFactory = resFactory;
