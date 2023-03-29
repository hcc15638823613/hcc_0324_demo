/** 可拖拽流程图单体 */

import { useEffect, useState, useMemo } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { ItemTypes } from './ItemType';
import { useDrag } from 'react-dnd';
import { jsPlumb } from 'jsplumb';
import '@/pages/sqlDemo/index.less';
import { Checkbox } from 'antd';
import { useModel } from 'umi';
import './canvasItem.less';

interface ListType {
  text: string;
  onlyId: string;
  isChecked: boolean;
}
interface PropsType {
  id: number;
  left: number | null;
  top: number | null;
  hideSourceOnDrag: boolean;
  //   children: React.ReactNode;
  title: string;
  childrenList: ListType[] | undefined;
}

const jsPlumbInstence = jsPlumb as any;
export const Box = ({
  id,
  left,
  top,
  //   hideSourceOnDrag,
  childrenList,
  title,
}: PropsType) => {
  const [mockText, setText] = useState('默认文本');
  const { cardList, setCardList } = useModel('useSqlInfo');
  const [listState, setListState] = useState<ListType[] | undefined>(
    childrenList,
  );
  const onChange = (e: CheckboxChangeEvent, listItem: ListType | undefined) => {
    const newList = listState?.map((item) => {
      if (item?.onlyId === listItem?.onlyId)
        return { ...item, isChecked: e.target.checked };
      return item;
    });
    setListState(newList);
  };
  useEffect(() => {
    jsPlumbInstence.draggable(String(id), {
      containment: true,
      ConnectionsDetachable: true,
      ReattachConnections: true,
    });
    let exampleGreyEndpointOptions = {
      paintStyle: { fill: 'rgb(98, 168, 209)', radius: 6 },
      connectorStyle: { stroke: 'black', strokeWidth: 2 },
      endpoint: ['Dot', { cssClass: 'endpointcssClass' }], //端点形状
      isSource: true, //是否可拖动（作为连接线起点）
      connector: [
        'Flowchart',
        {
          stub: 30,
          gap: 0,
          coenerRadius: 0,
          alwaysRespectStubs: true,
          midpoint: 0.5,
        },
      ],
      connectorOverlays: [
        [
          'Label',
          {
            location: 0.5,
            id: 'label',
            cssClass: 'aLabel',
            label: `${mockText}`,
          },
        ],
      ],
      isTarget: true, //是否可以放置（连接终点）
      maxConnections: -1,
    };
    jsPlumbInstence.addEndpoint(
      String(id),
      { anchors: 'Right' },
      exampleGreyEndpointOptions,
    );
    jsPlumbInstence.addEndpoint(
      String(id),
      { anchors: 'Top' },
      exampleGreyEndpointOptions,
    );
    jsPlumbInstence.addEndpoint(
      String(id),
      { anchors: 'Left' },
      exampleGreyEndpointOptions,
    );
    jsPlumbInstence.addEndpoint(
      String(id),
      { anchors: 'Bottom' },
      exampleGreyEndpointOptions,
    );
    // 连接完成后的操作
    jsPlumbInstence.bind(
      'connection',
      function (connInfo: any, originalEvent: any) {
        const { sourceId, targetId } = connInfo.connection;
        console.log(cardList, 'cardList--');
        const startCard = cardList?.find((item) => {
          return String(item?.id) === sourceId;
        });
        const endCard = cardList?.find((item) => {
          return String(item?.id) === targetId;
        });
        console.log(startCard, 'startCard---');
        console.log(endCard, 'endCard');
        // 连线完成后获取到连线的起始数据进行处理
        jsPlumbInstence.importDefaults({
          paintStyle: { width: 10, height: 10, fill: 'red' },
        });
      },
    );
    jsPlumbInstence.bind('dblclick', (conn: any) => {
      // 删除链接关系
      jsPlumbInstence.deleteConnection(conn);
    });
  }, []);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  //   if (isDragging && hideSourceOnDrag) {
  //     return <div ref={drag} />;
  //   }
  // 删除画布节点以及连线
  const deleteCard = () => {
    jsPlumbInstence.remove(String(id));
  };

  return (
    <div
      id={String(id)}
      ref={drag}
      style={{
        position: 'absolute',
        backgroundColor: 'white',
        cursor: 'move',
        left: left || 0,
        top: top || 0,
        zIndex: 999,
        maxHeight: '400px',
        overflowY: 'auto',
      }}
      className="tabItem"
    >
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
    </div>
  );
};
