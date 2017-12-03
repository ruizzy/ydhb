import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {item} from './data/carUwData'

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
    //获取item信息
    mock.onGet('/PC_EMOBILEMNG/car/getItem').reply(config => {
      console.log(item)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([200, item]);
        }, 1000);
      });
    });

    //获取item信息
    mock.onPost('/PC_EMOBILEMNG/car/getItem').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([200, item]);
        }, 1000);
      });
    });
  }
};
