import { createStore } from 'redux';
import ipsReducer from './reducers/ips';
import { addIp, removeIp, clearList } from './actions/index';

class IpList {
  constructor(container, elId) {
    this.container = container;
    this.elId = elId;
    this.ips = createStore(ipsReducer);
  }

  addIpToList(ip) {
    this.ips.dispatch(addIp(ip));
    const node = this.container.createElement('div');
    node.setAttribute('id', ip);
    node.appendChild(this.container.createTextNode(ip));
    this.container.getElementById(this.elId).appendChild(node);

  }

  removeIpFromList(ip) {
    this.ips.dispatch(removeIp(ip));
    const item = this.container.getElementById(ip);
    if (typeof item !== 'undefined') {
      item.remove();
    }
  }

  clearIpList() {
    this.ips.dispatch(clearList());
    this.container.getElementById(this.elId).innerHTML = '';
  }
}

export default IpList;
