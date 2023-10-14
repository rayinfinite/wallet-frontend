import { ActionType } from '@ant-design/pro-table';
import { useRef } from 'react';

export default () => {
  const actionRef = useRef<ActionType>();

  return {
    actionRef,
  };
};
