import { FlylineChart } from '@jiaminghi/data-view-react';

const DataVMap = () => {
  const config = {
    centerPoint: [0.48, 0.35],
    points: [
      {
        position: [0.52, 0.235],
        text: '新乡',
      },
      {
        position: [0.43, 0.29],
        text: '焦作',
      },
      {
        position: [0.59, 0.35],
        text: '开封',
      },
      {
        position: [0.53, 0.47],
        text: '许昌',
      },
      {
        position: [0.45, 0.54],
        text: '平顶山',
      },
      {
        position: [0.36, 0.38],
        text: '洛阳',
      },
      {
        position: [0.62, 0.55],
        text: '周口',
      },
      {
        position: [0.56, 0.56],
        text: '漯河',
      },
      {
        position: [0.37, 0.66],
        text: '南阳',
      },
      {
        position: [0.55, 0.81],
        text: '信阳',
      },
      {
        position: [0.55, 0.67],
        text: '驻马店',
      },
      {
        position: [0.37, 0.29],
        text: '济源',
      },
      {
        position: [0.2, 0.36],
        text: '三门峡',
      },
      {
        position: [0.76, 0.41],
        text: '商丘',
      },
      {
        position: [0.59, 0.18],
        text: '鹤壁',
      },
      {
        position: [0.68, 0.17],
        text: '濮阳',
      },
      {
        position: [0.59, 0.1],
        text: '安阳',
      },
    ],
    bgImgUrl: '	http://datav-react.jiaminghi.com/img/flylineChart/map.jpg',
    centerPointImg: {
      url: 'http://datav-react.jiaminghi.com/img/flylineChart/mapCenterPoint.png',
    },
    pointsImg: {
      url: 'http://datav-react.jiaminghi.com/img/flylineChart/mapPoint.png',
    },
  };
  return (
    <div>
      <FlylineChart
        config={config}
        style={{ width: '740px', height: '600px' }}
      />
    </div>
  );
};
export default DataVMap;
