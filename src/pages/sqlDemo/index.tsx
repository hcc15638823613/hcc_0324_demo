import './index.less';
import { useState } from 'react';
import update from 'immutability-helper';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import type { CardType } from '@/components/drageCard/type';
import Example from '@/components/drageCard/moveArea';
import LeftMenuList from './leftMenuList';
import { ProField } from '@ant-design/pro-components';
import { Button } from 'antd';
import { copyToClip } from '@/utils/copy';
import AddTableModal from './addTable';
// import GraphEditor from '@/components/GraphEditor/editorReact';

const SqlDemo = () => {
  const [editorValue, setEditorValue] = useState<string>(`{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "suppressImplicitAnyIndexErrors": true,
    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["**/src", "**/docs", "scripts", "**/demo", ".eslintrc.js"]
}
`);
  const [runSqlValue, setRunSqlValue] = useState<string>(`{
  "compilerOptions": {
    "target": "esnext",
    "moduleResolution": "node",
    "jsx": "preserve",
    "esModuleInterop": true,
    "experimentalDecorators": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "suppressImplicitAnyIndexErrors": true,
    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["**/src", "**/docs", "scripts", "**/demo", ".eslintrc.js"]
}
`);

  const [cardsInBox, setCardsInBox] = useState<any>([]);

  function pushNewCardInBox(card: CardType) {
    const id = String(cardsInBox.length);
    setCardsInBox(
      update(cardsInBox, {
        [id]: {
          $set: {
            id: card.id,
            top: card.top,
            left: card.left,
            title: card.text,
            childrenList: card.childrenList,
          },
        },
      }),
    );
  }
  // const onChangeEditorValue = (val: string | undefined) => {
  //   setEditorValue(val);
  // };
  return (
    <div style={{ background: '#f5f6fa' }}>
      <div className={'editorContent'}>
        <DndProvider backend={HTML5Backend}>
          <LeftMenuList />
          <Example
            setCardsInBox={setCardsInBox}
            pushNewCardInBox={pushNewCardInBox}
            cardsInBox={cardsInBox}
          />
        </DndProvider>
      </div>
      <div className="preContext">
        {/* <GraphEditor
          value={editorValue}
          changeValue={onChangeEditorValue}
          isREadOnly={true}
        /> */}
        {/* <pre className="preBox">{editorValue}</pre> */}
        <div className="preContextHeader">生成SQL</div>
        <div className="preContentBox">
          <div className="leftBox">
            <div className="leftBoxHeader">
              <div className="runCode">运行SQL</div>
              <div
                className="copyCode"
                onClick={() => {
                  copyToClip(runSqlValue);
                }}
              >
                复制代码
              </div>
            </div>
            <ProField
              text={editorValue}
              valueType="jsonCode"
              mode={'read'}
              plain={true}
              style={{ width: '100%' }}
            />
          </div>
          <div className="rightBox">
            <div className="rightBoxHeader">
              <div className="runCode">创建视图SQL</div>
              <div
                className="copyCode"
                onClick={() => {
                  copyToClip(runSqlValue);
                }}
              >
                复制代码
              </div>
            </div>
            <ProField
              text={editorValue}
              valueType="jsonCode"
              mode={'read'}
              plain={true}
            />
          </div>
        </div>
      </div>
      <div className="footerBox">
        <AddTableModal />
        <Button className="createSql">生成SQL</Button>
      </div>
    </div>
  );
};
export default SqlDemo;
