const fs = require('fs');
const path = require('path');
const axios = require('axios');
const util = require('../util');

const fileUtil = require(`../util/file_util`);
const FileUtil = new fileUtil();

module.exports = {
  fetch_feed(username) {
    const URL = `https://www.instagram.com/${username}/?__a=1`;

    // TODO: Will need to return to this. Will need Oauth authentication before 
    // fetching basic data. So Instagram will be left out for the time being.

    axios.get(URL).then((payload) => {

      console.log(payload);

      // var json = payload.data;
      // var id, code, low_res_img, thumb_img, link, loc, ts, cap;
      // var new_json = { data: [], user: username };

      // for (let i = 0; i < json.items.length; i++) { // console.log(json.items[i])
      //   id = json.items[i].id
      //   code = json.items[i].code
      //   low_res_img = json.items[i].images.low_resolution.url
      //   thumb_img = json.items[i].images.thumbnail.url
      //   link = json.items[i].link
      //   loc = (json.items[i].location) ? json.items[i].location.name : null
      //   ts = json.items[i].created_time || null
      //   cap = (json.items[i].caption) ? json.items[i].caption.text : null

      //   // console.log({ id, code, low_res_img, thumb_img, link, loc, ts, cap })
      //   new_json.data.push({ id, code, low_res_img, thumb_img, link, loc, ts, cap })
      // }
      // // new_json.data = this.sanitizeStrings(new_json.data)
      // // new_json.data = this.sanitizeStrings(new_json.data)

      // new_json.data.forEach((item) => {
      //   for (let key in item) {
      //     if (typeof item[key] === `string`) {
      //       item[key] = util.escapeString(item[key].replace(/\"/g, `'`));
      //     }
      //   }
      // });
      // console.log({ user, json: new_json });

      let filePath = path.join(__dirname, '/../igrm_feed.json');
      fs.writeFileSync(filePath, JSON.stringify(payload, null, 4), 'utf8');


    }).catch((err) => {
      FileUtil.logThis(`\u001B[31m%s\u001B[0m`, err)
    })

  }
};
