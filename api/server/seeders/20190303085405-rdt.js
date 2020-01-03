'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const util = require('../util');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const rdt_users_arr = [], rdt_ups_arr = [], rdt_downs_arr = [];
    let rdt_items_arr = [];
    const rdt_items_dict = {};

    // let UserRef = util.generateUUID();
    // let ItemRef = util.generateUUID();

    // rdt_users_arr.push({
    //   uid: UserRef,
    //   user: 'james527',
    //   is_active: true,
    //   created_at: new Date()
    // });
    // rdt_items_arr.push({
    //   uid: ItemRef,
    //   thing_id: "thing_t3_as44ex",
    //   fullname: "t3_as44ex",
    //   title: "In case you were wondering what diving in crystal clean water looks like",
    //   href: "https://redd.it/as44ex",
    //   author: "eabs1",
    //   subreddit: "interestingasfuck",
    //   timestamp: "1550535838000",
    //   url: "https://i.imgur.com/i7lpASP.gifv",
    //   comments_count: 45,
    //   score: 648,
    //   created_at: new Date()
    // });
    // rdt_ups_arr.push({
    //   uid: util.generateUUID(),
    //   user_ref: UserRef,
    //   rdt_ref: ItemRef,
    //   created_at: new Date()
    // });
    // rdt_downs_arr.push({
    //   uid: util.generateUUID(),
    //   user_ref: UserRef,
    //   rdt_ref: ItemRef,
    //   created_at: new Date()
    // });

    fs.readdirSync(`${__dirname}/../feeds/`)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '_all.json') && (file.slice(0, 4) === 'rdt_');
    })
    .forEach(file => {
      let filePath = path.join(__dirname, '/../feeds/', file);
      console.log(`\x1b[36m%s\x1b[0m`, `Imported ${filePath}.`);

      if (fs.existsSync(filePath)) {
        let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let UserRef = util.generateUUID();

        console.log(`\x1b[36m%s\x1b[0m`, `Compiling ${json.user}...`);

        rdt_users_arr.push({
          uid: UserRef,
          user: json.user,
          is_active: true,
          created_at: new Date()
        });

        for (let i = 0; i < json.upvoted.data.length; i++) {

          if (rdt_items_dict[json.upvoted.data[i].id]) {
            rdt_ups_arr.push({
              uid: util.generateUUID(),
              user_ref: UserRef,
              rdt_ref: rdt_items_dict[json.upvoted.data[i].id].uid,
              created_at: new Date()
            });
          } else {
            let UpItemRef = util.generateUUID();

            rdt_items_dict[json.upvoted.data[i].id] = {
              uid: UpItemRef,
              fullname: json.upvoted.data[i].fullname,
              title: json.upvoted.data[i].title,
              href: json.upvoted.data[i].href,
              author: json.upvoted.data[i].author,
              subreddit: json.upvoted.data[i].subreddit,
              url: json.upvoted.data[i].url,
              comments_count: parseInt(json.upvoted.data[i].commentsCount),
              score: parseInt(json.upvoted.data[i].score),
              published_at: new Date(parseInt(json.upvoted.data[i].timestamp)),
              created_at: new Date()
            };

            rdt_ups_arr.push({
              uid: util.generateUUID(),
              user_ref: UserRef,
              rdt_ref: UpItemRef,
              created_at: new Date()
            });

          }
        }

        for (let i = 0; i < json.downvoted.data.length; i++) {

          if (rdt_items_dict[json.downvoted.data[i].id]) {
            rdt_downs_arr.push({
              uid: util.generateUUID(),
              user_ref: UserRef,
              rdt_ref: rdt_items_dict[json.downvoted.data[i].id].uid,
              created_at: new Date()
            });
          } else {
            let DownItemRef = util.generateUUID();

            rdt_items_dict[json.downvoted.data[i].id] = {
              uid: DownItemRef,
              fullname: json.downvoted.data[i].fullname,
              title: json.downvoted.data[i].title,
              href: json.downvoted.data[i].href,
              author: json.downvoted.data[i].author,
              subreddit: json.downvoted.data[i].subreddit,
              url: json.downvoted.data[i].url,
              comments_count: json.downvoted.data[i].commentsCount,
              score: json.downvoted.data[i].score,
              published_at: new Date(parseInt(json.downvoted.data[i].timestamp)),
              created_at: new Date()
            };

            rdt_downs_arr.push({
              uid: util.generateUUID(),
              user_ref: UserRef,
              rdt_ref: DownItemRef,
              created_at: new Date()
            });

          }

        }

        console.log(`\x1b[36m%s\x1b[0m`, `Finished compile of ${json.user}!`);

      } else {
        // callback(null)
        console.log(`\x1b[31m%s\x1b[0m`, `ERROR: Something went wrong`)
        console.log(`\x1b[31m%s\x1b[0m`, `If you're missing this file: "${filePath}.json"`)
        console.log(`\x1b[31m%s\x1b[0m`, `Try running "npm run fetch"`)
      }

    });

    rdt_items_arr = Object.keys(rdt_items_dict).map((key) => {
      return Object.assign({}, rdt_items_dict[key], { thing_id: key });
    });

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return Promise.all([
      queryInterface.bulkInsert('RdtUsers', rdt_users_arr, {}),
      queryInterface.bulkInsert('RdtItems', rdt_items_arr, {})
    ]).then(() => {
      // More seeds that require IDs from the seeds above
      return Promise.all([
        queryInterface.bulkInsert('RdtUps', rdt_ups_arr, {}),
        queryInterface.bulkInsert('RdtDowns', rdt_downs_arr, {})
      ])
    });
  },

  down: (queryInterface, Sequelize) => {
    const rdt_users_arr = [], rdt_items_arr = [];
    const Op = Sequelize.Op;

    // rdt_users_arr.push({ user: 'james527' });
    // rdt_items_arr.push({ thing_id: "thing_t3_as44ex" });


    fs.readdirSync(`${__dirname}/../feeds/`)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '_all.json') && (file.slice(0, 4) === 'rdt_');
    })
    .forEach(file => {
      let filePath = path.join(__dirname, '/../feeds/', file);
      console.log(`\x1b[36m%s\x1b[0m`, `Imported ${filePath}.`);

      if (fs.existsSync(filePath)) {
        let json = JSON.parse(fs.readFileSync(filePath, 'utf8'))

        rdt_users_arr.push({ user: json.user });

        for (let i = 0; i < json.upvoted.data.length; i++) {
          rdt_items_arr.push({ thing_id: json.upvoted.data[i].id });
        }

        for (let i = 0; i < json.downvoted.data.length; i++) {
          rdt_items_arr.push({ thing_id: json.downvoted.data[i].id });
        }

      } else {
        // callback(null)
        console.log(`\x1b[31m%s\x1b[0m`, `ERROR: Something went wrong`)
        console.log(`\x1b[31m%s\x1b[0m`, `If you're missing this file: "${filePath}.json"`)
        console.log(`\x1b[31m%s\x1b[0m`, `Try running "npm run fetch"`)
      }
    });

    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return Promise.all([
      queryInterface.bulkDelete('RdtUsers', {[Sequelize.Op.or]: rdt_users_arr }, {}),
      queryInterface.bulkDelete('RdtItems', {[Sequelize.Op.or]: rdt_items_arr }, {})
    ]);
  }
};
