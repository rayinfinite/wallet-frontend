import { ModalForm } from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';

type MyModalFormProps = React.PropsWithChildren<{
  title: string;
  trigger: JSX.Element;
  width?: number;
  labelWidth?: number;
  initialValues?: Record<string, any>;
  request: (values: Record<string, any>) => Promise<void>;
  params?: Record<string, any>;
  onSuccess?: () => void;
  autoFocusFirstInput?: boolean;
  isKeyPressSubmit?: boolean;
  parentFormRef?: React.RefObject<any>;
}>;

export default function MyModalForm(props: MyModalFormProps) {
  let formRef = useRef();
  const {
    title,
    trigger,
    width = 600,
    labelWidth,
    initialValues = {},
    request,
    params,
    onSuccess,
    autoFocusFirstInput = false,
    isKeyPressSubmit = true,
    parentFormRef,
  } = props;

  if (parentFormRef) formRef = parentFormRef;

  const finishHandler = async (values: Record<string, any>) => {
    await request({ ...values, ...params });
    formRef.current?.resetFields();
    if (onSuccess) onSuccess();
    return true;
  };

  // const [ visible, setVisible ] = useModel('modal');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 加visible是为了每次打开都执行一次，清空前面的输入
    if (visible && initialValues && Object.keys(initialValues).length > 0) {
      // 把之前的输入清空，因为有些输入项没有被initialValues包含。
      formRef.current?.resetFields();
      formRef.current?.setFieldsValue({ ...initialValues });
    }
  }, [initialValues, visible]);

  return (
    <ModalForm
      width={width}
      layout="horizontal"
      grid={true}
      labelCol={{ style: { width: 'auto', minWidth: labelWidth } }}
      title={title}
      trigger={trigger}
      formRef={formRef}
      open={visible}
      onOpenChange={setVisible}
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
