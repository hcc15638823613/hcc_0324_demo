import { useState } from 'react';
import type { CardType } from '@/components/drageCard/type';
const mockList = [
  'VHSDHSJD_UIS',
  'EERRTT_UUYYT',
  'TTYYYUR_PPOO',
  'RTRT_POPO',
  'JJKK_LLKK',
  'YYTT_LLKKJJ',
  'OO_KKLLGGF',
];
const useSqlInfo = () => {
  const [cardList, setCardList] = useState<CardType[]>([
    {
      id: 1,
      top: null,
      left: null,
      text: 'Write a cool JS library',
      childrenList: mockList,
      tableDescription: 'xxx',
    },
    {
      id: 2,
      top: null,
      left: null,
      text: 'Make it generic enough',
      childrenList: mockList,
    },
    {
      id: 3,
      top: null,
      left: null,
      text: 'Write README',
      childrenList: mockList,
    },
    {
      id: 4,
      top: null,
      left: null,
      text: 'Create some examples',
      childrenList: mockList,
    },
    {
      id: 5,
      top: null,
      left: null,
      text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      childrenList: mockList,
      tableDescription: 'mock数据',
    },
    {
      id: 6,
      top: null,
      left: null,
      text: '???',
      childrenList: mockList,
    },
    {
      id: 7,
      top: null,
      left: null,
      text: 'PROFIT',
      childrenList: mockList,
    },
  ]);
  const [leftMenuList, setLeftMenuList] = useState<CardType[]>([]);
  return {
    cardList,
    setCardList,
    leftMenuList,
    setLeftMenuList,
  };
};
export default useSqlInfo;
