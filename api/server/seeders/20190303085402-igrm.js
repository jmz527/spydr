'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const util = require('../util');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const igrm_users_arr = [], igrm_items_arr = [];

    // let UserRef = util.generateUUID();

    // igrm_users_arr.push({ uid: UserRef, name: 'jmz527', is_active: true, created_at: new Date(), updated_at: new Date() });
    // igrm_items_arr.push({
    //   uid: util.generateUUID(),
    //   user_ref: UserRef,
    //   pic_id: "1637215367715707157_2074513016",
    //   code: "Ba4jrPdgVkV",
    //   low_res_img: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s320x320/e35/22858386_475332399533009_8119742995730792448_n.jpg",
    //   thumb_img: "https://scontent-lga3-1.cdninstagram.com/t51.2885-15/s150x150/e35/c135.0.809.809/22858386_475332399533009_8119742995730792448_n.jpg",
    //   link: "https://www.instagram.com/p/Ba4jrPdgVkV/",
    //   loc: null,
    //   ts: "1509391302",
    //   cap: "Upstate NY, near Schoharie valley",
    //   created_at: new Date()
    // });

    fs.readdirSync(`${__dirname}/../feeds/`)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '_all.json') && (file.slice(0, 4) === 'igrm');
    })
    .forEach(file => {
      let filePath = path.join(__dirname, '/../feeds/', file);
      console.log(`\x1b[36m%s\x1b[0m`, `Imported ${filePath}.`);

      if (fs.existsSync(filePath)) {
        let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let UserRef = util.generateUUID();

        console.log(`\x1b[36m%s\x1b[0m`, `Compiling ${json.user}...`);

        igrm_users_arr.push({
          uid: UserRef,
          name: json.user,
          is_active: true,
          created_at: new Date()
        });

        for (let i = 0; i < json.data.length; i++) { // console.log(`\x1b[36m%s\x1b[0m`, json.data[i].uid)
          igrm_items_arr.push({
            uid: util.generateUUID(),
            pic_id: json.data[i].id,
            code: json.data[i].code,
            low_res_img: json.data[i].low_res_img,
            thumb_img: json.data[i].thumb_img,
            link: json.data[i].link,
            loc: json.data[i].loc,
            cap: json.data[i].cap,
            user_ref: UserRef,
            published_at: new Date(parseInt(json.data[i].ts) * 1000),
            created_at: new Date()
          });
        }

        console.log(`\x1b[36m%s\x1b[0m`, `Finished compile of ${json.user}!`);

      } else {
        // callback(null)
        console.log(`\x1b[31m%s\x1b[0m`, `ERROR: Something went wrong`)
        console.log(`\x1b[31m%s\x1b[0m`, `If you're missing this file: "${filePath}.json"`)
        console.log(`\x1b[31m%s\x1b[0m`, `Try running "npm run fetch"`)
      }

    });

    return Promise.all([
      queryInterface.bulkInsert('IgrmUsers', igrm_users_arr, {}),
      queryInterface.bulkInsert('IgrmItems', igrm_items_arr, {})
    ]);
  },

  down: (queryInterface, Sequelize) => {
    const igrm_users_arr = [], igrm_items_arr = [];
    const Op = Sequelize.Op;

    // igrm_users_arr.push({ name: 'jmz527' });
    // igrm_items_arr.push({ pic_id: "1637215367715707157_2074513016" });

    fs.readdirSync(`${__dirname}/../feeds/`)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '_all.json') && (file.slice(0, 4) === 'igrm');
    })
    .forEach(file => {
      let filePath = path.join(__dirname, '/../feeds/', file);
      console.log(`\x1b[36m%s\x1b[0m`, `Imported ${filePath}.`);

      if (fs.existsSync(filePath)) {
        let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        console.log(`\x1b[36m%s\x1b[0m`, json.user);

        igrm_users_arr.push({ name: json.user });

        for (let i = 0; i < json.data.length; i++) {
          igrm_items_arr.push({ pic_id: json.data[i].id });
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
      queryInterface.bulkDelete('IgrmUsers', {[Sequelize.Op.or]: igrm_users_arr }, {}),
      queryInterface.bulkDelete('IgrmItems', {[Sequelize.Op.or]: igrm_items_arr }, {})
    ]);
  }
};
