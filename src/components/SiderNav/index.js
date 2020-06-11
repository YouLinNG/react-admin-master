import React from 'react'
import CustomMenu from "../CustomMenu/index";

const menus = [
    {
    title: '上传护照',
    icon: 'file',
    key: '/home/entry/upload'
  },
    {
        title: '上传申请表',
        icon: 'file',
        key: '/home/entry/upload2'
    },
    {
        title: '截取护照照片',
        icon: 'scissor',
        key: '/home/entry/cut'
    },
    {
        title: '未匹配申请表',
        icon: 'file',
        key: '/home/entry/unmatched'
    },
    {
        title: '历史识别护照',
        icon: 'file',
        key: '/home/entry/history'
    }
]


class SiderNav extends React.Component {
  render() {

    return (
      <div style={{height: '100vh',overflowY:'scroll'}}>
        <div style={styles.logo}></div>
        <CustomMenu menus={menus}/>
      </div>
    )
  }
}

const styles = {
  logo: {
    height: '32px',
    background: 'rgba(255, 255, 255, .2)',
    margin: '16px'
  }
}

export default SiderNav