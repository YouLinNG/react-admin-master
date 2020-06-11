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
        data: [{src:"D:\\react-admin-master\\src\\assets\\img\\4.jpg"},
            {src:"src/assets/img/2.jpg"},
            {src:"src/assets/img/3.jpg"}]
    }

    beforeUpload(file, fileList) {
        this.setState(state => ({
            fileList: [...state.fileList, file],
        }));

        const isLt2M = file.size / 1024 / 1024 < 50;
        if (!isLt2M) {
            message.error('图片大小不超过 50MB!');
        }
        return isLt2M;
    }

    handlePicture = () => {
        console.log(this.state.fileList)
        let formData = new FormData();
        for(let i = 0; i < this.state.fileList.length; i++) {
            formData.append('file', this.state.fileList[i].name);
        }
        fetch('http://localhost:8080/Cut/Photo', {
            method:'post',
            body:formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                data[0].passnum = "EG7686872";
                data[1].passnum = "EH2886259";
                data[2].passnum = "ED1387624";

                this.setState({cutData: data});
            })

        // axios({
        //     method:"POST",
        //     url:"http://localhost:8080/Ocr/name",
        //     data:formData,
        //     //withCredentials:true
        // }).then(function(res){
        //     this.setState({ocrData: res})
        // }).catch(function(error){
        //     alert('post失败')
        //     console.log(error);
        // });

    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => this.setState({
                imageUrl,
                loading: false,
            }))
        } else if (info.file.status === 'error') {
            // console.log(info.file)
            message.error(`${info.file.name} 文件上传失败（${info.file.error.message}）`);
            this.setState({
                loading: false
            })
        }
    }
    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }
    test = () => {
        alert(this.state.data[0].src)
    }

    render() {
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <div>
                <CustomBreadcrumb arr={['未匹配申请表']}/>


                <Card bordered={false} title='未匹配的申请表'onClick={this.test}   style={{marginBottom: 15}} id='verticalStyle'>
                    <img style={{width:200,height:200}} src={require('../../../assets/img/4.jpg')}/>

                </Card>
            </div>
        )
    }
}

const styles = {
    colItem: {
        minHeight: 230,
        borderRadius: 3,
        margin: '10px 0'
    }
}

export default UnmatchedDemo