import { Modal, Button, Table, Input } from 'antd';
import type { CardType } from '@/components/drageCard/type';
import { useState } from 'react';
import styles from './index.less';
import { useModel } from 'umi';
import { uniqBy } from 'lodash';

const AddTableModal = () => {
  const [visiabled, setVisiabled] = useState<boolean>(false);
  const { cardList, setLeftMenuList, leftMenuList } = useModel('useSqlInfo');
  const [selectKeys, setSelectKeys] = useState<CardType[]>([]);
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '表名',
      dataIndex: 'text',
      width: 260,
      ellipsis: true,
    },
    {
      title: '表说明',
      dataIndex: 'tableDescription',
    },
  ];
  const setDataListClick = () => {
    if (selectKeys.length) {
      const list = [...selectKeys, ...leftMenuList];
      const uniqbyList = uniqBy(list, 'id');
      setLeftMenuList(uniqbyList);
    }
    setVisiabled(false);
  };
  return (
    <>
      <Button className={styles.addTable} onClick={() => setVisiabled(true)}>
        + 添加表
      </Button>
      <Modal
        title="请选择查询表"
        destroyOnClose
        centered
        open={visiabled}
        onOk={() => setVisiabled(false)}
        onCancel={() => setVisiabled(false)}
        width={655}
      >
        <div className={styles.modalHeader}>
          <span>表名/说明</span>
          <Input style={{ width: '200px' }} />
        </div>
        <Button
          type="primary"
          style={{ marginBottom: '14px' }}
          onClick={setDataListClick}
        >
          + 确定
        </Button>
        <Table
          dataSource={cardList}
          columns={columns}
          rowKey="id"
          rowSelection={{
            type: 'checkbox',
            preserveSelectedRowKeys: true,
            onChange: (selectedRowKeys, selectedRows) => {
              setSelectKeys(selectedRows);
            },
            selectedRowKeys: selectKeys?.map((item) => item.id),
          }}
        />
      </Modal>
    </>
  );
};
export default AddTableModal;
