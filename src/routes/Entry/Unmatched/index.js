import React from 'react'
import {Card, Col, Row, Icon, Upload, message, Button, Modal,BackTop,Table,Divider,Spin, Radio, List, Switch, Avatar,Anchor,Affix} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb'
import TypingCard from '../../../components/TypingCard'

const Dragger = Upload.Dragger;

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

const props = {
    name: 'file',
    action: 'http://localhost:8080/File',

    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            message.success(`${info.file.name} 文件上传成功`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 文件上传失败`);
        }
    },

}



class UnmatchedDemo extends React.Component {
    state = {
        loading: false,
        previewVisible: false,
        fileList: [],
        previewImage: '',
        unmatchedData: []
    }

    componentDidMount() {
        fetch('http://localhost:8080/Visa/Unmatched', {
            method:'post',
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({unmatchedData: data});
            })
    }

    render() {


        return (
            <div>
                <CustomBreadcrumb arr={['未匹配申请表']}/>


                <Card bordered={false} title='未匹配的申请表' style={{marginBottom: 15}} id='verticalStyle'>
                    <List dataSource={this.state.unmatchedData}
                          renderItem={item=>{
                              return (
                                  <List.Item style={{display:'inline-block'}}>
                                      <List.Item.Meta
                                          avatar={<Avatar shape="square" style = {{width:270,height:350}} src={'data:img/png;base64,'+item} />}/>
                                  </List.Item>
                              )
                          }}
                    />
                </Card>
            </div>
        )
    }
}



export default UnmatchedDemo