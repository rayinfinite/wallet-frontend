import CardPie from '@/components/CardPie';
import t from '@/utils/i18n';
import { useRequest } from '@umijs/max';
import { DatePicker, Radio, RadioChangeEvent, Space } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { FC, useEffect, useState } from 'react';

export function radioValueToTimeRange(value: number) {
  switch (value) {
    case 1:
      return [dayjs().startOf('day'), dayjs().endOf('day')];
    case 2:
      return [dayjs().startOf('week'), dayjs().endOf('week')];
    case 3:
      return [dayjs().startOf('month'), dayjs().endOf('month')];
    case 4:
      return [dayjs().startOf('year'), dayjs().endOf('year')];
    case 5:
      return [
        dayjs().subtract(1, 'years').startOf('year'),
        dayjs().subtract(1, 'years').endOf('year'),
      ];
    case 6:
      return [dayjs().subtract(7, 'days'), dayjs()];
    case 7:
      return [dayjs().subtract(30, 'days'), dayjs()];
    case 8:
      return [dayjs().subtract(1, 'years'), dayjs()];
  }
}

interface CardExtraProps {
  value: number;
  onChange: (value: number) => void;
}

const CardExtra: React.FC<CardExtraProps> = ({ value, onChange }) => {
  const [rangePickerValue, setRangePickerValue] = useState<Dayjs[] | undefined>([]);

  useEffect(() => {
    setRangePickerValue(radioValueToTimeRange(value));
  }, [value]);

  function radioChangeHandler(e: RadioChangeEvent) {
    onChange(e.target.value);
  }

  return (
    <Space>
      <Radio.Group value={value} onChange={radioChangeHandler}>
        <Radio.Button value={7}>{t('in.30.days')}</Radio.Button>
        <Radio.Button value={8}>{t('in.1.year')}</Radio.Button>
        <Radio.Button value={3}>{t('this.month')}</Radio.Button>
        <Radio.Button value={4}>{t('this.year')}</Radio.Button>
        <Radio.Button value={5}>{t('last.year')}</Radio.Button>
      </Radio.Group>
      <DatePicker.RangePicker
        disabled={true}
        allowClear={false}
        value={rangePickerValue ? [rangePickerValue[0], rangePickerValue[1]] : undefined}
        showTime={false}
        format="YYYY-MM-DD"
      />
    </Space>
  );
};

type DonutCategoryProps = {
  request: () => Promise<API.BaseResponseListChartVO>;
  title: string;
};

const DonutCategory: FC<DonutCategoryProps> = ({ request, title }) => {
  // const { initialState } = useModel('@@initialState');

  const [timeRange, setTimeRange] = useState(7);
  function timeRangeChangeHandler(value: number) {
    setTimeRange(value);
  }

  const { data = [], loading } = useRequest(request);

  // useEffect(() => {
  //   if (initialState.currentBook?.id) {
  //     const rangeValues = radioValueToTimeRange(timeRange);
  //     run({
  //       bookId: initialState.currentBook.id,
  //       minTime: rangeValues[0].valueOf(),
  //       maxTime: rangeValues[1].valueOf(),
  //     });
  //   }
  // }, [timeRange, initialState.currentBook?.id]);

  return (
    <CardPie
      title={title}
      data={data}
      loading={loading}
      extra={<CardExtra value={timeRange} onChange={timeRangeChangeHandler} />}
    />
  );
};

export default DonutCategory;
