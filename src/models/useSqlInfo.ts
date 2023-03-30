import { useState } from 'react';
import { uniqueId } from 'lodash';
import type { CardType, JsPlubListType } from '@/components/drageCard/type';
const mockList = [
  'VHSDHSJD_UIS',
  'EERRTT_UUYYT',
  'TTYYYUR_PPOO',
  'RTRT_POPO',
  'JJKK_LLKK',
  'YYTT_LLKKJJ',
  'OO_KKLLGGF',
];
const mockListObjList = mockList?.map((item) => {
  return {
    id: uniqueId('onlyId'),
    text: item,
    isChecked: false,
  };
});
const useSqlInfo = () => {
  const [cardList, setCardList] = useState<CardType[]>([
    {
      id: 1,
      top: null,
      left: null,
      text: 'Write a cool JS library',
      childrenList: mockListObjList,
      tableDescription: 'xxx',
    },
    {
      id: 2,
      top: null,
      left: null,
      text: 'Make it generic enough',
      childrenList: mockListObjList,
    },
    {
      id: 3,
      top: null,
      left: null,
      text: 'Write README',
      childrenList: mockListObjList,
    },
    {
      id: 4,
      top: null,
      left: null,
      text: 'Create some examples',
      childrenList: mockListObjList,
    },
    {
      id: 5,
      top: null,
      left: null,
      text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      childrenList: mockListObjList,
      tableDescription: 'mock数据',
    },
    {
      id: 6,
      top: null,
      left: null,
      text: 'Text Label',
      childrenList: mockListObjList,
    },
    {
      id: 7,
      top: null,
      left: null,
      text: 'PROFIT',
      childrenList: mockListObjList,
    },
  ]);
  const [leftMenuList, setLeftMenuList] = useState<CardType[]>([]);
  const [jsPlumbListState, setJsPlumbListState] = useState<JsPlubListType[]>(
    [],
  );

  return {
    cardList,
    setCardList,
    leftMenuList,
    setLeftMenuList,
    jsPlumbListState,
    setJsPlumbListState,
  };
};
export default useSqlInfo;
