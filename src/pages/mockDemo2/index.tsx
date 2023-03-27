import LeftCharts from '@/components/dataVinfo';
import { BorderBox1, Decoration5 } from '@jiaminghi/data-view-react';
import './index.less';
import Percentage from '@/components/dataVinfo/dataV_baifen';
import DataVMap from '@/components/dataVinfo/dataV_map';
import RankingRoutation from '@/components/dataVinfo/rankingRotation';
import { useEffect, useState } from 'react';

const MockHtml2 = () => {
  const [dataVstate, setDataVstate] = useState<string>('88%');
  useEffect(() => {
    setTimeout(() => {
      setDataVstate('60%');
    }, 3000);
  }, []);
  return (
    <div className={'content'}>
      <div className={'headerText'}>施工综合数据</div>
      <Decoration5 style={{ width: '100%', height: '100px' }} />
      <BorderBox1>
        <Percentage value={dataVstate} />
        <div className="datavmapBox">
          <RankingRoutation />
          <DataVMap />
        </div>
        <LeftCharts />
      </BorderBox1>
    </div>
  );
};
export default MockHtml2;
