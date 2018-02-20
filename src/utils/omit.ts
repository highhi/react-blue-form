export default function omit(obj: object, ...keys: string[]) {
  return Object.keys(obj).reduce((acc: object, key: string) => {
    if (keys.indexOf(key) === 0) return acc;
    acc[key] = obj[key];
    return acc;
  }, {});
}


