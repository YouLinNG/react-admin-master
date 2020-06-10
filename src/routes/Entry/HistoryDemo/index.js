import React from 'react'
import {Card, Col, Row, Icon, Upload, message, Button, Modal,BackTop,Table,Divider} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb'
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}



const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
            return (
                <span className={(text == null || text == "")? "error" : 'OK'}>{(text == null || text == "")? "无法识别": text}</span>);
        }
    }, {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render: (text, record) => {
            return (
                <span className={(text == null || text == "")? "error" : 'OK'}>{(text == null || text == "")? "无法识别": text}</span>);
        }
    }, {
        title: '出生日期',
        dataIndex: 'birth',
        key: 'birth',
        render: (text, record) => {
            return (
                <span className={(text == null || text == "")? "error" : 'OK'}>{(text == null || text == "")? "无法识别": text}</span>);
        }
    }, {
        title: '护照号码',
        dataIndex: 'passnum',
        key: 'passnum',
        render: (text, record) => {
            return (
                <span className={(text ==  null || text == "")? "error" : 'OK'}>{(text == null || text == "")? "无法识别": text}</span>);
        }
    }]





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



class HistoryDemo extends React.Component {
    state = {
        loading: false,
        previewVisible: false,
        fileList: [],
        previewImage: '',
        ocrData: [],
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
        fetch('http://localhost:8080/Ocr/Name', {
            method:'post',
            body:formData
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

                this.setState({ocrData: data});
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

    render() {
        return (

            <div>
                <CustomBreadcrumb arr={['历史识别护照']}/>
                <RangePicker
                    defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]}
                    format={dateFormat}
                />

                <Table dataSource={this.state.ocrData} columns={columns} style = {{marginTop:30}}/>

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


export default HistoryDemo