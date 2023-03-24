import _ from 'lodash';

export const isObject = (value: any) => {
  const copy = _.cloneDeep(value);
  return Object.prototype.toString.call(copy) === '[object object]';
};
