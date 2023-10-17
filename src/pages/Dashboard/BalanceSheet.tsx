import CardPie from '@/components/CardPie';
import { reportBalance as balance } from '@/services/wallet/book';
import t from '@/utils/i18n';
import { useRequest } from '@umijs/max';
import { Col, Row } from 'antd';
import styles from './index.less';

export default () => {
  const { data = [[], []], loading } = useRequest(balance);

  return (
    <Row gutter={12} className={styles['pie-row']}>
      <Col span={12}>
        <CardPie title={t('asset.category')} data={data[0]} loading={loading} />
      </Col>
      <Col span={12}>
        <CardPie title={t('debt.category')} data={data[1]} loading={loading} />
      </Col>
    </Row>
  );
};
