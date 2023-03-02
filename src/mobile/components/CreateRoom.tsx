import { Button, Form, Input } from 'antd-mobile'
import React from 'react'
import SocketClient from '../service/socketClient'

const CreateRoom = () => {
  const onFinish = (values: any) => {
    SocketClient.client.ping('ping')
    SocketClient.client.createRoom(values.browserWSEndpoint, values.url)
    console.info(values)
  }
  return (
    <>
      <Form
        name="form"
        onFinish={onFinish}
        footer={
          <Button block type="submit" color="primary" size="large">
            提交
          </Button>
        }
      >
        <Form.Header>连接远程浏览器</Form.Header>
        <Form.Item name="browserWSEndpoint" label="浏览器地址" rules={[{ required: true }]}>
          <Input placeholder="请输入浏览器地址" />
        </Form.Item>
        <Form.Item name="url" label="访问地址" rules={[{ required: true }]}>
          <Input placeholder="请输入访问地址" />
        </Form.Item>
      </Form>
    </>
  )
}
export default CreateRoom
