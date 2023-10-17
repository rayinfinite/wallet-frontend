import { reportExpenseCategory, reportIncomeCategory } from '@/services/wallet/book';
import t from '@/utils/i18n';
import { Col, Row, Space } from 'antd';
import AssetBar from './AssetBar';
import BalanceSheet from './BalanceSheet';
import DonutCategory from './DonutCategory';
import styles from './index.less';

export default () => {
  return (
    <Space direction="vertical" size="small" style={{ width: '100%' }}>
      <AssetBar />
      <BalanceSheet />
      <Row gutter={12} className={styles['pie-row']}>
        <Col span={12}>
          <DonutCategory title={t('tab.expense.category')} request={reportExpenseCategory} />
        </Col>
        <Col span={12}>
          <DonutCategory title={t('tab.income.category')} request={reportIncomeCategory} />
        </Col>
      </Row>
    </Space>
  );
};
