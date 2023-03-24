import { ScrollBoard, ActiveRingChart } from '@jiaminghi/data-view-react';
import { copyToClip } from '@/utils/copy';
import './index.less';

const config = {
  radius: '40%',
  activeRadius: '45%',
  color: ['red', 'green', 'yellow'],
  data: [
    {
      name: '周口',
      value: 55,
    },
    {
      name: '南阳',
      value: 120,
    },
    {
      name: '西峡',
      value: 78,
    },
    {
      name: '驻马店',
      value: 66,
    },
    {
      name: '新乡',
      value: 80,
    },
  ],
  digitalFlopStyle: {
    fontSize: 20,
    fill: 'green',
  },
};
const configTable = {
  header: ['列1', '列2', '列3', '列4', '列5', '列6', '列7', '列8'],
  data: [
    [
      '<span style="color:#37a2da;">行1列1</span>',
      '行1列2',
      '行1列3',
      '行1列4',
      '行1列5',
      '行1列6',
      '行1列7',
      '行1列8',
    ],
    ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
    ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
    ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
    ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
    ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
    ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
    ['行8列1', '<span style="color:#e062ae;">行8列2</span>', '行8列3'],
    ['<span style="color:#e690d1;">行9列1</span>', '行9列2', '行9列3'],
    ['行10列1', '<span style="color:#e7bcf3;">行10列2</span>', '行10列3'],
  ],
  index: true,
  columnWidth: [50],
  align: ['center'],
};
const LeftCharts = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
    }}
  >
    <ActiveRingChart
      className={'ccmc_middle'}
      config={config}
      style={{ width: '300px', height: '300px' }}
    />
    <ScrollBoard
      config={configTable}
      style={{ width: '900px', height: '220px' }}
      onClick={(a: any) => {
        copyToClip(a.ceil);
      }}
    />
  </div>
);
export default LeftCharts;
