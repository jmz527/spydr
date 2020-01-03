'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const util = require('../util');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const yts_channels_arr = [], yts_items_arr = [];

    // let ChannelRef = util.generateUUID();

    // // examples:
    // yts_channels_arr.push({ uid: ChannelRef, channel: 'alt_shift_x', channel_id: 'UCveZqqGewoyPiacooywP5Ig', is_active: true, created_at: new Date(), updated_at: new Date() });
    // yts_items_arr.push({
    //   uid: util.generateUUID(),
    //   video_id: "z3sp0Q2SAhM",
    //   title: "Ancient Stark secrets and the end of Game of Thrones Season 8",
    //   href: "https://www.youtube.com/watch?v=z3sp0Q2SAhM",
    //   duration: "-",
    //   views: "-",
    //   is_active: false,
    //   is_watched: true,
    //   channel_ref: ChannelRef,
    //   created_at: new Date(),
    //   updated_at: new Date()
    // });


    fs.readdirSync(`${__dirname}/../feeds/`)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '_all.json') && (file.slice(0, 4) === 'yts_');
    })
    .forEach(file => {
      let filePath = path.join(__dirname, '/../feeds/', file);
      console.log(`\x1b[36m%s\x1b[0m`, filePath);

      if (fs.existsSync(filePath)) {
        let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        let ChannelRef = util.generateUUID();

        // console.log({
        //   channel: json.channel,
        //   channel_id: json.channel_id,
        // });

        yts_channels_arr.push({
          uid: ChannelRef,
          channel: json.channel,
          channel_id: json.channel_id,
          title: json.title,
          description: json.description,
          custom_url: json.customUrl,
          thumbnail_default_url: json.thumbnails.default.url,
          thumbnail_medium_url: json.thumbnails.medium.url,
          thumbnail_high_url: json.thumbnails.high.url,
          upload_playlist_id: json.contentDetails.relatedPlaylists.uploads,
          view_count: json.statistics.viewCount,
          comment_count: json.statistics.commentCount,
          subscriber_count: json.statistics.subscriberCount,
          video_count: json.statistics.videoCount,
          is_active: true,
          created_at: new Date(),
          published_at: json.publishedAt,
        });

        for (let i = 0; i < json.data.length; i++) {

          yts_items_arr.push({
            uid: util.generateUUID(),
            video_id: json.data[i].id,
            title: json.data[i].title,
            description: '',
            thumbnails_default_url: '',
            thumbnails_medium_url: '',
            thumbnails_high_url: '',
            thumbnails_standard_url: '',
            thumbnails_maxres_url: '',
            href: json.data[i].href,
            duration: json.data[i].duration,
            views: json.data[i].views,
            is_active: json.data[i].active,
            is_watched: json.data[i].watched,
            created_at: new Date(),
            published_at: new Date(parseInt("0000000000000")),
            channel_ref: ChannelRef,
          });
        }

        console.log(`\x1b[36m%s\x1b[0m`, `Finished compile!`);

      } else {
        // callback(null)
        console.log(`\x1b[31m%s\x1b[0m`, `ERROR: Something went wrong`)
        console.log(`\x1b[31m%s\x1b[0m`, `If you're missing this file: "${filePath}.json"`)
        console.log(`\x1b[31m%s\x1b[0m`, `Try running "npm run fetch"`)
      }

    });

    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    // return Promise.all([ queryInterface.bulkInsert('YtsChannels', yts_channels_arr, {}) ])
    // .then(() => {
    //   // More seeds that require IDs from the seeds above
    //   return Promise.all([ queryInterface.bulkInsert('YtsItems', yts_items_arr, {}) ])
    // });

    return Promise.all([
      queryInterface.bulkInsert('YtsChannels', yts_channels_arr, {}),
      queryInterface.bulkInsert('YtsItems', yts_items_arr, {})
    ]);

  },

  down: (queryInterface, Sequelize) => {
    const yts_channels_arr = [], yts_items_arr = [];
    const Op = Sequelize.Op;

    // examples:
    // yts_channels_arr.push({ channel_id: 'UCveZqqGewoyPiacooywP5Ig' });
    // yts_items_arr.push({ video_id: "z3sp0Q2SAhM" });


    fs.readdirSync(`${__dirname}/../feeds/`)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '_all.json') && (file.slice(0, 4) === 'yts_');
    })
    .forEach(file => {
      let filePath = path.join(__dirname, '/../feeds/', file);
      console.log(`\x1b[36m%s\x1b[0m`, filePath);

      if (fs.existsSync(filePath)) {
        let json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        yts_channels_arr.push({ channel_id: json.channel_id });

        for (let i = 0; i < json.data.length; i++) {
          yts_items_arr.push({ video_id: json.data[i].id });
        }

        console.log(`\x1b[36m%s\x1b[0m`, `Finished compile!`);

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
      queryInterface.bulkDelete('YtsChannels', {[Sequelize.Op.or]: yts_channels_arr }, {}),
      queryInterface.bulkDelete('YtsItems', {[Sequelize.Op.or]: yts_items_arr }, {})
    ]);
  }
};
