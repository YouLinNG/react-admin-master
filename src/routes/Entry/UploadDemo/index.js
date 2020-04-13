import React from 'react'
import {Card, Col, Row, Icon, Upload, message, Button, Modal,BackTop,Table,Divider} from 'antd'
import CustomBreadcrumb from '../../../components/CustomBreadcrumb'
import TypingCard from '../../../components/TypingCard'

const Dragger = Upload.Dragger;

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
    render: text => <a>{text}</a>,
  }, {
    title: '性别',
    dataIndex: 'sex',
    key: 'sex',
  }, {
    title: '出生日期',
    dataIndex: 'birthdate',
    key: 'birthdate',
  }, {
    title: '护照号码',
    dataIndex: 'passportnumber',
    key: 'passportnumber',
  }, {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
        <span>
      <a>Action 一 {record.name}</a>
      <Divider type="vertical"/>
      <a>Delete</a>
      <Divider type="vertical"/>
      <a className="ant-dropdown-link">
        More actions <Icon type="down"/>
      </a>
    </span>
    ),
  }]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  }, {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  }, {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
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



class UploadDemo extends React.Component {
  state = {
    loading: false,
    previewVisible: false,
    pictureList: [],
    previewImage: '',
    ocrData: [],
  }

  beforeUpload(file, fileList) {
    this.setState(state => ({
      pictureList: [...state.pictureList, file],
    }));

    const isLt2M = file.size / 1024 / 1024 < 50;
    if (!isLt2M) {
      message.error('图片大小不超过 50MB!');
    }
    return isLt2M;
  }

  handlePicture = (fileList) => {

    fetch("http://localhost:8080/Ocr",{type:'GET',data:fileList})
        .then((res) => {
          this.setState({
            ocrData: res
          })
        })
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
    const uploadButton = (
        <div>
          <Icon type="plus"/>
          <div className="ant-upload-text">Upload</div>
        </div>
    );

    return (
        <div>
          <CustomBreadcrumb arr={['输入', '上传']}/>
          <Row gutter={16}>
              <Card bordered={false} className='card-item' title='基本用法'>
                <Upload {...props}>
                  <Button><Icon type="upload"/>Upload</Button>
                </Upload>
              </Card>
          </Row>
          <Row>
              <Card bordered={false} style={{...styles.colItem, minHeight: 255}} title='照片墙'>
                <Upload
                    action="http://localhost:8080/File/"
                    listType="picture-card"
                    fileList={this.state.fileList}
                    onPreview={this.handlePreview}
                    multiple={true}
                    onChange={({fileList}) => this.setState({fileList})}
                >
                  {uploadButton}
                </Upload>
                <Modal visible={this.state.previewVisible} onCancel={() => this.setState({previewVisible: false})}>
                  <img alt="example" style={{width: '100%'}} src={this.state.previewImage}/>
                </Modal>
                <Button type="danger" onClick={this.handlePicture(this.state.pictureList)}>
                  开始识别
                </Button>
              </Card>

          </Row>

          <Table dataSource={this.state.ocrData} columns={columns} style={styles.tableStyle} />
          <BackTop visibilityHeight={200} style={{right: 50}}/>
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

export default UploadDemo