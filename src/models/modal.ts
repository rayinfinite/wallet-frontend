import { useCallback, useState } from 'react';

export default () => {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(null);
  const [currentRow, setCurrentRow] = useState();
  const [action, setAction] = useState(1); //1是add，2是update

  const hide = useCallback(() => {
    setVisible(false);
    setContent(null);
  }, []);

  const show = useCallback((newContent: any, action?: number, currentRow?: any) => {
    setVisible(true);
    setContent(newContent);
    setAction(action ? action : 1);
    setCurrentRow(currentRow);
  }, []);

  return { visible, setVisible, content, action, currentRow, show, hide };
};
