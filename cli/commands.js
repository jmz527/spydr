const fs = require('fs');
const path = require('path');

const collectors = require('./collectors');
const fileUtil = require(`./util/file_util`);
const FileUtil = new fileUtil();
const util = require('./util');
const helpText = require('./help_text');

let debugging = false;

const delay = (time, value) => {
  return new Promise(resolve => { 
    setTimeout(resolve.bind(null, value), time)
  });
};
const sync_feed = async (channelId, uid, recentVideoId) => {
  let payload = await collectors.yts_collector.fetch_feed(channelId).catch(error => {
    // console.error(error);
    // FileUtil.logError(error, 'get', `${process.env.YTS_API}/channels/?key=${process.env.YTS_KEY}&id=${channelId}&part=snippet,contentDetails,statistics`, instance.defaults);
    throw error;
  });
  let bookmark = payload.data.length - 1;

  for (var i = payload.data.length - 1; i >= 0; i--) {
    if (payload.data[i].videoId === recentVideoId) {
      // FileUtil.logThis(`\x1b[36m%s\x1b[0m`, 'we have a match');
      bookmark = i;
      break;
    }
  }

  let newVideos = payload.data.slice(0, bookmark);
  let promiseArr = [];

  for (i = newVideos.length - 1; i >= 0; i--) {
    promiseArr.push(collectors.yts_collector.create_item(uid, newVideos[i]));
  }

  if (promiseArr.length > 0) {
    return Promise.all(promiseArr).then(results => {
      FileUtil.logThis(`\x1b[36m%s\x1b[0m`, `\n${results.length} videos imported!`);
    }).catch((error) => {
      // console.error(error);
      // FileUtil.logError(error, 'get', `${process.env.YTS_API}/channels/?key=${process.env.YTS_KEY}&id=${channelId}&part=snippet,contentDetails,statistics`, instance.defaults);
      throw error;
    });
  } else {
    FileUtil.logThis(`\x1b[36m%s\x1b[0m`, '\nno new updates');
    return false;
  }
};

module.exports = {
  "help" : (input, context) => {
    FileUtil.logThis(`\x1b[0m`, helpText);
  },
  "debug" : (input, context) => {
    let args = input.split(/\s+/).slice(1);

    let onoff = args[0];
    // let verbosity = args[2];

    if (onoff === 'on') {
      debugging = true;
    } else if (onoff === 'off') {
      debugging = false;
    } else {
      debugging = !debugging;
      onoff = debugging ? 'on' : 'off';
    }

    FileUtil.logThis(`\x1b[0m`, `\nDebugging turned ${onoff}\n`);
  },
  "list_users" : async (input, context) => {
    let payload = await collectors.rdt_collector.list_users();

    FileUtil.logThis(`\x1b[0m`, '\nList of tracked reddit users:');
    payload.data.forEach(item => FileUtil.logThis(`\x1b[0m`, item.user));
  },
  "new_user" : (input, context) => {
    var args = input.split(/\s+/).slice(1);

    return collectors.rdt_collector.new_user(args[0]);
  },
  "scrape" : (input, context) => {
    let args = input.split(/\s+/).slice(1);

    // console.log(args[0]);

    collectors.rdt_collector.fetch_feed(args[0]);
    // collectors.rdt_collector.next_fetch(args[0]);
  },
  "deep_scrape" : (input, context) => {
    let args = input.split(/\s+/).slice(1);

    // console.log(args[0]);

    // collectors.rdt_collector.scrapeDeep(args[0]);
    collectors.rdt_collector.fetch_feed(args[0]);
  },
  "list_channels" : async (input, context) => {
    let payload = await collectors.yts_collector.list_channels();

    FileUtil.logThis(`\x1b[0m`, '\nList of tracked youtube channels:');

    payload.data.forEach(channel => {
      if (channel.isActive) {
        FileUtil.logThis(`\x1b[0m`, channel.title);
      } else {
        FileUtil.logThis(`\x1b[31m\x1b[2m%s\x1b[0m`, channel.title);
      }
    });
  },
  "new_channel" : (input, context) => {
    var args = input.split(/\s+/).slice(1);

    var promise1 = collectors.yts_collector.fetch_channel(args[0]).then(payload => {
      FileUtil.logThis(`\x1b[0m`, 'Fetch youtube channel:');
      FileUtil.logThis(`\x1b[0m`, payload);

      return payload;
    });

    var promise2 = collectors.yts_collector.fetch_feed(args[0]).then(payload => {
      FileUtil.logThis(`\x1b[0m`, 'Fetch youtube feed:');
      FileUtil.logThis(`\x1b[0m`, payload);

      return payload;
    });

    return Promise.all([promise1, promise2]).then(payload => {
      let [details, feed] = payload;
      // FileUtil.saveJSON(path.join(__dirname, `/feeds/fetched_channel_${details.channel}.json`), details);
      // FileUtil.saveJSON(path.join(__dirname, `/feeds/fetched_channel_${details.channel}_feed.json`), feed);

      collectors.yts_collector.create_channel(details).then(channel => {
        // FileUtil.saveJSON(path.join(__dirname, `/feeds/created_channel_${details.channel}_channel.json`), channel.data);

        let promiseArr = []

        for (i = feed.data.length - 1; i >= 0; i--) {
          promiseArr.push(collectors.yts_collector.create_item(channel.data.uid, feed.data[i]));
        }

        if (promiseArr.length > 0) {
          Promise.all(promiseArr).then(results => {
            FileUtil.logThis(`\x1b[32m%s\x1b[0m\n`, `Channel created and ${results.length} videos imported`);
          });
        }
        
      }).catch((error) => console.error(error));
    });

  },
  "sync_channel" : async (input, context) => {
    let args = input.split(/\s+/).slice(1);

    let promise1 = collectors.yts_collector.fetch_details(args[0]).then(payload => {
      // FileUtil.logThis(`\x1b[0m`, 'Fetch youtube channel details:');
      return payload;
    });

    let promise2 = collectors.yts_collector.fetch_latest(args[0]).then(payload => {
      // FileUtil.logThis(`\x1b[0m`, 'Fetch youtube channels latest video:');
      return payload;
    });

    return Promise.all([promise1, promise2]).then((values) => {
      let [details, latest] = values;
      FileUtil.logThis(`\x1b[0m`, `\nIdentified channel: ${details.data.channelId}`);
      FileUtil.logThis(`\x1b[0m`, `Title: ${details.data.title}`);
      FileUtil.logThis(`\x1b[0m`, `Fetched latest video: ${latest.data.videoId}`);

      sync_feed(details.data.channelId, args[0], latest.data.videoId).then(results => {
        FileUtil.logThis(`\x1b[0m`, results);
      }).catch(error => console.error(error));

    }).catch((error) => {
      // console.error(error);
      throw error;
    });
  },
  "sync_channels" : async () => {
    FileUtil.logThis(`\x1b[36m%s\x1b[0m`, '// ================================== //');
    FileUtil.logThis(`\x1b[36m%s\x1b[0m`, '// Syncing All Active Channels');
    FileUtil.logThis(`\x1b[36m%s\x1b[0m`, '// ========================================== //');

    const queue = new util.Queue();
    let channels = await collectors.yts_collector.list_channels();
    let activeChannels = channels.data.filter(channel => channel.isActive);

    for (var i = 0; i < activeChannels.length; i++) {
      queue.enqueue(activeChannels[i]);
    }

    let keepGoing = true;
    let timeout = setTimeout(() => {
        keepGoing = false;
    }, 60000); // 1 minute in milliseconds

    while (!queue.isEmpty() && keepGoing) {
      let item = queue.dequeue();
      let latest = await collectors.yts_collector.fetch_latest(item.uid);

      FileUtil.logThis(`\x1b[36m%s\x1b[0m`, `\nSyncing feed`);
      FileUtil.logThis(`\x1b[0m`, `Channel: ${item.channel}`);
      FileUtil.logThis(`\x1b[0m`, `Channel ID: ${item.channelId}`);

      await sync_feed(item.channelId, item.uid, latest.data.videoId).then(results => {
        FileUtil.logThis(`\x1b[0m`, results);
      }).catch(error => console.error(error));

      await delay(1000, () => {
        FileUtil.logThis(`\x1b[0m`, 'one second buffer delay');
      });
    }

    FileUtil.logThis(`\x1b[36m%s\x1b[0m`, '// ================================== //');
    FileUtil.logThis(`\x1b[36m%s\x1b[0m`, '// Syncing Finished');
    FileUtil.logThis(`\x1b[36m%s\x1b[0m`, '// ================================== //');
  },
  "clear" : () => console.clear(),
  "exit" : () => {
    FileUtil.logThis(`\x1b[0m`, 'Thanks for dropping by!');
    process.exit();
  },
  "default" : () => FileUtil.logThis(`\x1b[0m`, '\nCommand not understood\n'),
};
