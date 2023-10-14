import { getTransactionRange } from '@/services/wallet/Transaction';
import { ProList } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Space, Tag } from 'antd';
import { useEffect, useState } from 'react';

const getData = async (): Promise<API.Transaction[]> => {
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const currentDateISOString = currentDate.toISOString(); // 日期部分
  const firstDayOfMonthISOString = firstDayOfMonth.toISOString(); // 日期部分
  const msg = await getTransactionRange({
    current: 1,
    pageSize: 30,
    start: firstDayOfMonthISOString,
    end: currentDateISOString,
  });
  return msg.data?.content || [];
};

export default () => {
  const { data: transaction = [] } = useRequest(() => getData());
  console.log(transaction);
  const [dataSource, setDataSource] = useState<API.Transaction[]>();
  useEffect(() => {
    getData().then((data) => {
      setDataSource(data);
    });
  }, []);
  return (
    <ProList<API.Transaction>
      rowKey="id"
      headerTitle="基础列表"
      dataSource={dataSource}
      showActions="hover"
      editable={{
        onSave: async (key, record, originRow) => {
          console.log(key, record, originRow);
          return true;
        },
      }}
      onDataSourceChange={setDataSource}
      metas={{
        title: {
          dataIndex: 'catagotyId',
        },
        avatar: {
          dataIndex: 'catagotyId',
          editable: false,
        },
        description: {
          dataIndex: 'time',
        },
        subTitle: {
          render: () => {
            return (
              <Space size={0}>
                <Tag color="blue">Ant Design</Tag>
                <Tag color="#5BD8A6">TechUI</Tag>
              </Space>
            );
          },
        },
        // actions: {
        //   render: (text, row, index, action) => [
        //     <a
        //       onClick={() => {
        //         action?.startEditable(row.id);
        //       }}
        //       key="link"
        //     >
        //       编辑
        //     </a>,
        //   ],
        // },
      }}
    />
  );
};
