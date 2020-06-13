import React from 'react'
import {Card, Col, Row, Icon, Upload, message, Button, Modal,BackTop,Table,Divider} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb'
import { DatePicker } from 'antd';
import moment from 'moment';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];
var from = new Date("2020/01/01");
var to = new Date("2020/06/01");
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







class HistoryDemo extends React.Component {
    state = {
        loading: false,
        previewVisible: false,
        fileList: [],
        previewImage: '',
        data: [],
    }

    onChange = (date, dateString) => {
        from = new Date(dateString[0])
        to = new Date(dateString[1])
        var formData = new FormData();
        formData.append("from", from)
        formData.append("to", to)
        fetch('http://localhost:8080/History/', {
            method: 'post',
            body: formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({data: data});
            })
    }

    componentDidMount() {
        from = new Date("2020/01/01");
        to = new Date("2020/06/01");
        var formData = new FormData();
        formData.append("from",from)
        formData.append("to",to)
        fetch('http://localhost:8080/History/', {
            method:'post',
            body:formData,
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                this.setState({data: data});
            })
    }

    render(){
        return (

            <div>
                <CustomBreadcrumb arr={['历史识别护照']}/>
                <RangePicker
                    defaultValue={[moment('2020/01/01', dateFormat), moment('2020/06/01', dateFormat)]}
                    onChange={this.onChange} format={dateFormat}
                />

                <Table dataSource={this.state.data} columns={columns} style = {{marginTop:30}}/>

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