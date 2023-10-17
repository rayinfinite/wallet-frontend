import MyModalForm from '@/components/MyModalForm';
import { addBook, updateBook } from '@/services/wallet/book';
import { amountRule, requiredRule } from '@/utils/formInputRules';
import t from '@/utils/i18n';
import { ProFormText, ProFormTextArea } from '@ant-design/pro-components';

interface ActionFormProps {
  actionRef: React.RefObject<any>;
  init?: API.Book | null;
}

const ActionForm: React.FC<ActionFormProps> = ({ actionRef, init }) => {
  const onInit = () => {
    if (init) {
      return init;
    }
    const initialValues: API.AddBook = {
      name: 'new book',
      description: '',
      disabled: false,
      income: 0,
      expense: 0,
      balance: 0,
    };
    return initialValues;
  };

  const successHandler = () => {
    actionRef.current?.reload();
  };

  const requestHandler = async (values: API.AddBook) => {
    if (init) {
      await updateBook({ id: init.id || 0, addBook: values });
    } else {
      await addBook({ addBook: values });
    }
  };

  return (
    <>
      <MyModalForm
        title={init ? t('edit') + ' ' + init.name : t('add')}
        width={700}
        labelWidth={85}
        request={requestHandler}
        onSuccess={successHandler}
        onInit={onInit}
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
