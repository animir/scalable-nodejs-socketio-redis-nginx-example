const ips = (state = [], action) => {
  switch (action.type) {
    case 'ADD_IP':
      return [...state, action.ip];
    case 'REMOVE_IP':
      return state.filter(ip => action.ip !== ip);
    case 'CLEAR_LIST':
      return [];
    default:
      return state;
  }
};

export default ips;

