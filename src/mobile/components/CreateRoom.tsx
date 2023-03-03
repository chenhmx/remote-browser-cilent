import { Button, Form, Input, NumberKeyboard } from 'antd-mobile'
import React, { useState } from 'react'
import SocketClient from '../service/socketClient'

const CreateRoom = () => {
  const [form] = Form.useForm() // form 实例
  const [visible, setVisible] = useState<any>('')
  const actions = {
    openKeyboard: (name: string) => {
      setVisible(name)
    },
    onClose: () => {
      setVisible('')
    },
    onInput: (inputValue: string) => {
      const fieldValue: string = form.getFieldValue(visible)
      form.setFieldValue(visible, fieldValue === undefined ? Number(inputValue) : Number(fieldValue + inputValue))
    },
    onDelete: () => {
      const fieldValue: string = form.getFieldValue(visible)
      if (fieldValue === undefined || String(fieldValue).length <= 1) {
        form.resetFields([visible])
      } else {
        form.setFieldValue(visible, Number(String(fieldValue).slice(0, String(fieldValue).length - 1)))
      }
    },
  }

  const onFinish = (values: any) => {
    SocketClient.client.ping('ping')
    SocketClient.client.createRoom(values.browserWSEndpoint, values.url, values.currentTableNumber)
    console.info(values)
  }
  return (
    <>
      <Form
        form={form}
        name="form"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Header>连接远程浏览器</Form.Header>
        <Form.Item name="browserWSEndpoint" label="浏览器地址" rules={[{ type: 'string', required: true }]}>
          <Input placeholder="请输入浏览器地址" clearable />
        </Form.Item>
        <Form.Item name="url" label="访问地址" rules={[{ type: 'string', required: true }]}>
          <Input placeholder="请输入访问地址" clearable />
        </Form.Item>
        <Form.Item
          name="currentTableNumber"
          label="请求标签页"
          validateFirst={true}
          rules={[
            { type: 'number', max: 30 },
            { type: 'number', min: 0 },
          ]}
          onClick={() => actions.openKeyboard('currentTableNumber')}
        >
          <Input placeholder="请输入请求标签页" /* readOnly */ />
        </Form.Item>
        <NumberKeyboard
          visible={visible === 'currentTableNumber'}
          onClose={actions.onClose}
          onInput={actions.onInput}
          onDelete={actions.onDelete}
          safeArea={true}
        />
      </Form>
    </>
  )
}
export default CreateRoom
