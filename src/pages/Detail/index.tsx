import '@/material.css';
import { getAccountPage } from '@/services/wallet/account';
import { getAllCategory } from '@/services/wallet/category';
import { deleteTransaction, getTransactionRange } from '@/services/wallet/transaction';
import t from '@/utils/i18n';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { type ProColumns } from '@ant-design/pro-components';
import { ProTable, type RequestData } from '@ant-design/pro-table';
import { useModel } from '@umijs/max';
import { Button } from 'antd';
import { useState } from 'react';
import ActionForm from './form';
const dayjs = require('dayjs');

function formatDate(inputString: string | undefined) {
  const date = dayjs(inputString);
  if (!date.isValid()) {
    console.log(inputString);
    return 'Invalid Date'; // 处理无效日期输入
  }
  return date.format('YY-MM-DD HH:mm');
}

export default () => {
  const { actionRef } = useModel('model');
  const { visible, setVisible } = useModel('modal');
  const [initialValues, setInitialValues] = useState<API.Transaction | null>(null);
  const [account, setAccount] = useState<Map<number, string>>(new Map());
  const [category, setCategory] = useState<{ value: number; label: string }[][]>([[], []]);

  const fetchAccounts = async () => {
    const res = await getAccountPage({ current: 1, pageSize: 1000, name: '' });
    if (res.data?.content) {
      const accountMap = res.data.content.reduce((acc, account) => {
        acc.set(account.id, account.name || 'no label');
        return acc;
      }, new Map());
      setAccount(accountMap);
    }
  };

  const fetchCategoryData = async () => {
    const res = await getAllCategory();
    if (res.data) {
      setCategory(
        res.data.reduce((acc, categoryData) => {
          const newCategory = {
            value: categoryData.id || 0,
            label: categoryData.name || 'no name',
          };
          acc[categoryData.type || 0].push(newCategory);
          return acc;
        }, category),
      );
    }
  };

  const getData = async (
    params: API.getTransactionRangeParams,
  ): Promise<Partial<RequestData<API.Transaction>>> => {
    fetchAccounts();
    fetchCategoryData();
    const currentDate = dayjs().add(1, 'day');
    const firstDayOfMonth = dayjs().startOf('month');
    const currentDateISOString = currentDate.format('YYYY-MM-DDTHH:mm:ss');
    const firstDayOfMonthISOString = firstDayOfMonth.format('YYYY-MM-DDTHH:mm:ss');
    const msg = await getTransactionRange({
      current: 1,
      pageSize: 1000,
      start: params.start ?? firstDayOfMonthISOString,
      end: params.end ?? currentDateISOString,
    });
    const list = msg.data?.content || [];
    list.sort((a, b) => {
      return a.time && b.time ? b.time.localeCompare(a.time) : 0;
    });
    return {
      data: list,
      success: true,
      total: list.length,
    };
  };

  const columns: ProColumns<API.Transaction>[] = [
    {
      title: t('name'),
      dataIndex: 'category',
      render: (text, row) => {
        return (
          <>
            <span className="material-symbols-outlined">{row.category?.icon}</span>
            {row.category?.name}
          </>
        );
      },
      hideInSearch: true,
    },
    {
      title: t('description'),
      dataIndex: 'notes',
      hideInSearch: true,
    },
    {
      title: t('type'),
      dataIndex: 'type',
      render: (text, row) => (row.category?.type === 1 ? t('income') : t('expense')),
      hideInSearch: true,
    },
    {
      title: t('amount'),
      dataIndex: 'amount',
      hideInSearch: true,
    },
    {
      title: t('time'),
      dataIndex: 'time',
      render: (text, row) => formatDate(row.time as string),
      valueType: 'dateRange',
      search: {
        transform: (value) => ({
          start: dayjs(value[0]).startOf('day').format('YYYY-MM-DDTHH:mm:ss'),
          end: dayjs(value[1]).endOf('day').format('YYYY-MM-DDTHH:mm:ss'),
        }),
      },
      // fieldProps: {
      //   allowEmpty: [true, true],
      //   // ranges: datePickerRanges(),
      // },
    },
    {
      title: t('account'),
      dataIndex: 'account',
      render: (text, row) => account.get(row.account!),
      hideInSearch: true,
    },
    {
      title: t('operation'),
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <EditOutlined
          key="edit"
          onClick={() => {
            setInitialValues(record);
            setVisible(true);
          }}
        />,
        <a
          key="delete"
          onClick={async () => {
            if (record.id !== undefined) {
              await deleteTransaction({ id: record.id }).then(() => {
                action?.reload();
              });
            }
          }}
        >
          <DeleteOutlined />
        </a>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.Transaction, API.getTransactionRangeParams>
        actionRef={actionRef}
        headerTitle={t('transaction')}
        columns={columns}
        rowKey="id"
        pagination={{
          defaultPageSize: 10,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="add"
            onClick={() => {
              setInitialValues(null);
              setVisible(true);
            }}
          >
            <PlusOutlined /> {t('add')}
          </Button>,
        ]}
        request={(params) => getData(params)}
      />
      {visible && <ActionForm actionRef={actionRef} init={initialValues} category={category} />}
    </>
  );
};
