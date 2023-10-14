import t from '@/utils/i18n';
export const requiredRule = () => [
  {
    required: true,
    message: t('rules.required'),
  },
];

export const amountRule = () => [
  {
    required: true,
    message: t('rules.required'),
  },
  {
    pattern: new RegExp('^-?\\d{0,15}(\\.\\d{0,2})?$'),
    message: t('rules.format.error'),
  },
];
