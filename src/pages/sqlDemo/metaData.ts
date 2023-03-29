/**
 * 元数据
 */
import jsplumb from 'jsplumb';

const jsPlumbIn = jsplumb.jsPlumb;
const metadata = [
  {
    student: {
      name: '学生会',
      index: 'student',
      type: 'student',
      properties: {
        id: {
          des: 'id',
        },
        name: {
          des: '姓名',
        },
        title: {
          des: '职务',
        },
        phone: {
          des: '电话',
        },
        email: {
          des: '邮箱',
        },
      },
    },
  },
  {
    computer: {
      name: '计算机社团',
      index: 'computer',
      type: 'computer',
      properties: {
        id: {
          des: 'id',
        },
        name: {
          des: '姓名',
        },
        title: {
          des: '职务',
        },
        phone: {
          des: '电话',
        },
        email: {
          des: '邮箱',
        },
      },
    },
  },
  {
    RedCross: {
      name: '红十字会',
      index: 'RedCross',
      type: 'RedCross',
      properties: {
        id: {
          des: 'id',
        },
        name: {
          des: '姓名',
        },
        title: {
          des: '职务',
        },
        phone: {
          des: '电话',
        },
        email: {
          des: '邮箱',
        },
      },
    },
  },
];

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
export { instance, metadata };

// const onMouseDownClick = (e: any) => {
//   const flowChart = document.querySelector('#container');
//   if (!flowChart) return;
//   flowChart.classList.add('flowChart_focus');
//   console.log(flowChart, 'flowChart--++');
// };
// function comparePos(child: dom, father: dom) {
//   let result = null;
//   if (
//     child.x >= father.x &&
//     child.x <= father.x + father.width &&
//     child.y >= father.y &&
//     child.y <= father.y + father.height
//   ) {
//     const _x = child.x - father.x,
//       _y = child.y - father.y;
//     result = {
//       x: _x + 100 > father.width ? father.width - 100 : _x,
//       y: _y + 100 > father.height ? father.height - 100 : _y,
//     };
//   }
//   return result;
// }
// function getElementPosition(e: any) {
//   var x = 0,
//     y = 0;
//   const width = e.offsetWidth,
//     height = e.offsetHeight;
//   while (e != null) {
//     x += e.offsetLeft;
//     y += e.offsetTop;
//     e = e.offsetParent;
//   }
//   return { x: x, y: y, width, height };
// }

// const onMouseUpClick = (e: any, obj: any) => {
//   const { id: onlyId, title } = obj;
//   console.log(obj, 'obj---');
//   const flowChart: any | null = document.querySelector('#flowChart');
//   if (!flowChart) return;
//   const items = flowChart.querySelectorAll('.item');
//   flowChart.classList.remove('flowChart_focus');
//   if (
//     Array.from(items).findIndex(
//       (item: any) => item.getAttribute('id') === onlyId,
//     ) !== -1
//   ) {
//     console.error('模块已存在');
//     return;
//   }
//   const pos = getElementPosition(flowChart); // 获取元素的坐标
//   const result = comparePos(
//     {
//       x: e.clientX,
//       y: e.clientY,
//       width: e.target.offsetWidth,
//       height: e.target.offsetHeight,
//     },
//     pos,
//   ); // 判断元素是否在另一元素内
//   if (!!result) {
//     /* 创建控件 */
//     const _div: any = document.createElement('div');
//     _div.setAttribute('id', onlyId);
//     _div.setAttribute('title', title);
//     _div.flowParams = {
//       onlyId,
//       title,
//       ...obj,
//     };
//     _div.classList.add('item');
//     _div.style.left = result.x + 'px';
//     _div.style.top = result.y + 'px';
//     /* 创建控件 */
//     /* 创建空间中间的文字块 */
//     const _text = document.createElement('span');
//     _text.classList.add('text');
//     _text.innerText = title.length > 6 ? title.slice(0, 5) + '...' : title;
//     /* 创建空间中间的文字块 */
//     /* 创建删除按钮 */
//     const _del = document.createElement('span');
//     _del.classList.add('delIcon');
//     /* 创建删除按钮 */
//     _div.appendChild(_text);
//     _div.appendChild(_del);
//     flowChart.appendChild(_div);
//     var common = {
//       maxConnections: -1, // 不限制链接数
//     };
//     flowChart.instance.addEndpoint(
//       onlyId,
//       {
//         anchor: 'Left',
//         maxConnections: -1,
//       },
//       { ...common, isTarget: true },
//     ); // 添加了节点之后，需要给节点加上可连线的，isTarget标记为终点
//     flowChart.instance.addEndpoint(
//       onlyId,
//       {
//         anchor: 'Right',
//         maxConnections: -1,
//       },
//       { ...common, isSource: true },
//     ); // isSource标记为起点
//     flowChart.instance.draggable(_div, { containment: '#flowChart' }); // 给新加入的节点赋予可拖拽属性
//   }
// };
//拖拽设置，然后添加modal，然后填充里面的元素
// const htmlDomClick = () => {
//   const menuLeftDom = document.getElementById('leftMenu');
//   mockList.map((obj) => {
//     const mockHtml = document.createElement('li');
//     mockHtml.innerHTML = `${obj}`;
//     mockHtml.id = `${obj}`;
//     menuLeftDom?.appendChild(mockHtml);
//     mockHtml.draggable = true;
//     mockHtml.onmousedown = onMouseDownClick;
//     mockHtml.classList.add('item');
//     mockHtml.onmouseup = (e) => {
//       onMouseUpClick(e, obj);
//     };
//   });
//   //拖拽设置
//   // $('#leftMenu li').draggable({
//   //   helper: 'clone',
//   //   scope: 'plant',
//   // });
//   // $('#container').droppable({
//   //   scope: 'plant',
//   //   drop: function (event, ui) {
//   //     CreateModel(ui, $(this), list);
//   //   },
//   // });
//   console.log(menuLeftDom, 'liId---');
// };
