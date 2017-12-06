import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {undwrtTaskQuery,undwrtTaskHandle} from './data/CarUwData'

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios);

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    });

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    });

    //核保任务查询
    mock.onPost('/PC_EMOBILEMNG/car/undwrtTaskQuery').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([200, undwrtTaskQuery]);
        }, 1000);
      });
    });

    //核保任务处理
    mock.onPost('/PC_EMOBILEMNG/car/undwrtTaskHandle').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([200, undwrtTaskHandle]);
        }, 1000);
      });
    });
  }
};
