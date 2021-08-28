import React from 'react'
import { Menu } from 'antd'
import { useHistory } from 'react-router-dom'
import { HomeOutlined } from '@ant-design/icons'

import styles from './index.module.less'

const ActSecNav = () => {
  const history = useHistory()
  const redirectTo = (path) => {
    history.push(path)
  }
  return (
    <Menu mode="inline" defaultSelectedKeys={['11']} defaultOpenKeys={['sub1']} theme="dark" className={styles.menu}>
      <Menu.SubMenu key="sub1" icon={<HomeOutlined />} title="活动基础组件库">
        <Menu.Item key="21" onClick={() => redirectTo('/basis/deduct')}>
          促销扣款
        </Menu.Item>
        <Menu.Item key="31" onClick={() => redirectTo('/basis/info')}>
          基本信息
        </Menu.Item>
        <Menu.Item key="41" onClick={() => redirectTo('/basis/commodity')}>
          商品范围
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export default ActSecNav
