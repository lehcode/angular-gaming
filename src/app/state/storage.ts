export const getThisState = (stateName: string) => {
  try {
    const serializedState = sessionStorage.getItem(stateName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const getItem = (itemName: string) => {
  const items = getThisState(itemName);
  if (items === undefined) {
    return [];
  } else {
    return items;
  }
};

export const getItemByKey = (key: string) => {
  try {
    const serializedState = sessionStorage.getItem(key);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const emptyLocalStorage = (reducerKeys: string[]) => {
  try {
    if (undefined !== reducerKeys && reducerKeys.length > 0) {
      reducerKeys.forEach((key) => {
        sessionStorage.removeItem(key);
      });
    }
  } catch (err) {
    throw new Error(err.message);
  }
};

export const clearStorage = () => sessionStorage.clear();
