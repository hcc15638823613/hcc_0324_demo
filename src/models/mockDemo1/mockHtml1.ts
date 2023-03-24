import axios from 'axios';
import { dataListType } from '@/pages/mockDemo1';

export interface StateType {
  page: number;
  pageSize: number;
  total: number;
  mockHtml: string;
  mockList: string[];
  mockLOading: boolean;
  dataList: dataListType[];
}
const queryDataList = async () => {
  const resData = await axios.post('/mock/dataList', {
    username: '初始化项目入参',
    isTrue: true,
  });
  const list = resData?.data?.list || [];
  return list;
};
export default {
  namespace: 'mockHtml1',
  state: {
    page: 1,
    pageSize: 20,
    total: 300,
    mockHtml: '默认文本',
    mockList: ['1', 'html', '2'],
    mockLOading: false,
    dataList: [],
  },
  reducers: {
    setPage(state: StateType, { page }: StateType) {
      return { ...state, page };
    },
    setCurrent(state: StateType, { pageSize }: StateType) {
      return { ...state, pageSize };
    },
    setTotal(state: StateType, { total }: StateType) {
      return { ...state, total };
    },
    setMockhtml(state: StateType, { mockHtml }: StateType) {
      return { ...state, mockHtml };
    },
    setMockLIst(state: StateType, { mockList }: StateType) {
      return { ...state, mockList };
    },
    setLodaing(state: StateType, { mockLOading }: StateType) {
      return { ...state, mockLOading };
    },
    setDataList(state: StateType, { dataList }: StateType) {
      return { ...state, dataList };
    },
  },
  effects: {
    *getDataList({ payload }: any, { call, put, select }: any) {
      yield put({ type: 'setLodaing', mockLOading: true });
      const resData: StateType[] = yield call(
        queryDataList,
        payload.data ?? {},
      );

      yield put({ type: 'setLodaing', mockLOading: false });
      if (resData) yield put({ type: 'setDataList', dataList: resData });
    },
  },
};
