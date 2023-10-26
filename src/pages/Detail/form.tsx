import MyModalForm from '@/components/MyModalForm';
import { getAccountPage } from '@/services/wallet/account';
import { addTransaction, updateTransaction } from '@/services/wallet/transaction';
import t from '@/utils/i18n';
import {
  ProForm,
  ProFormDateTimePicker,
  ProFormDigit,
  ProFormSegmented,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { useState } from 'react';

interface ActionFormProps {
  actionRef: React.RefObject<any>;
  init?: (API.Transaction & API.AddTransaction) | API.Transaction | null;
  category: { value: number; label: string }[][];
}

const dayjs = require('dayjs');

const ActionForm: React.FC<ActionFormProps> = ({ actionRef, init, category }) => {
  const [account, setAccount] = useState<{ value: number; label: string }[]>([]);

  const onInit = () => {
    const fetchAccounts = async () => {
      const res = await getAccountPage({ current: 1, pageSize: 1000, name: '' });
      if (res.data?.content) {
        setAccount(
          res.data.content.map((account) => ({
            value: account.id || 0,
            label: account.name || 'no name',
          })),
        );
      }
    };
    fetchAccounts();
    if (init) {
      const initialValues = init as API.Transaction & API.AddTransaction;
      initialValues.categoryId = init.category?.id || 0;
      initialValues.accountId = init.account;
      initialValues.type = init.category?.type?.toString() || '0';
      return initialValues;
    }
    const initialValues: API.AddTransaction = {
      amount: 0,
      time: dayjs().format('YYYY-MM-DDTHH:mm:ss'),
      notes: '',
      accountId: 1,
      categoryId: 9,
      type: '0',
    };
    return initialValues;
  };

  const successHandler = () => {
    actionRef.current?.reload();
  };

  const requestHandler = async (values: API.AddTransaction) => {
    if (init) {
      await updateTransaction({ id: init.id || 0, addTransaction: values });
    } else {
      await addTransaction({ addTransaction: values });
    }
  };

  return (
    <>
      <MyModalForm
        title={init ? t('edit') + ' ' + init.category?.name : t('add')}
        width={700}
        labelWidth={85}
        request={(values: Record<string, any>) => requestHandler(values as API.AddTransaction)}
        onSuccess={successHandler}
        onInit={onInit}
      >
        <ProFormSelect width="xs" options={account} name="accountId" label="所属账号" />
        <ProFormDateTimePicker
          name="time"
          label={t('time')}
          fieldProps={{
            format: (value) => value.format('YYYY-MM-DD'),
          }}
        />
        <ProFormDigit
          name="amount"
          label={t('amount')}
          min={-1000000000000000000}
          max={1000000000000000000}
          fieldProps={{ precision: 3 }}
        />
        <ProFormTextArea name="notes" label={t('label.description')} />
        <ProFormSegmented name="type" label="交易类别" valueEnum={{ 0: '支出', 1: '收入' }} />
        <ProForm.Item noStyle shouldUpdate>
          {(form) => {
            const data = category[form.getFieldValue('type')];
            return <ProFormSelect options={data} name="categoryId" label="所属种类" />;
          }}
        </ProForm.Item>
      </MyModalForm>
    </>
  );
};

export default ActionForm;
