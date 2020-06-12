import React from 'react'
import CustomMenu from "../CustomMenu/index";

const menus = [
    {
    title: '上传护照',
    icon: 'file',
    key: '/home/function/upload'
  },
    {
        title: '上传申请表',
        icon: 'file',
        key: '/home/function/upload2'
    },
    {
        title: '截取护照照片',
        icon: 'scissor',
        key: '/home/function/cut'
    },
    {
        title: '未匹配申请表',
        icon: 'file',
        key: '/home/function/unmatched'
    },
    {
        title: '历史识别护照',
        icon: 'file',
        key: '/home/function/history'
    },
    {
        title: '统计信息',
        icon: 'file',
        key: '/home/other/chart'
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