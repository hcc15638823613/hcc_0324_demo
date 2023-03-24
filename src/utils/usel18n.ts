import { getIntl, useIntl } from 'umi';

/**
 * 展示层国际化方法
 * @param module
 * @returns {function(id): *}
 */
export const useI18n = (module: any) => {
  const intl = useIntl();
  return (id: any) => intl.formatMessage({ id: `${module}.${id}` });
};

/**
 * 数据层国际化方法
 * @param id
 * @returns {*}
 */
export const getI18n = (id: any) => getIntl().formatMessage({ id });
