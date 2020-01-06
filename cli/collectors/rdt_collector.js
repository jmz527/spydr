const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const util = require('../util');
const fileUtil = require(`../util/file_util`);
const FileUtil = new fileUtil();

function sanitizeStrings(data) {
  data.forEach((item) => {
    for (let key in item) {
      if (typeof item[key] === `string`) {
        item[key] = MainUtil._escapeString(item[key].replace(/\"/g, `'`));
      }
    }
  });
  return data;
};

module.exports = {
  // bulk_create_items(item_arr) {
  //   return rdt_item.bulkCreate(item_arr, { raw: true });
  //     .then(res => {
  //       // console.log(res);

  //       return res;
  //     });
  //     .catch(error => console.log(error));
  //     .then(() => process.exit());
  // },
  new_user(username) {
    // console.log(username);
    return axios.post(`${process.env.SPYDR_API}/api/rdt`, { user: username }).then(payload => {
      // console.log(payload.data);
      console.log(`New user (${username}) created.`);
    });
  },
  list_users() {
    return axios.get(`${process.env.SPYDR_API}/api/rdt/`);
  },
  save_feed(feed) {

    FileUtil.saveJSON(path.join(__dirname, '/../feeds/new_rdt_bulk_items.json'), feed);
    // let filePath = ;
    // fs.writeFileSync(filePath, JSON.stringify(feed, null, 4), 'utf8');
  },
  fetch_feed(username, type='upvoted') {
    const URL = `${process.env.RDT_URL}/user/${username}/${type}.json?count=25`;

    axios.get(URL).then((payload) => {
      let { children } = payload.data.data;
      let obj, rdts = [];

      children.forEach(item => {
        obj = {
          id: item.data.id,
          fullname: item.data.name,
          title: item.data.title,
          href: `https://redd.it/${item.data.id}`,
          author: item.data.author,
          subreddit: item.data.subreddit,
          timestamp: item.data.created,
          url: item.data.url,
          commentsCount: item.data.num_comments,
          score: item.data.score
        };

        rdts.push(obj);
      });
      // rdts = sanitizeStrings(rdts);

      let filePath = path.join(__dirname, `/../feeds/rdt_${username}_fetch_full.json`);
      FileUtil.saveJSON(filePath, payload.data, 'utf8');

      this.next_fetch(username, 'upvoted', payload.data.data.after);

      // let filePath = path.join(__dirname, '/../feeds/rdt_feed.json');
      // fs.writeFileSync(filePath, JSON.stringify({ user: username, json: rdts }, null, 4), 'utf8');


    }).catch((error) => {
      // FileUtil.logThis(`\u001B[31m%s\u001B[0m`, err);
      FileUtil.logError(error, 'get', URL, null);
      throw error;
    });
  },
  next_fetch(username, type = `upvoted`, after) {
    const URL = `${process.env.RDT_URL}/user/${username}/${type}.json?count=25&after=${after}`;
    // https://old.reddit.com/user/james527/upvoted.json?count=50&after=t3_bihb5x

    axios.get(URL).then((payload) => {
      let { children } = payload.data.data;
      let obj, rdts = [];

      children.forEach(item => {
        obj = {
          id: item.data.id,
          fullname: item.data.name,
          title: item.data.title,
          href: `https://redd.it/${item.data.id}`,
          author: item.data.author,
          subreddit: item.data.subreddit,
          timestamp: item.data.created,
          url: item.data.url,
          commentsCount: item.data.num_comments,
          score: item.data.score
        };

        rdts.push(obj);
      });
      // rdts = sanitizeStrings(rdts);

      // FileUtil.saveJSON(`./test/feeds/rdt_${user}_fetch.json`, { user: username, feed: feedId, json: rdts });

      let filePath = path.join(__dirname, '/../feeds/rdt_feed_next.json');
      fs.writeFileSync(filePath, JSON.stringify({ user: username, json: rdts }, null, 4), 'utf8');
      // FileUtil.saveJSON(filePath, newJSON);

    }).catch((error) => {
      FileUtil.logError(error, 'get', URL, null);
      throw error;
    });

  },
  // Scrape deep
  // =========================================================== //
  scrapeDeep(user, type = `upvoted`) {
    const url = `${process.env.RDT_URL}/user/${user}/${type}`;

    var new_json = { data: [], pages: 0, count: null };

    FileUtil.logThis(`\x1b[35m%s\x1b[0m`, `// ================================== //`);
    FileUtil.logThis(`\x1b[35m%s\x1b[0m`, `DEEP FETCH INITIATED`);
    FileUtil.logThis(`\x1b[35m%s\x1b[0m`, `USER: ${user.toUpperCase()}`);
    FileUtil.logThis(`\x1b[35m%s\x1b[0m`, `// ================================== //`);

    var p = new Promise((fulfill, reject) => {
      this.scrapeLoop(url, new_json, (newJSON) => {
        newJSON.count = newJSON.data.length;

        FileUtil.logThis(`\x1b[35m%s\x1b[0m`, `// ================================== //`);
        FileUtil.logThis(`\x1b[35m%s\x1b[0m`, `total pages fetched: ${newJSON.pages}`);
        FileUtil.logThis(`\x1b[35m%s\x1b[0m`, `total reddits: ${newJSON.count}`);
        FileUtil.logThis(`\x1b[35m%s\x1b[0m`, `// ================================== //`);

        fulfill(newJSON);
      });
    });

    p.then((new_json) => {
      new_json.data = sanitizeStrings(new_json.data);
      FileUtil.saveJSON(`./feeds/rdt_${user}_${type}_deep.json`, new_json);
    });
  },

  scrapeLoop(URL, newJSON, callback) {
    var $, things, titles, obj, next, nextURL;

    axios.get(URL).then((payload) => {
      newJSON.pages++;
      FileUtil.logThis(`\x1b[36m%s\x1b[0m`, `page ${newJSON.pages} fetched`);

      $ = cheerio.load(payload.data);
      things = $('#siteTable .thing');
      titles = $('#siteTable .thing a.title');

      for (var i = 0; i <= things.length - 1; i++) {
        obj = {
          id: things[i].attribs.id,
          fullname: things[i].attribs['data-fullname'],
          title: titles[i].children[0].data,
          href: `https://redd.it/` + things[i].attribs['data-fullname'].split('_')[1],
          author: things[i].attribs['data-author'],
          subreddit: things[i].attribs['data-subreddit'],
          timestamp: things[i].attribs['data-timestamp'],
          url: things[i].attribs['data-url'],
          commentsCount: things[i].attribs['data-comments-count'],
          score: things[i].attribs['data-score']
        }

        newJSON.data.push(obj);
      }

      next = $('.next-button a') // Next page

      if (next != undefined && next.length != 0) {
        nextURL = next[0].attribs.href

        if (nextURL != undefined) {
          newJSON = this.scrapeLoop(nextURL, newJSON, callback);
        } else {
          callback(newJSON);
        }
      } else {
        callback(newJSON);
      }

    }).catch((err) => {
      FileUtil.logThis(`\u001B[31m%s\u001B[0m`, err);
    });
  }
};
