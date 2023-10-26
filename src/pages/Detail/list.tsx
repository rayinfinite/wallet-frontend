import '@/material.css';
import { getAllAccount } from '@/services/wallet/account';
import { getAllCategory } from '@/services/wallet/category';
import { getTransactionRange } from '@/services/wallet/transaction';
import t from '@/utils/i18n';
import { PlusOutlined } from '@ant-design/icons';
import { ActionType, ProForm, QueryFilter } from '@ant-design/pro-components';
import { useModel } from '@umijs/max';
import { Button, Card, DatePicker, Flex, Grid, List, Select } from 'antd';
import Meta from 'antd/es/card/Meta';
import { Dayjs } from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import ActionForm from './form';

const dayjs = require('dayjs');

function formatDate(inputString: string | undefined) {
  const date = dayjs(inputString);
  if (!date.isValid()) {
    return 'Invalid Date'; // 处理无效日期输入
  }
  return date.format('MM-DD HH:mm');
}

const { useBreakpoint } = Grid;

export default () => {
  const [accountMap, setAccountMap] = useState(new Map());
  const { visible, setVisible } = useModel('modal');
  const [initialValues, setInitialValues] = useState<API.Transaction | null>(null);
  const [dataSource, setDataSource] = useState<API.Transaction[]>();
  const [filtedDataSource, setFiltedDataSource] = useState<API.Transaction[]>();
  const [filter, setFilter] = useState<string>('all');
  const actionRef = useRef<ActionType>();
  const [columnCount, setColumnCount] = useState(2);
  const [category, setCategory] = useState<{ value: number; label: string }[][]>([[], []]);
  const screens = useBreakpoint();

  const fetchAccounts = async () => {
    const res = await getAllAccount();
    if (res.data) {
      const accountArray = res.data.map((account) => ({
        value: account.id || 0,
        label: account.name || 'no name',
      }));
      const accountMap = accountArray.reduce((map, account) => {
        map.set(account.value, account);
        return map;
      }, new Map());
      setAccountMap(accountMap);
    }
  };
  const fetchCategoryData = async () => {
    const res = await getAllCategory();
    if (res.data) {
      setCategory(
        res.data.reduce((acc, categoryData) => {
          const newCategory = {
            value: categoryData.id || 0,
            label: categoryData.name || 'no name',
          };
          acc[categoryData.type || 0].push(newCategory);
          return acc;
        }, category),
      );
    }
  };
  const getData = async (date: Dayjs | null = null): Promise<API.Transaction[]> => {
    const format = 'YYYY-MM-DDTHH:mm:ss';
    const day = date ? dayjs(date) : dayjs();
    const end = day.endOf('month').format(format);
    const start = day.startOf('month').format(format);
    console.log(start, end);
    const msg = await getTransactionRange({
      current: 1,
      pageSize: 1000,
      start: start,
      end: end,
    });
    const list = msg.data?.content || [];
    list.sort((a, b) => {
      return a.time && b.time ? b.time.localeCompare(a.time) : 0;
    });
    setDataSource(list);
    setFiltedDataSource(list);
    setFilter('all');
    return list;
  };

  const changeFilter = (value: string) => {
    setFilter(value);
    if (value === 'all') {
      setFiltedDataSource(dataSource);
    } else {
      const list = dataSource?.filter((item) => {
        if (item.category?.type === 1 && value === 'expense') {
          return true;
        }
        if (item.category?.type === 0 && value === 'income') {
          return true;
        }
        return false;
      });
      setFiltedDataSource(list);
    }
  };

  useEffect(() => {
    const screenSizes = [
      { size: 'xxl', count: 5 },
      { size: 'xl', count: 4 },
      { size: 'lg', count: 3 },
      { size: 'md', count: 3 },
      { size: 'sm', count: 2 },
      { size: 'xs', count: 1 },
    ];

    for (let i = 0; i < screenSizes.length; i++) {
      const { size, count } = screenSizes[i];
      if (screens[size as keyof typeof screens]) {
        setColumnCount(count);
        break; // Exit the loop once the first matching size is found.
      }
    }
  }, [screens]);

  useEffect(() => {
    fetchAccounts();
    fetchCategoryData();
    getData();
  }, []);

  const onClick = (item: API.Transaction) => {
    setInitialValues(item);
    setVisible(true);
  };

  const Search = () => {
    return (
      <QueryFilter submitter={false}>
        <ProForm.Group title={t('date') + ': '}>
          <DatePicker defaultValue={dayjs()} onChange={getData} picker="month" />
        </ProForm.Group>
        <ProForm.Group title={t('type') + ': '}>
          <Select
            value={filter}
            style={{ width: 120 }}
            onChange={changeFilter}
            options={[
              { value: 'all', label: t('all') },
              { value: 'income', label: t('income') },
              { value: 'expense', label: t('expense') },
            ]}
          />
        </ProForm.Group>
        <Button
          type="primary"
          key="add"
          onClick={() => {
            setInitialValues(null);
            setVisible(true);
          }}
        >
          <PlusOutlined /> {t('add')}
        </Button>
      </QueryFilter>
    );
  };

  return (
    <>
      <List<API.Transaction>
        rowKey="id"
        grid={{ gutter: 16, column: columnCount }}
        dataSource={filtedDataSource}
        header={Search()}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <Card hoverable onClick={() => onClick(item)}>
              <Meta
                title={
                  <div style={{ color: item.category?.type === 1 ? 'red' : 'blue' }}>
                    {item.category?.name}
                  </div>
                }
                description={item.notes}
                avatar={<span className="material-symbols-outlined">{item.category?.icon}</span>}
              />
              <div style={{ margin: '16px 0' }}></div> {/* 添加间距 */}
              <Flex justify="space-between" align="center">
                <p>{t('time') + ' ' + formatDate(item.time)} </p>
                <p style={{ textAlign: 'right' }}>{t('amount') + ' ' + item.amount}</p>
              </Flex>
              <p>{t('account') + ' ' + accountMap.get(item.account)?.label}</p>
            </Card>
          </List.Item>
        )}
      ></List>
      {visible && <ActionForm actionRef={actionRef} init={initialValues} category={category} />}
    </>
  );
};
