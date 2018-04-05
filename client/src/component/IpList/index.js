class IpList {
  constructor(elId) {
    this.elId = elId;
  }

  addIpToList(ip) {
    const node = document.createElement('div');
    node.setAttribute('id', ip);
    node.appendChild(document.createTextNode(ip));
    document.getElementById(this.elId).appendChild(node);
  }

  removeIpFromList(ip) {
    const item = document.getElementById(ip);
    if (typeof item !== 'undefined') {
      item.remove();
    }
  }

  clearIpList() {
    document.getElementById(this.elId).innerHTML = '';
  }
}

export default IpList;
