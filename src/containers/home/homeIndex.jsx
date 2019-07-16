import React, { Component } from 'react';

import './style/home.less';

import { Row, Col, Card, Steps, Button } from 'antd';

const Step = Steps.Step;


/* 以类的方式创建一个组件 */
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const steps = [{
      title: '新增thrift服务信息',
      content: `<p>1、进入页面<a href="/home/thrifts" target="_blank">thrift管理->服务管理</a>，新增的thrift服务，如：user</p>`,
    }, {
      title: '上传thrift文件',
      content: `<p>1、进入页面<a href="/home/thrifts/files" target="_blank">thrift管理->文件管理</a>上传相关的thrift文件</p>
      <p>2、重启服务</p>`,
    }, {
      title: '新增接口',
      content: `<p>1、进入页面<a href="/home/apis" target="_blank">接口管理->接口列表</a>新增相关接口</p>
      <p>2、使用postman等检查接口是否正常访问</p>
      <p>3、完善接口文档</p>`,
    }];
    const { current } = this.state;
    return (
      <div className="home-container">
        <Row>
          <Col span={24}>
            <Card title="项目前言" bordered={false}>
              <p>本工程主要基于react + redux + saga  + less + ES6/7 + webpack + axios + react-router +
                antd实现的SPA后台管理系统模板。</p>
              <p>目前项目尚未开发完全，敬请谅解。</p>
              <p>项目持续迭代中......。</p>
            </Card>
            <Card title="操作步骤" className="mg-top20">
              <Steps current={current}>
                {steps.map(item => <Step key={item.title} title={item.title}/>)}
              </Steps>
              <div className="steps-content"
                   dangerouslySetInnerHTML={{ __html: steps[this.state.current].content }}></div>
              <div className="steps-action">
                {
                  this.state.current < steps.length - 1
                  &&
                  <Button type="primary" onClick={() => this.next()}>下一步</Button>
                }
                {
                  this.state.current > 0
                  &&
                  <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                    上一步
                  </Button>
                }
              </div>
            </Card>
            <Card title="后续" className="mg-top20">
              <p>希望大家提供宝贵的意见，谢谢。</p>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Main;
