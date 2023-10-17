import { deleteAccount, getAccountPage } from '@/services/wallet/account';
import t from '@/utils/i18n';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { type ProColumns } from '@ant-design/pro-components';
import { ProTable, type RequestData } from '@ant-design/pro-table';
import { FormattedMessage, useModel } from '@umijs/max';
import { Button } from 'antd';
import { useState } from 'react';
import ActionForm from './form';

const getData = async (
  params: API.getAccountPageParams,
): Promise<Partial<RequestData<API.Account>>> => {
  const msg = await getAccountPage(params);

  return {
    data: msg?.data?.content || [],
    success: true,
    total: msg?.data?.size || 0,
  };
};

export default () => {
  const { actionRef } = useModel('model');
  const { visible, setVisible } = useModel('modal');
  const [initialValues, setInitialValues] = useState<API.Book | null>(null);

  const columns: ProColumns<API.Account>[] = [
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
              await deleteAccount({ id: record.id }).then(() => {
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
      <ProTable<API.Account, API.getAccountPageParams>
        actionRef={actionRef}
        headerTitle={t('account')}
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
            <PlusOutlined /> <FormattedMessage id="add" defaultMessage="New" />
          </Button>,
        ]}
        request={getData}
      />
      {visible && <ActionForm actionRef={actionRef} init={initialValues} />}
    </>
  );
};
