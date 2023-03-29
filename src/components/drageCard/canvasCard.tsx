import { Checkbox } from 'antd';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { useState } from 'react';
import './canvasItem.less';

interface ListType {
  text: string;
  onlyId: number;
  isChecked: boolean;
}

interface PropsType {
  title: string;
  list: ListType[] | undefined;
  deleteCard: () => void;
}

const CanvasCard = ({ title, list, deleteCard }: PropsType) => {
  const [listState, setListState] = useState<ListType[] | undefined>(list);
  const onChange = (e: CheckboxChangeEvent, listItem: ListType | undefined) => {
    const newList = listState?.map((item) => {
      if (item?.onlyId === listItem?.onlyId)
        return { ...item, isChecked: e.target.checked };
      return item;
    });
    setListState(newList);
  };
  return (
    <div className="canvasItemBox">
      <div className="headerTitle">
        <h4 className="headerText">{title}</h4>
        <span
          style={{ marginRight: '6px', cursor: 'pointer' }}
          onClick={deleteCard}
        >
          X
        </span>
      </div>
      {listState?.map((item) => {
        return (
          <div className="checkBoxItem" key={item?.onlyId?.toString()}>
            <Checkbox
              onChange={(e) => {
                onChange(e, item);
              }}
              value={item?.isChecked}
            >
              {item?.text}
            </Checkbox>
          </div>
        );
      })}
    </div>
  );
};
export default CanvasCard;
