import { Footer } from '@/components';
import { CurrentUser, login, register } from '@/services/wallet/login';
import {
  AlipayCircleOutlined,
  LockOutlined,
  MailOutlined,
  MobileOutlined,
  TaobaoCircleOutlined,
  UserOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, ProFormCheckbox, ProFormText } from '@ant-design/pro-components';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage, Helmet, SelectLang, history, useIntl, useModel } from '@umijs/max';
import { Alert, Tabs, message } from 'antd';
import React, { useState } from 'react';
import Settings from '../../../config/defaultSettings';

const ActionIcons = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      marginLeft: '8px',
      color: 'rgba(0, 0, 0, 0.2)',
      fontSize: '24px',
      verticalAlign: 'middle',
      cursor: 'pointer',
      transition: 'color 0.3s',
      '&:hover': {
        color: token.colorPrimaryActive,
      },
    };
  });

  return (
    <>
      <AlipayCircleOutlined key="AlipayCircleOutlined" className={langClassName} />
      <TaobaoCircleOutlined key="TaobaoCircleOutlined" className={langClassName} />
      <WeiboCircleOutlined key="WeiboCircleOutlined" className={langClassName} />
    </>
  );
};

const Lang = () => {
  const langClassName = useEmotionCss(({ token }) => {
    return {
      width: 42,
      height: 42,
      lineHeight: '42px',
      position: 'fixed',
      right: 16,
      borderRadius: token.borderRadius,
      ':hover': {
        backgroundColor: token.colorBgTextHover,
      },
    };
  });

  return (
    <div className={langClassName} data-lang>
      {SelectLang && <SelectLang />}
    </div>
  );
};

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};

const Login: React.FC = () => {
  // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('login');
  const [hasError, setHasError] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const { setInitialState } = useModel('@@initialState');

  const containerClassName = useEmotionCss(() => {
    return {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'auto',
      backgroundImage:
        "url('https://mdn.alipayobjects.com/yuyan_qk0oxh/afts/img/V-_oS6r-i7wAAAAAAAAAAAAAFl94AQBr')",
      backgroundSize: '100% 100%',
    };
  });

  const intl = useIntl();

  const handleAuthentication = async (values: API.Login | API.AddUser) => {
    const auth = type === 'login';
    try {
      const token = await (auth ? login({ ...values }) : register({ ...values }));
      if (token.code !== 0) throw new Error(token.message);
      const msg = await CurrentUser();
      if (msg.code !== 0) throw new Error(msg.message);
      console.log(token.data);
      const successMessage = intl.formatMessage({
        id: auth ? 'pages.login.success' : 'pages.login.register.success',
      });
      setInitialState((s) => ({
        ...s,
        currentUser: msg.data,
        token: token.data,
      }));
      messageApi.open({ type: 'success', content: successMessage });
      localStorage.setItem('user', JSON.stringify(msg.data));
      localStorage.setItem('token', token.data || '');
      const urlParams = new URL(window.location.href).searchParams;
      //等待，避免setInitialState没有执行完毕
      setTimeout(() => {
        history.push(urlParams.get('redirect') || '/');
      }, 300);
    } catch (error) {
      const failureMessage = intl.formatMessage({
        id: auth ? 'pages.login.failure' : 'pages.login.register.failure',
      });
      console.log(error);
      messageApi.open({ type: 'error', content: failureMessage });
      setHasError(true);
    }
  };

  return (
    <div className={containerClassName}>
      <Helmet>
        <title>
          {intl.formatMessage({ id: 'menu.login', defaultMessage: '登录页' })}- {Settings.title}
        </title>
      </Helmet>
      <Lang />
      {contextHolder}
      <div style={{ flex: '1', padding: '32px 0' }}>
        <LoginForm
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
          }}
          logo={<img alt="logo" src="/logo.svg" />}
          title="Ant Design"
          subTitle={intl.formatMessage({ id: 'pages.layouts.userLayout.title' })}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            <FormattedMessage
              key="loginWith"
              id="pages.login.loginWith"
              defaultMessage="其他登录方式"
            />,
            <ActionIcons key="icons" />,
          ]}
          onFinish={async (values) => {
            await handleAuthentication(values as API.Login | API.AddUser);
          }}
          submitter={{
            // 配置按钮文本
            searchConfig: {
              submitText: type === 'login' ? '登录' : '注册',
            },
          }}
        >
          <Tabs
            activeKey={type}
            onChange={(activeKey) => {
              setType(activeKey);
              setHasError(false);
            }}
            centered
            items={[
              {
                key: 'login',
                label: intl.formatMessage({
                  id: 'pages.login.login.tab',
                }),
              },
              {
                key: 'register',
                label: intl.formatMessage({
                  id: 'pages.login.register.tab',
                }),
              },
            ]}
          />

          {hasError === true && type === 'login' && (
            <LoginMessage
              content={intl.formatMessage({
                id: 'pages.login.accountLogin.errorMessage',
                defaultMessage: '账户或密码错误(admin/ant.design)',
              })}
            />
          )}
          {type === 'login' && (
            <>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          )}

          {hasError === true && type === 'register' && <LoginMessage content="注册失败" />}
          {type === 'register' && (
            <>
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                name="username"
                placeholder={intl.formatMessage({
                  id: 'pages.login.register.username.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.register.username.required" />,
                  },
                  {
                    pattern: /^[a-zA-Z0-9]{3,16}$/,
                    message: <FormattedMessage id="pages.login.register.username.invalid" />,
                  },
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                name="password"
                placeholder={intl.formatMessage({
                  id: 'pages.login.register.password.placeholder',
                })}
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.login.register.password.required" />,
                  },
                  {
                    pattern: /^.{6,}$/,
                    message: <FormattedMessage id="pages.login.register.password.invalid" />,
                  },
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MobileOutlined />,
                }}
                name="telephone"
                placeholder={intl.formatMessage({
                  id: 'pages.login.phoneNumber.placeholder',
                  defaultMessage: '电话号码',
                })}
                rules={[
                  {
                    pattern: /^\d{8,}$/,
                    message: <FormattedMessage id="pages.login.phoneNumber.invalid" />,
                  },
                ]}
              />
              <ProFormText
                fieldProps={{
                  size: 'large',
                  prefix: <MailOutlined />,
                }}
                name="email"
                placeholder={intl.formatMessage({
                  id: 'pages.login.register.email.placeholder',
                })}
                rules={[
                  {
                    pattern: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                    message: <FormattedMessage id="pages.login.register.email.invalid" />,
                  },
                ]}
              />
            </>
          )}
          <div style={{ marginBottom: 24 }}>
            <ProFormCheckbox noStyle name="autoLogin">
              <FormattedMessage id="pages.login.rememberMe" defaultMessage="自动登录" />
            </ProFormCheckbox>
          </div>
        </LoginForm>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
