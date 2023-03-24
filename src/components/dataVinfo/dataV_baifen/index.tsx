import { Decoration9 } from '@jiaminghi/data-view-react';
import './index.less';

interface PropsType {
  value: string;
}
const Percentage = ({ value }: PropsType) => {
  return (
    <div className="percentage">
      {value && (
        <Decoration9
          style={{
            width: '150px',
            height: '150px',
            color: '#7ec699',
            fontSize: '26px',
            // margin: '16px 0px 0px 16px',
          }}
          //   color={['red', 'green']}
        >
          {value}
        </Decoration9>
      )}
    </div>
  );
};
export default Percentage;
