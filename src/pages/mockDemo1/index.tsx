import styles from './index.less';
import { Table, Space, Button, Image, Spin } from 'antd';
import { useState, useEffect } from 'react';
import { connect } from 'dva';
import { useI18n } from '@/utils/usel18n';

export interface dataListType {
  id: number;
  nameList: string[];
  age: number;
  dataTime: any;
  imgUrl: string;
  title: string;
}

const MockHtml1 = (props: any) => {
  const [visible, setVisible] = useState(false);
  const { page, pageSize, total, mockHtml, mockLOading, dispatch, dataList } =
    props;
  const i = useI18n('mockHtml1');

  useEffect(() => {
    dispatch({
      type: 'mockHtml1/getDataList',
      payload: {
        data: {},
      },
    });
  }, []);
  return (
    <div className={styles.mockBox}>
      <Spin spinning={mockLOading}>
        <Table
          dataSource={dataList}
          rowKey="id"
          columns={[
            {
              title: i('columns.code'),
              dataIndex: 'id',
              render: (_, record) => {
                return <div>{record.id}</div>;
              },
            },
            {
              title: i('columns.name'),
              dataIndex: 'name',
              render: (_, record) => {
                return <div>{record.nameList.join()}</div>;
              },
            },
            {
              title: i('columns.img'),
              dataIndex: 'imgUrl',
              render: (_, record) => {
                return (
                  <>
                    <Image
                      width={30}
                      onClick={() => setVisible(true)}
                      preview={{ visible: false }}
                      src={record.imgUrl}
                      placeholder={true}
                    />
                    <div style={{ display: 'none' }}>
                      <Image.PreviewGroup
                        preview={{
                          visible,
                          onVisibleChange: (vis) => setVisible(vis),
                        }}
                      >
                        <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
                        <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
                        <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
                      </Image.PreviewGroup>
                    </div>
                  </>
                );
              },
            },
            {
              title: i('columns.extra'),
              render: (_, record) => {
                return (
                  <Space>
                    <Button>编辑</Button>
                    <Button>删除</Button>
                  </Space>
                );
              },
            },
          ]}
        />
      </Spin>
    </div>
  );
};
export default connect(({ mockHtml1 }: any) => ({
  ...mockHtml1,
}))(MockHtml1);
