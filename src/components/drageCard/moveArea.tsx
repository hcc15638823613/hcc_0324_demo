// import React, { useState, useCallback } from 'react';
import { Container } from './Container';
import type { CardsItemType } from './type';
import '@/pages/sqlDemo/index.less';

interface PropsType {
  cardsInBox: CardsItemType[];
  setCardsInBox: any;
  pushNewCardInBox: any;
}

export default function Example({
  cardsInBox,
  setCardsInBox,
  pushNewCardInBox,
}: PropsType) {
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <div className="contentTopRight" />
      <Container
        hideSourceOnDrag={true}
        cardsInBox={cardsInBox}
        setCardsInBox={setCardsInBox}
        pushNewCardInBox={pushNewCardInBox}
      />
    </div>
  );
}
