import { deleteAccount, getAccountPage } from '@/services/wallet/Account';
import t from '@/utils/i18n';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { type ProColumns } from '@ant-design/pro-components';
import { ProTable, type RequestData } from '@ant-design/pro-table';
import { FormattedMessage, useModel } from '@umijs/max';
import { Button } from 'antd';
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
  const { actionRef } = useModel('Account.model');

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
      hideInSearch: true,
    },
    {
      title: t('operation'),
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <ActionForm trigger={<EditOutlined />} actionRef={actionRef} key="edit" init={record} />,
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

        // <TableDropdown
        //   key="actionGroup"
        //   onSelect={() => action?.reload()}
        //   menus={[
        //     { key: 'copy', name: '复制' },
        //     { key: 'delete', name: '删除' },
        //   ]}
        // />,
      ],
    },
  ];

  return (
    <ProTable<API.Account, API.getAccountPageParams>
      actionRef={actionRef}
      headerTitle={t('account')}
      columns={columns}
      rowKey="id"
      pagination={{
        defaultPageSize: 10,
      }}
      toolBarRender={() => [
        <ActionForm
          trigger={
            <Button type="primary">
              <PlusOutlined /> <FormattedMessage id="add" defaultMessage="New" />
            </Button>
          }
          actionRef={actionRef}
          key="add"
        />,
      ]}
      request={getData}
    />
  );
};
