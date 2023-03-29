import { useDrop } from 'react-dnd';
import { ItemTypes } from './ItemType';
import { Box } from './Box';
import update from 'immutability-helper';
import type { CardsItemType } from './type';

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
  console.log(cardsInBox, 'cardsInBox---');
  function checkID(item: any) {
    cardsInBox.forEach((card) => {
      if (card.id === item.id) {
        const min = Math.ceil(1);
        const max = Math.floor(100);
        item.id = Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
        checkID(item);
      }
    });
  }
  //   function getMousePos(event) {
  //     var e = event || window.event;
  //     var scrollX =
  //       document.documentElement.scrollLeft || document.body.scrollLeft;
  //     var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
  //     var x = e.pageX || e.clientX + scrollX;
  //     var y = e.pageY || e.clientY + scrollY;
  //     return { x: x, y: y };
  //   }
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    drop(item: any, monitor) {
      //   const { x: left, y: top } = getMousePos();
      if (!item.left && item.left !== 0) {
        checkID(item);
        item.left = 0;
        item.top = 0;
        console.log(item, 'item---');
        const isInList = cardsInBox?.find(
          (itemObj: CardsItemType) => itemObj.title === item.text,
        );
        if (!isInList) pushNewCardInBox(item);
      }
      //Перемещаем карточку если она уже была в боксе
      else {
        const delta = monitor.getDifferenceFromInitialOffset() as any;
        const left = Math.round(item.left + delta.x);
        const top = Math.round(item.top + delta.y);
        //Находит перетаскиваемую карту в массиве карт и передвигает её
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

  return (
    <div
      ref={drop}
      style={{
        position: 'relative',
        height: '400px',
        width: '100%',
      }}
    >
      {cardsInBox.map((card) => {
        const { id, left, top, title, childrenList } = card;
        const listChildren = childrenList?.map((item, index) => {
          return {
            text: item,
            onlyId: `only_id${index}`,
            isChecked: false,
          };
        });
        return (
          <Box
            key={cardsInBox.indexOf(card)}
            id={id}
            left={left}
            top={top}
            hideSourceOnDrag={hideSourceOnDrag}
            title={title}
            childrenList={listChildren}
          />
        );
      })}
    </div>
  );
};
