import { ModalForm } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { FormInstance } from 'antd/lib';
import { useRef } from 'react';

type MyModalFormProps = React.PropsWithChildren<{
  title: string;
  width?: number;
  labelWidth?: number;
  request: (values: Record<string, any>) => Promise<void>;
  params?: Record<string, any>;
  onSuccess?: () => void;
  autoFocusFirstInput?: boolean;
  isKeyPressSubmit?: boolean;
  parentFormRef?: React.RefObject<any>;
  onInit: () => Record<string, any>;
}>;

/**不使用trigger的原因是如果使用trigger，产生的每一个modal是不一样的 */
export default function MyModalForm(props: MyModalFormProps) {
  const { visible, setVisible } = useModel('modal');

  let formRef = useRef<FormInstance>();
  const {
    title,
    width = 600,
    labelWidth,
    request,
    params,
    onSuccess,
    autoFocusFirstInput = false,
    isKeyPressSubmit = true,
    parentFormRef,
    onInit,
  } = props;

  if (parentFormRef) formRef = parentFormRef;

  const finishHandler = async (values: Record<string, any>) => {
    await request({ ...values, ...params });
    formRef.current?.resetFields();
    if (onSuccess) onSuccess();
    return true;
  };

  const onOpenChange = async (open: boolean) => {
    setVisible(open);
    const a = await onInit();
    console.log('a', a);
    formRef.current?.setFieldsValue({ ...(a || {}) });
  };

  return (
    <ModalForm
      width={width}
      layout="horizontal"
      grid={true}
      labelCol={{ style: { width: 'auto', minWidth: labelWidth } }}
      title={title}
      formRef={formRef}
      open={visible}
      onOpenChange={onOpenChange}
      onFinish={finishHandler}
      dateFormatter={(value) => value.valueOf()}
      modalProps={{ destroyOnClose: false, maskClosable: false }}
      autoFocusFirstInput={autoFocusFirstInput}
      isKeyPressSubmit={isKeyPressSubmit}
      // submitter={{
      //   render: (props, defaultDoms) => {
      //     return [
      //       ...defaultDoms,
      //       <Button onClick={() => { props.reset() }}>{t('reset')}</Button>,
      //     ];
      //   },
      // }}
    >
      {props.children}
    </ModalForm>
  );
}
