import { deleteBook, getBookList } from '@/services/wallet/book';
import { setDefaultBook } from '@/services/wallet/user';
import t from '@/utils/i18n';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-table';
import { useModel } from '@umijs/max';
import { Button, message } from 'antd';
import { useState } from 'react';
import ActionForm from './form';

export default () => {
  const { visible, setVisible } = useModel('modal');
  const { actionRef } = useModel('model');
  const [initialValues, setInitialValues] = useState<API.Book | null>(null);

  const columns: ProColumns<API.Book>[] = [
    {
      title: t('name'),
      dataIndex: 'name',
    },
    {
      title: t('description'),
      dataIndex: 'description',
      hideInSearch: true,
    },
    {
      title: t('balance'),
      dataIndex: 'balance',
      hideInSearch: true,
    },
    {
      title: t('income'),
      dataIndex: 'income',
      hideInSearch: true,
    },
    {
      title: t('expense'),
      dataIndex: 'expense',
      hideInSearch: true,
    },
    {
      title: t('Create Time'),
      dataIndex: 'createTime',
      render: (text) => (text as string)?.substring(0, 10),
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
              await deleteBook({ id: record.id }).then(() => {
                action?.reload();
              });
            }
          }}
        >
          <DeleteOutlined />
        </a>,
        <Button
          key="default"
          size="small"
          type="link"
          disabled={record.disabled}
          onClick={async () => {
            if (record.id !== undefined) {
              await setDefaultBook({ id: record.id }).then(() => {
                message.success('Set as Default');
              });
            }
          }}
        >
          {t('setDefaultBook')}
        </Button>,
      ],
    },
  ];

  return (
    <>
      <ProTable<API.Book>
        actionRef={actionRef}
        headerTitle={t('book')}
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
        request={async () => {
          const msg = await getBookList();
          return {
            data: msg?.data || [],
            success: true,
            total: msg?.data?.length || 0,
          };
        }}
      />
      {visible && <ActionForm actionRef={actionRef} init={initialValues} />}
    </>
  );
};
