import MyModalForm from '@/components/MyModalForm';
import { addAccount, updateAccount } from '@/services/wallet/Account';
import { amountRule, requiredRule } from '@/utils/formInputRules';
import t from '@/utils/i18n';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useEffect, useState } from 'react';

interface ActionFormProps {
  trigger: React.ReactElement;
  actionRef: React.RefObject<any>;
  init?: Record<string, any>;
}

const ActionForm: React.FC<ActionFormProps> = ({ trigger, actionRef, init }) => {
  const [initialValues, setInitialValues] = useState({});

  useEffect(() => {
    if (init) {
      setInitialValues(init);
    } else {
      const initialValues: API.AddAccount = {
        name: 'new account',
        description: '',
        deleted: false,
        disabled: false,
        income: 0,
        expense: 0,
        balance: 0,
      };
      setInitialValues(initialValues);
    }
  }, [init]);

  const successHandler = () => {
    actionRef.current?.reload();
  };

  const requestHandler = async (values: API.AddAccount) => {
    if (init) {
      await updateAccount({ id: init.id }, values);
    } else {
      await addAccount(values);
    }
  };

  return (
    <>
      <MyModalForm
        title={init ? t('edit') + ' ' + init.name : t('add')}
        trigger={trigger}
        width={700}
        labelWidth={85}
        request={requestHandler}
        onSuccess={successHandler}
        initialValues={initialValues}
      >
        <ProFormText name="name" label={t('name')} rules={requiredRule()} />
        <ProFormTextArea name="description" label={t('label.description')} />
        <ProFormText
          name="balance"
          label={t('balance')}
          rules={amountRule()}
          placeholder={t('rules.can.negative')}
        />
        <ProFormText
          name="income"
          label={t('income')}
          rules={amountRule()}
          placeholder={t('rules.can.negative')}
        />
        <ProFormText
          name="expense"
          label={t('expense')}
          rules={amountRule()}
          placeholder={t('rules.can.negative')}
        />
      </MyModalForm>
    </>
  );
};

export default ActionForm;
