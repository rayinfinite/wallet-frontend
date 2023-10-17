import '@/material.css';
import { deleteTransaction, getTransactionRange } from '@/services/wallet/transaction';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ActionType, ProList, ProListMetas } from '@ant-design/pro-components';
import { FormattedMessage, useModel } from '@umijs/max';
import { Button, Space, Tag } from 'antd';
import { useEffect, useRef, useState } from 'react';
import ActionForm from './form';

const dayjs = require('dayjs');

const getData = async (): Promise<API.Transaction[]> => {
  const currentDate = dayjs().add(1, 'day');
  const firstDayOfMonth = dayjs().startOf('month');
  const currentDateISOString = currentDate.format('YYYY-MM-DDTHH:mm:ss');
  const firstDayOfMonthISOString = firstDayOfMonth.format('YYYY-MM-DDTHH:mm:ss');
  console.log(currentDateISOString, firstDayOfMonthISOString);
  const msg = await getTransactionRange({
    current: 1,
    pageSize: 1000,
    start: firstDayOfMonthISOString,
    end: currentDateISOString,
  });
  const list = msg.data?.content || [];
  list.sort((a, b) => {
    return a.time && b.time ? b.time.localeCompare(a.time) : 0;
  });
  return list;
};

function formatDate(inputString: string | undefined) {
  const date = dayjs(inputString);
  if (!date.isValid()) {
    return 'Invalid Date'; // 处理无效日期输入
  }
  return date.format('MM-DD HH:mm');
}

export default () => {
  const { visible, setVisible } = useModel('modal');
  const [initialValues, setInitialValues] = useState<API.Transaction | null>(null);
  const [dataSource, setDataSource] = useState<API.Transaction[]>();
  const actionRef = useRef<ActionType>();

  useEffect(() => {
    getData().then((data) => {
      setDataSource(data);
    });
  }, []);

  const metas: ProListMetas<API.Transaction> = {
    title: {
      dataIndex: 'notes',
    },
    avatar: {
      dataIndex: 'catagory.icon',
      render: (text, row) => {
        return <span className="material-symbols-outlined">{row.category?.icon}</span>;
      },
    },
    subTitle: {
      render: (text, row) => {
        return (
          <Space size={0}>
            <Tag color="blue">{formatDate(row.time)}</Tag>
            <Tag color="#5BD8A6">{row.account}</Tag>
            <Tag color="pink">{row.category?.type === 1 ? 'income' : 'expense'}</Tag>
          </Space>
        );
      },
    },
    content: {
      dataIndex: 'amount',
    },
    actions: {
      render: (text, row, _, action) => [
        <EditOutlined
          key="edit"
          onClick={() => {
            setInitialValues(row);
            setVisible(true);
          }}
        />,
        <a
          key="delete"
          onClick={async () => {
            if (row.id !== undefined) {
              await deleteTransaction({ id: row.id }).then(() => {
                action?.reload();
              });
            }
          }}
        >
          <DeleteOutlined />
        </a>,
      ],
    },
  };

  return (
    <>
      <ProList<API.Transaction>
        rowKey="id"
        headerTitle="基础列表"
        dataSource={dataSource}
        showActions="hover"
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setInitialValues(null);
              setVisible(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="add" defaultMessage="New" />
          </Button>,
        ]}
        onDataSourceChange={setDataSource}
        metas={{ ...metas }}
      />
      {visible && <ActionForm actionRef={actionRef} init={initialValues} />}
    </>
  );
};
