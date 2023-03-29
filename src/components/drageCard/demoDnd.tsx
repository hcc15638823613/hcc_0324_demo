import { useDrag, useDrop } from 'react-dnd';
import { DragProps, AcceptorProps } from './type';
export const Dragger = function Dragger(option: DragProps) {
  const { name, data, type, onDragFinished } = option;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: type,
    item: { name: name, data: data },
    end: (item, monitor, ...arg) => {
      console.log(arg);
      const dropResult = monitor.getDropResult();
      if (item && dropResult) {
        console.log('source:', item);
        console.log('target:', dropResult);
      }
      if (onDragFinished) {
        onDragFinished(item, dropResult);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));
  const opacity = isDragging ? 0.4 : 1;
  return (
    <div
      ref={drag}
      role={option.role}
      style={{ opacity }}
      data-id={`${option.name}`}
    >
      {option.content}
    </div>
  );
};

export const Acceptor = (option: AcceptorProps) => {
  const { name, data, type, styleType, onHover } = option;
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: type,
    drop: () => option,
    hover: () => {
      if (onHover) {
        onHover();
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));
  const isActive = canDrop && isOver;
  let backgroundColor = '#222';
  let borderBottom = '0px solid rgba(31, 92, 206, 0)';
  if (isActive) {
    backgroundColor = 'rgba(64, 224, 208, 0.3)';
    borderBottom = '1px solid #26BD11';
  } else if (canDrop) {
    backgroundColor = 'rgba(100, 149, 277, 0.3)';
    borderBottom = '1px solid #2063AF';
  }
  return (
    <div
      ref={drop}
      role={'Acceptor'}
      style={
        styleType === 'background' ? { backgroundColor } : { borderBottom }
      }
    >
      {option.content}
    </div>
  );
};
//同一list之间拖动
export const dragList = (
  list: Array<any>,
  crtIndex: number,
  willIndex: number,
) => {
  let targetItem = list[crtIndex];
  let delIndex = crtIndex < willIndex ? crtIndex : crtIndex + 1;
  list.splice(willIndex, 0, targetItem);
  list.splice(delIndex, 1);

  return list;
};
//来自不同list之间拖动，1.删除原来  2不删除原来
export const dragToList = (
  list: Array<any>,
  targetList: Array<any>,
  crtIndex: number,
  willIndex: number,
  del: 1 | 2,
) => {
  let targetItem = list[crtIndex];
  targetList.splice(willIndex, 0, targetItem);
  if (del === 1) {
    list.splice(crtIndex, 1);
  }

  return { list, targetList };
};
