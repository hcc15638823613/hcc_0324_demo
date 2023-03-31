/** 可拖拽流程图单体 */

import { useEffect } from 'react';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import type { ChildrenTableListType } from './type';
import { ItemTypes } from './type';
import { useDrag } from 'react-dnd';
import { jsPlumb } from 'jsplumb';
import { Checkbox } from 'antd';
import { useModel } from 'umi';
import './index.less';
import '@/pages/sqlDemo/index.less';
import { CloseOutlined } from '@ant-design/icons';

interface PropsType {
  id: number;
  left: number | null;
  top: number | null;
  hideSourceOnDrag: boolean;
  title: string;
  childrenList: ChildrenTableListType[] | undefined;
  onOpenModal: (value: any) => void;
  onOpenDeleteModal: (value: any, conScene: any) => void;
}
const jsPlumbInstence = jsPlumb as any;

export const Box = ({
  id,
  left,
  top,
  childrenList,
  title,
  onOpenModal,
  onOpenDeleteModal,
}: PropsType) => {
  const { jsPlumbListState, setJsPlumbListState } = useModel('useSqlInfo');

  // 选择框
  const onChange = (
    e: CheckboxChangeEvent,
    listItem: ChildrenTableListType | undefined,
  ) => {
    const newRightJsPlumbList = jsPlumbListState?.map((item) => {
      if (String(item?.jsPlumbId) === String(id))
        return {
          ...item,
          childrenList: item?.childrenList?.map((item) => {
            if (item?.id === listItem?.id)
              return { ...item, isChecked: e.target.checked };
            return item;
          }),
        };
      return item;
    });
    setJsPlumbListState(newRightJsPlumbList);
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
            label: ``,
          },
        ],
        [
          'Arrow',
          {
            location: 1,
            visible: true,
            width: 11,
            length: 11,
            direction: 1,
            id: 'arrow_forwards',
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

    // 双击删除连线
    jsPlumbInstence.bind('dblclick', (conn: any) => {
      onOpenDeleteModal(jsPlumbInstence, conn);
    });

    jsPlumbInstence.bind('beforeDrop', function (info: any) {
      // 抛出实例 更改连线的label
      onOpenModal(info);
      return true;
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
    const newList = jsPlumbListState?.filter((item) => {
      return String(item?.jsPlumbId) !== String(id);
    });
    setJsPlumbListState(newList);
  };

  return (
    <>
      <div
        id={String(id)}
        ref={drag}
        style={{
          position: 'absolute',
          backgroundColor: 'white',
          cursor: 'move',
          left: left || 0,
          top: top || 0,
          zIndex: 9,
          maxHeight: '400px',
          overflowY: 'auto',
        }}
        className="tabItem"
      >
        <div className="canvasItemBox">
          <div className="headerTitle">
            <h4 className="headerText">{title}</h4>
            <CloseOutlined
              style={{ marginRight: '6px', cursor: 'pointer' }}
              onClick={deleteCard}
            />
          </div>
          {childrenList?.map((item) => {
            return (
              <div className="checkBoxItem" key={item?.id?.toString()}>
                <Checkbox
                  onChange={(e) => {
                    onChange(e, item);
                  }}
                >
                  {item?.text}
                </Checkbox>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
