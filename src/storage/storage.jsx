const validateKey = (key) => {
  if (!key || typeof key !== "string") {
    throw new Error("Invalid storage key provided");
  }
};

const noValueError = (key) => {
  throw new Error("storageSave: No value provided for  " + key);
}

export const storageSave = (key, value) => {
  validateKey(key);

  if (!value) {
    noValueError(key);
  }

  sessionStorage.setItem(key, JSON.stringify(value));
};

export const storageRead = (key) => {
  validateKey(key);

  const data = sessionStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
};


export const storageDelete = (key) => {
  sessionStorage.removeItem(key);
};
