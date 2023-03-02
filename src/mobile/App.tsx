import { TabBar, WaterMark } from 'antd-mobile'
import { ChatAddOutline, UserAddOutline, UserOutline } from 'antd-mobile-icons'
import React, { FC } from 'react'
import { MemoryRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import CreateRoom from './components/CreateRoom'
import styles from './style/layout.module.less'

const textProps = {
  content: 'Simon Mobile',
}

const Bottom: FC = () => {
  const location = useLocation()
  const { pathname } = location
  const navigate = useNavigate()
  const setRouteActive = (value: string) => {
    navigate(value)
  }

  const tabs = [
    {
      key: '/create',
      title: '创建',
      icon: <ChatAddOutline />,
    },
    {
      key: '/join',
      title: '加入',
      icon: <UserAddOutline />,
    },
    {
      key: '/me',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  return (
    <TabBar activeKey={pathname} onChange={(value) => setRouteActive(value)}>
      {tabs.map((item) => (
        <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
      ))}
    </TabBar>
  )
}

const App = () => (
  <>
    <Router initialEntries={['/create']}>
      <div className={styles.app}>
        <div className={styles.body}>
          <Routes>
            <Route path="/create" element={<CreateRoom />} />
            <Route path="/join" element={<Join />} />
            <Route path="/me" element={<PersonalCenter />} />
          </Routes>
        </div>
        <div className={styles.bottom}>
          <Bottom />
        </div>
      </div>
    </Router>
    <WaterMark {...textProps} />
  </>
)

export default App

function Join() {
  return <div>加入</div>
}

function PersonalCenter() {
  return <div>我的</div>
}
