import { Card } from '@/components/drageCard/leftMenuListCard';
import type { CardType } from '@/components/drageCard/type';
import { useCallback } from 'react';
import update from 'immutability-helper';
import { Select } from 'antd';
import { useModel } from 'umi';
import './index.less';

const LeftMenuList = () => {
  const { leftMenuList, setLeftMenuList } = useModel('useSqlInfo');
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = leftMenuList[dragIndex];
      setLeftMenuList(
        update(leftMenuList, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        }),
      );
    },
    [leftMenuList, setLeftMenuList],
  );
  const renderCard = (card: CardType, index: number) => {
    return (
      <Card
        key={card.id}
        index={index}
        id={card.id}
        text={card.text}
        left={card.left}
        top={card.top}
        moveCard={moveCard}
        childrenList={card.childrenList}
        tableDescription={card.tableDescription}
      />
    );
  };
  return (
    <div className="contentTopleft">
      <div className="imgBackgrounp" />
      <Select
        style={{ width: '100%', marginBottom: '8px' }}
        options={[
          {
            label: 'Jack',
            value: 'Jack',
          },
          {
            label: 'Mack',
            value: 'Mack',
          },
          {
            label: 'Tom',
            value: 'Tom',
          },
        ]}
      />
      {leftMenuList?.map((item, index) => renderCard(item, index))}
    </div>
  );
};
export default LeftMenuList;
