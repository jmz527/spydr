export const camelToKebab = (string) => {
  return string.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase();
};

export const camelToSnake = (string) => {
  return string.replace( /([a-z])([A-Z])/g, '$1_$2' ).toLowerCase();
};

export const kebabToCamel = (string) => {
  return string.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
};

export const snakeToCamel = (string) => {
  return string.replace(/_([a-z])/g, (g) => g[1].toUpperCase());
};

export const toCamelCase = (str) => {
  if (!str || !str.length) {
    return '';
  }
  let newStr = str
    .replace(/[\[\]]/g, '_')
    .replace(/[^A-z0-9]+/g, '_')
    .replace(/[-_]+([A-z])/g, (g) => g[1].toUpperCase());
  newStr = newStr.charAt(0).toLowerCase() + newStr.slice(1);
  return newStr;
};

export const toTitleCase = str => str.replace(/\w\S*/g, txt => {
  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
});

export const camelToLabelCase = str => {
  return str.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
};

// checks if an object's prop exists and is of a given type
export const propCheck = (obj, prop, type) => {
  return obj.hasOwnProperty(prop) && typeof obj[prop] === type;
};

export const isEmptyObj = (obj) => Object.keys(obj).length === 0;

export const clone = (object, projection = key => key) => {
  if (object === null || typeof object !== 'object') {
    return object;
  }

  let newObject = object.constructor();
  for (let key in object) {
    newObject[projection(key)] = clone(object[key], projection);
  }

  return newObject;
};

export const duplicateAttr = function(object, attr, dupAttr) {
  return { ...object, [dupAttr]: object[attr] };
};

export const objectsArrayToIdsArray = (objectsArray, idAttr = 'id', predicate = null) => {
  if (predicate) {
    return objectsArray.filter(predicate).map(object => object[idAttr]);
  } else {
    return objectsArray.map(object => object[idAttr]);
  }
};

export const objectsArrayToObjectsHash = (objectsArray, hashAttr) => {
  return objectsArray.reduce((objectsHash, object) => {
    return {
      ...objectsHash,
      [object[hashAttr]]: object
    };
  }, {});
};

export const filterObjectByKey = (object, array) => {
  // filterObjectByKey takes in an object & an array of white-listed keys, and it filters out
  // the key-values of the object that are not included in the key array, returning a new object
  return Object.keys(object).filter((key) => {
    return array.includes(key);
  }).reduce((obj, key) => {
    obj[key] = object[key];
    return obj;
  }, {});
};

export const reduceObjectUsingCorrelatingObjectArray = (object, objectArray) => {
  // creates an array of keys out of the given object (which are the ids)
  // with that key array, we create a new object by cross-referencing it with the objectArray
  // it does this by stripping out the matching ids
  return Object.keys(object).reduce((acc, cur) => objectArray.some(req => req.id === cur) ? acc : {...acc, [cur]: object[cur]}, {});
};

/*
 * Upsert a new array of objects in an existing array of objects based on a given attribute
 * guarantor of the unicity.
 * Example: 'id', 'address', etc.
 */
export const upsert = (existingObjectArray, newObjectArray, baseAttribute) => {
  const existingObjectArrayBaseAttributes = existingObjectArray.reduce((baseAttributes, object) => {
    baseAttributes.push(object[baseAttribute]);

    return baseAttributes;
  }, []);

  newObjectArray.forEach((newObject) => {
    if (!existingObjectArrayBaseAttributes.includes(newObject[baseAttribute])) {
      existingObjectArray.push(newObject);
    }
  });

  return existingObjectArray;
};

// https://stackoverflow.com/questions/24004791/can-someone-explain-the-debounce-function-in-javascript
export const debounce = (func, wait, immediate) => {
  // 'private' variable for instance
  // The returned function will be able to reference this due to closure.
  // Each call to the returned function will share this common timer.
  var timeout;

  // Calling debounce returns a new anonymous function
  return function() {
    // reference the context and args for the setTimeout function
    var context = this, args = arguments;

    // Should the function be called now? If immediate is true
    //   and not already in a timeout then the answer is: Yes
    var callNow = immediate && !timeout;

    // This is the basic debounce behaviour where you can call this 
    //   function several times, but it will only execute once 
    //   [before or after imposing a delay]. 
    //   Each time the returned function is called, the timer starts over.
    clearTimeout(timeout);

    // Set the new timeout
    timeout = setTimeout(function() {

      // Inside the timeout function, clear the timeout variable
      // which will let the next execution run when in 'immediate' mode
      timeout = null;

      // Check if the function already ran with the immediate flag
      if (!immediate) {
        // Call the original function with apply
        // apply lets you define the 'this' object as well as the arguments
        //    (both captured before setTimeout)
        func.apply(context, args);
      }
    }, wait);

    // Immediate mode and no wait timer? Execute the function..
    if (callNow) func.apply(context, args);
  }; 
};

export const flattenJson = (data) => {
  let result = {};
  function recurse (cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for(let i = 0, l = cur.length; i < l; i++) {
        recurse(cur[i], prop + `[${i}]`);
        if (l == 0)
          result[prop] = [];
      }
    } else {
      let isEmpty = true;
      for (let p in cur) {
        isEmpty = false;
        recurse(cur[p], prop ? prop + '.' + p : p);
      }
      if (isEmpty && prop)
        result[prop] = {};
    }
  }
  recurse(data, '');
  return result;
};

export const unflattenJson = (data) => {
  'use strict';
  if (Object(data) !== data || Array.isArray(data))
    return data;
  let regex = /\.?([^.\[\]]+)|\[(\d+)]/g,
    resultholder = {};
  for (let p in data) {
    let cur = resultholder,
      prop = '',
      m;
    while (m = regex.exec(p)) {
      cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  }
  return resultholder[''] || resultholder;
};

export const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = Math.random() * 16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

// STRING NORMALIZATION
// https://stackoverflow.com/questions/7744912/making-a-javascript-string-sql-friendly
export const escapeStr = (val) => {
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
      case '\'':
        return '\'\'';
      case '"':
        return '""';
      default:
        return '\\' + s;
    }
  });

  return val;
};

// https://stackoverflow.com/questions/3115150/how-to-escape-regular-expression-special-characters-using-javascript
export const escapeRegExp = (text) => {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
};

export const makeActionCreator = (type, ...argNames) => {
  return function (...args) {
    const action = { type };
    argNames.forEach((arg, index) => {
      action[argNames[index]] = args[index];
    });
    return action;
  };
};

// Format number to readable form
export const abbreviateNumber = (num, fixed) => {
  if (num === null) {
    return null;
  } // terminate early
  if (num === 0) {
    return '0';
  } // terminate early
  fixed = !fixed || fixed < 0 ? 0 : fixed; // number of decimal places to show
  var b = num.toPrecision(2).split('e'), // get power
    k = b.length === 1 ? 0 : Math.floor(Math.min(b[1].slice(1), 14) / 3), // floor at decimals, ceiling at trillions
    c = k < 1 ? num.toFixed(0 + fixed) : (num / Math.pow(10, k * 3)).toFixed(1 + fixed), // divide by power
    d = c < 0 ? c : Math.abs(c), // enforce -0 is 0
    e = d + ['', 'K', 'M', 'B', 'T'][k]; // append power
  return e;
};

// const commafy = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
export const toCommaNotation = (str) => str.replace(/,/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');

export const formatPhoneNumber = num => {
  const cleaned = ('' + num).replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return null;
};

export const truncateString = (str, num) => (str.length > num) ? str.substring(0,num)+'...' : str;

// https://stackoverflow.com/questions/8486099/how-do-i-parse-a-url-query-parameters-in-javascript
export const getJsonFromUrl = (url) => {
  if (!url) {
    url = location.search;
  }
  var query = url.substr(1);
  var result = {};
  query.split('&').forEach(function(part) {
    var item = part.split('=');
    result[item[0]] = decodeURIComponent(item[1]);
  });
  return result;
};