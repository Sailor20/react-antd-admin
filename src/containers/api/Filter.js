import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { FilterItem } from '../../components/base'
import { Form, Button, Row, Col, DatePicker, Input, Select } from 'antd'

const Search = Input.Search
const { RangePicker } = DatePicker

const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}

class Filter extends React.Component {
  constructor (props) {
    super(props)
  }

  componentWillReceiveProps (nextProps) {
    // 为了重置表单，未找到更好的方案
    if (Object.keys(this.props.filter).length && !Object.keys(nextProps.filter).length) {
      this.handleReset()
    }
  }

  handleFields = (fields) => {
    const { createTime } = fields
    if (createTime.length) {
      fields.startTime = createTime[0].format('YYYY-MM-DD 00:00:00')
      fields.endTime = createTime[1].format('YYYY-MM-DD 23:59:59')
    }
    delete fields.createTime
    return fields
  }

  handleSubmit = () => {
    let fields = this.props.form.getFieldsValue()
    fields = this.handleFields(fields)
    this.props.onFilterChange(fields)
  }

  handleReset = (fresh) => {
    const fields = this.props.form.getFieldsValue()
    for (let item in fields) {
      if ({}.hasOwnProperty.call(fields, item)) {
        if (fields[item] instanceof Array) {
          fields[item] = []
        } else {
          fields[item] = undefined
        }
      }
    }
    this.props.form.setFieldsValue(fields)
    if (fresh) this.handleSubmit()
  }

  handleChange = (key, values) => {
    let fields = this.props.form.getFieldsValue()
    fields[key] = values
    fields = this.handleFields(fields)
    this.props.onFilterChange(fields)
  }

  render () {
    const { status, startTime, endTime } = this.props.filter
    const { getFieldDecorator } = this.props.form
    let initialCreateTime = []
    if (startTime) {
      initialCreateTime[0] = moment(startTime)
    }
    if (endTime) {
      initialCreateTime[1] = moment(endTime)
    }
    const statusSelect = [
      {
        title: '启用',
        value: 1,
      },
      {
        title: '禁用',
        value: -1,
      },
    ]
    return (
      <Row gutter={24}>
        <Col {...ColProps} xl={{ span: 4 }} md={{ span: 8 }}>
          {getFieldDecorator('keyword', { initialValue: this.props.filter.keyword })(
            <Search placeholder="接口路径/方法名/服务名" size="large" onSearch={this.handleSubmit}/>,
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 2 }} md={{ span: 4 }}>
          {getFieldDecorator('status', { initialValue: status })(
            <Select style={{ width: '100%' }}
                    placeholder="状态"
                    size='large' allowClear onChange={this.handleChange.bind(this, 'status')}>
              {statusSelect.map(s => <Select.Option key={s.value}>{s.title}</Select.Option>)}
            </Select>,
          )}
        </Col>
        <Col {...ColProps} xl={{ span: 8 }} md={{ span: 12 }} sm={{ span: 12 }}>
          <FilterItem label="创建时间">
            {getFieldDecorator('createTime', { initialValue: initialCreateTime })(
              <RangePicker style={{ width: '100%' }} size="large"
                           onChange={this.handleChange.bind(this, 'createTime')}/>,
            )}
          </FilterItem>
        </Col>
        <Col {...TwoColProps} xl={{ span: 10 }} md={{ span: 24 }} sm={{ span: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div>
              <Button type="primary" size="large" className="margin-right" onClick={this.handleSubmit}>搜索</Button>
              <Button size="large" onClick={this.handleReset.bind(this, true)}>重置</Button>
            </div>
            <div>
              <Button size="large" type="ghost" onClick={this.props.onAdd}>新增</Button>
            </div>
          </div>
        </Col>
      </Row>
    )
  };
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  filter: PropTypes.object,
  onFilterChange: PropTypes.func,
}

export default Form.create()(Filter)
