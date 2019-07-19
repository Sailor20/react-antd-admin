import React from 'react';
import PropTypes from 'prop-types';
import {
  Form, Input, Radio, Modal, Select,
} from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

const modal = ({
  item = {
    method: 'get',
    role: 1,
  },
  thrifts = [],
  onOk,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
    getFieldValue,
    setFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      };
      onOk(data);
    });
  };

  const handleChange = (key) => {
    const value = getFieldValue(key);
    if (key === 'path' && value) {
      const fields = {
        path: value.replace('/t/', '/'),
      };
      setFieldsValue(fields);
    }
  };

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  };

  const methodSelect = [
    {
      title: 'GET',
      value: 'get',
    },
    {
      title: 'POST',
      value: 'post',
    },
    {
      title: 'PUT',
      value: 'put',
    },
    {
      title: 'PATCH',
      value: 'patch',
    },
    {
      title: 'DELETE',
      value: 'delete',
    },
  ];

  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="接口路径" hasFeedback {...formItemLayout}>
          {getFieldDecorator('path', {
            initialValue: item.path,
            rules: [
              {
                required: true,
                message: '请求路径不能为空',
              },
              {
                pattern: /^(\/[a-zA-Z-_]+)+$/,
                message: '请求路径不正确',
              },
            ],
          })(<Input onKeyUp={handleChange.bind(this, 'path')} />)}
        </FormItem>
        <FormItem label="请求方式" hasFeedback {...formItemLayout}>
          {getFieldDecorator('method', {
            initialValue: item.method,
            rules: [
              {
                required: true,
                message: '请求方式不能为空',
              },
            ],
          })(
            <Select style={{ width: '100%' }} size="large">
              {methodSelect.map(s => <Select.Option key={s.value}>{s.title}</Select.Option>)}
            </Select>,
          )}
        </FormItem>
        <FormItem label="是否登录" hasFeedback {...formItemLayout}>
          {getFieldDecorator('role', {
            initialValue: item.role,
            rules: [
              {
                required: true,
                message: '请选择登录选项',
              },
            ],
          })(
            <Radio.Group>
              <Radio value={1}>是</Radio>
              <Radio value={0}>否</Radio>
            </Radio.Group>,
          )}
        </FormItem>
        <FormItem label="thrift名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('thriftName', {
            initialValue: item.thriftName,
            rules: [
              {
                required: true,
                message: 'thrift名称不能为空',
              },
            ],
          })(
            <Select style={{ width: '100%' }} size="large" placeholder="请选择thrift名称">
              {thrifts.map(s => <Select.Option key={s.thriftName}>{s.thriftName}</Select.Option>)}
            </Select>,
          )}
        </FormItem>
        <FormItem label="thrift服务名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('serviceName', {
            initialValue: item.serviceName,
            rules: [
              {
                required: true,
                message: 'thrift服务名称不能为空',
              },
              {
                pattern: /^([a-zA-Z-_]+\.)*[a-zA-Z-_]+$/,
                message: 'thrift服务名称不正确',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="thrift方法名称" hasFeedback {...formItemLayout}>
          {getFieldDecorator('actionName', {
            initialValue: item.actionName,
            rules: [
              {
                required: true,
                message: 'thrift方法名称不能为空',
              },
              {
                pattern: /^[a-zA-Z-_]+$/,
                message: 'thrift方法名称不正确',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="接口文档地址" hasFeedback {...formItemLayout}>
          {getFieldDecorator('docUrl', {
            initialValue: item.docUrl || '',
            rules: [
              {
                required: true,
                message: '接口文档地址不能为空',
              },
              {
                pattern: /^http:\/\/.*$/,
                message: '接口文档地址不正确',
              },
            ],
          })(<Input.TextArea />)}
        </FormItem>
      </Form>
    </Modal>
  );
};

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
};

export default Form.create()(modal);
