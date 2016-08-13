/**
 * This file is provided by Facebook for testing and evaluation purposes
 * only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN
 * AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

import { EventEmitter } from 'events';

import dispatcher from '../dispatcher/dispatcher';
import { ACTION_TYPES } from '../constants/constants';


const _chartStore = {
  holdings: {},
};

const CHANGE_EVENT = 'change';


class Store extends EventEmitter {
  emitChange() {
    this.emit(CHANGE_EVENT);
  }
  addChangeListener(callback) {
    this.on(CHANGE_EVENT, callback);
  }
  removeChangeListener(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
  getChartStore() {
    return _chartStore;
  }
}

const store = new Store();

store.dispatchToken = dispatcher.register(payload => {
  const { actionType } = payload;

  switch (actionType) {
    case ACTION_TYPES.CHART_FETCH_HOLDINGS_RESPONSE:
      _chartStore.holdings = payload.holdings;
      break;
    default:
      return;
  }

  store.emitChange();
});

export default store;
