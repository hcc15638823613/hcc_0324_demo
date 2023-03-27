import './index.less';
import { Select, Button } from 'antd';
import jsplumb from 'jsplumb';
import { useEffect } from 'react';

const jsPlumbIn = jsplumb.jsPlumb;

const mockList = [
  'VHSDHSJD_UIS',
  'EERRTT_UUYYT',
  'TTYYYUR_PPOO',
  'RTRT_POPO',
  'JJKK_LLKK',
  'YYTT_LLKKJJ',
  'OO_KKLLGGF',
];
const SqlDemo = () => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };
  /**
   * 初始化一个jsPlumb实例
   */
  const instance = jsPlumbIn.getInstance({
    DragOptions: { cursor: 'pointer', zIndex: 2000 },
    ConnectionOverlays: [
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
      [
        'Arrow',
        {
          location: 0,
          visible: true,
          width: 11,
          length: 11,
          direction: -1,
          id: 'arrow_backwards',
        },
      ],
      [
        'Label',
        {
          location: 0.5,
          id: 'label',
          cssClass: 'aLabel',
        },
      ],
    ],
    Container: 'container',
  });
  useEffect(() => {
    if (instance) {
      instance.importDefaults({
        ConnectionsDetachable: true,
        ReattachConnections: true,
      });
    }
  }, [instance]);
  //拖拽设置，然后添加modal，然后填充里面的元素
  const htmlDomClick = () => {
    const menuLeftDom = document.getElementById('leftMenu');
    mockList.map((obj) => {
      const mockHtml = document.createElement('li');
      mockHtml.innerHTML = `${obj}`;
      mockHtml.id = `${obj}`;
      menuLeftDom?.appendChild(mockHtml);
    });
    //拖拽设置
    // $('#leftMenu li').draggable({
    //   helper: 'clone',
    //   scope: 'plant',
    // });
    // $('#container').droppable({
    //   scope: 'plant',
    //   drop: function (event, ui) {
    //     CreateModel(ui, $(this), list);
    //   },
    // });
    console.log(menuLeftDom, 'liId---');
  };

  return (
    <div className={'editorContent'}>
      <div className={'contentTopleft'}>
        <div className={'imgBackgrounp'} />
        <div className="contentTopLeftTable">
          <Select
            style={{ width: '100%' }}
            onChange={handleChange}
            options={[
              {
                value: 'jack',
                label: 'Jack',
              },
              {
                value: 'lucy',
                label: 'Lucy',
              },
              {
                value: 'disabled',
                disabled: true,
                label: 'Disabled',
              },
              {
                value: 'Yiminghe',
                label: 'yiminghe',
              },
            ]}
          />
          <div id="leftMenu"></div>
          <Button onClick={htmlDomClick}>获取dom实例</Button>
        </div>
      </div>
      <div className={'contentTopRight'}>
        <ul id="container"></ul>
      </div>
    </div>
  );
};
export default SqlDemo;
