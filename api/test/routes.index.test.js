import axios from 'axios';
import chai from 'chai';
// import { spawn } from 'child_process';

// const runScript = (file_name, args = []) => {
//   return new Promise((resolve, reject) => {
//     let nodeScript = spawn('cd .. && yarn start', [...args]);
//         nodeScript.stdout.on('data', (data) => {
//           this.logThis(`\x1b[2m`, `~ ${data}`);
//         });
//         nodeScript.stderr.on('data', (error) => {
//           reject(error);
//         });
//         nodeScript.on('close', (code) => {
//           this.logThis(`\x1b[2m`, `~ child process exited with code ${code} \n`);
//           resolve();
//         });
//   });
// };

// runScript();

const API_URL = 'http://127.0.0.1:8000';

describe.skip("Testing the Server's Index Routes", () => {
  describe("# the Server's / route", () => {
    let res;
    before('call root', async () => {
      res = await axios.get(API_URL + '/');
    });

    it('returns 200', () => {
      chai.expect(res.status).to.equal(200);
    });

    it('returns a data object', () => {
      chai.expect(res.hasOwnProperty('data')).to.be.true;
      chai.expect(res.data).to.be.an('object');
    });

    it('returns a data object with a message', () => {
      chai.expect(res.data.hasOwnProperty('message'));
      chai.expect(res.data.message).to.be.an('string');
      chai.expect(res.data.message).to.equal('Welcome to the Spydr API.');
    });

  });

  describe("# the Server's /api route", () => {
    let res;
    before('call API root', async () => {
      res = await axios.get(API_URL + '/api');
    });

    it('returns 200', () => {
      chai.expect(res.status).to.equal(200);
    });

    it('returns a data object', () => {
      chai.expect(res.hasOwnProperty('data')).to.be.true;
      chai.expect(res.data).to.be.an('object');
    });

    it('returns a data object with a message', () => {
      chai.expect(res.data.hasOwnProperty('message'));
      chai.expect(res.data.message).to.be.an('string');
      chai.expect(res.data.message).to.equal('Welcome to the Spydr API.');
    });
  });

});
