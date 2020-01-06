const axios = require('axios');

const igrm_collector = require('./igrm_collector');
const rdt_collector = require('./rdt_collector');
const yts_collector = require('./yts_collector');
const isOnline = () => {
  return axios.get(`${process.env.SPYDR_API}`).then(payload => {
    let result;

    if (payload.status === 200 && payload.statusText === 'OK') {
      // console.log(payload.statusText);
      // console.log(payload.status);
      result = true;
    } else {
      result = false;
    }
    return result;
  }).catch(error => {
    throw new Error('Can\'t connect to the Spydr API');
  })
}

module.exports = {
  igrm_collector,
  rdt_collector,
  yts_collector,
  isOnline
};
