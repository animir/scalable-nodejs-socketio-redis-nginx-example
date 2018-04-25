export const addIp = ip => ({
  type: 'ADD_IP',
  ip,
});

export const removeIp = ip => ({
  type: 'REMOVE_IP',
  ip,
});

export const clearList = () => ({ type: 'CLEAR_LIST' });
