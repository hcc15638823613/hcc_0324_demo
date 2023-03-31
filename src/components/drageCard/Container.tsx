/* 右侧拖拽容器 */

import { useDrop } from 'react-dnd';
import { ItemTypes } from './type';
import { Box } from './Box';
import update from 'immutability-helper';
import type { CardsItemType } from './type';
import { uniqueId, uniqBy } from 'lodash';
import { useModel } from 'umi';
import { Modal, Form, Select } from 'antd';
import { useState, useMemo } from 'react';

interface PropsType {
  cardsInBox: CardsItemType[];
  setCardsInBox: any;
  pushNewCardInBox: any;
  hideSourceOnDrag: boolean;
}

export const Container = ({
  hideSourceOnDrag,
  cardsInBox,
  setCardsInBox,
  pushNewCardInBox,
}: PropsType) => {
  const [form] = Form.useForm();
  // 画布上的 dom实例
  const { jsPlumbListState, setJsPlumbListState } = useModel('useSqlInfo');
  // 流程图工具
  const [jsPlumb, setJsPlumb] = useState<any>();
  // jsPlumb实例
  const [conneInfo, setConneInfo] = useState<any>();
  // 删除连线的实体
  const [deleteConScene, setDeleteConScene] = useState<any>();
  // 填写 连线label的modal
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // 是否删除label连线的modal
  const [isDeleteLineModal, setIsDeleteLineModal] = useState<boolean>(false);

  function checkID(item: any) {
    cardsInBox.forEach((card) => {
      if (card.id === item.id) {
        item.id = uniqueId('onlyId');
        checkID(item);
      }
    });
  }

  function getMousePos(event?: any) {
    const flowChart = document
      .getElementById('flowChart')
      ?.getBoundingClientRect();
    const domLeft = flowChart?.left || 0;
    const domTop = flowChart?.top || 0;
    var e = event || window.event;
    // var scrollX =
    //   document.documentElement.scrollLeft || document.body.scrollLeft;
    // var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
    var x = e.pageX || e.clientX;
    var y = e.pageY || e.clientY;
    return { x: x - domLeft, y: y - domTop };
  }

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop(item: any, monitor) {
      const findId = cardsInBox?.find((fitem) => fitem?.id === item?.id);
      if (!item.left || item.left === 0 || findId) {
        checkID(item);
        const { x: left, y: top } = getMousePos();
        item.left = left;
        item.top = top;
        const uniqByList = uniqBy(
          [
            ...jsPlumbListState,
            {
              jsPlumbId: item?.id,
              title: item?.text,
              childrenList: item?.childrenList,
            },
          ],
          'jsPlumbId',
        );
        setJsPlumbListState(uniqByList);
        pushNewCardInBox(item);
      } else {
        const delta = monitor.getDifferenceFromInitialOffset() as any;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        cardsInBox.forEach((el) => {
          if (el.id === item.id) moveBox(cardsInBox.indexOf(el), left, top);
        });
      }
      return undefined;
    },
  });
  const moveBox = (id: number, left: number, top: number) => {
    setCardsInBox(
      update(cardsInBox, {
        [id]: {
          $merge: { left, top },
        },
      }),
    );
  };

  // label链接完成打开的modal
  const onOpenModal = (value?: any) => {
    setIsOpen(true);
    setConneInfo(value);
  };
  const onCloseModal = async () => {
    await form.validateFields().then((resForm) => {
      const { hostTable, equal, childrenTable } = resForm;
      const formText = `${hostTable}${equal}${childrenTable}`;
      setIsOpen(false);
      const connector = conneInfo.connection.canvas;
      // 获取conneInfo实例对应的label的dom元素
      const labelTetxNode = connector.nextSibling;
      labelTetxNode.innerHTML = `<div style="background:#ffff34;padding: 0 2px;cursor: pointer;color: #438eb9;font-size: 12px;">${formText}</div>`;
      setConneInfo(null);
    });
  };
  // 双击连线的打开modal
  const onOpenDeleteModal = (value: any, conScene: any) => {
    setIsDeleteLineModal(true);
    setJsPlumb(value);
    setDeleteConScene(conScene);
  };
  // 关闭连线的modal
  const onCloseDeleteModal = () => {
    setIsDeleteLineModal(false);
    jsPlumb.deleteConnection(deleteConScene);
    setJsPlumb(null);
    setDeleteConScene(false);
  };
  // 删除弹窗的文案
  const deleteModalTetx = useMemo(() => {
    const domText = deleteConScene?.canvas?.nextSibling?.innerText;
    return domText || '';
  }, [deleteConScene]);
  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        height: '400px',
        width: '100%',
      }}
      id="flowChart"
    >
      <Modal
        open={isOpen}
        title="关联关系（下拉选项支持搜索，区分大小写）"
        onOk={onCloseModal}
        onCancel={() => {
          setIsOpen(false);
        }}
      >
        <Form form={form}>
          <Form.Item name="hostTable" label="主表">
            <Select
              options={[
                {
                  label: 'ACT_EVT_LOG.DATA_0',
                  value: 'ACT_EVT_LOG.DATA_0',
                },
                {
                  label: 'MOCK.DATA_1',
                  value: 'MOCK.DATA_1',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="equal" label="等于">
            <Select
              options={[
                {
                  label: '=',
                  value: '=',
                },
              ]}
            />
          </Form.Item>
          <Form.Item name="childrenTable" label="子表">
            <Select
              options={[
                {
                  label: 'CHILDREN.DATA_0',
                  value: 'CHILDREN.DATA_0',
                },
                {
                  label: 'CHILDREN.DATA_1',
                  value: 'CHILDREN.DATA_1',
                },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={isDeleteLineModal}
        title="提示"
        onOk={onCloseDeleteModal}
        onCancel={() => {
          setIsDeleteLineModal(false);
        }}
      >
        删除【{deleteModalTetx}】的关系么？
      </Modal>
      {cardsInBox.map((card) => {
        const { id, left, top, title, childrenList } = card;
        return (
          <Box
            key={cardsInBox.indexOf(card)}
            id={id}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
            title={title}
            childrenList={childrenList}
            onOpenModal={onOpenModal}
            onOpenDeleteModal={onOpenDeleteModal}
          />
        );
      })}
    </div>
  );
};
