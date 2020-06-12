import React from 'react'
import { withRouter, Switch, Redirect } from 'react-router-dom'
import LoadableComponent from '../../utils/LoadableComponent'
import PrivateRoute from '../PrivateRoute'



const UploadDemo = LoadableComponent(()=>import('../../routes/Function/UploadDemo/index'))
const UploadDemo2 = LoadableComponent(()=>import('../../routes/Function/UploadDemo2/index'))

const CutDemo = LoadableComponent(()=>import('../../routes/Function/CutDemo/index'))
const UnmatchedDemo = LoadableComponent(()=>import('../../routes/Function/Unmatched/index'))
const HistoryDemo = LoadableComponent(()=>import('../../routes/Function/HistoryDemo/index'))

const ChartDemo = LoadableComponent(()=>import('../../routes/Other/ChartDemo/index'))


@withRouter
class ContentMain extends React.Component {
  render () {
    return (
      <div style={{padding: 16, position: 'relative'}}>
        <Switch>



          <PrivateRoute exact path='/home/function/upload' component={UploadDemo}/>
          <PrivateRoute exact path='/home/function/upload2' component={UploadDemo2}/>
          <PrivateRoute exact path='/home/function/cut' component={CutDemo}/>
          <PrivateRoute exact path='/home/function/unmatched' component={UnmatchedDemo}/>
          <PrivateRoute exact path='/home/function/history' component={HistoryDemo}/>

          <PrivateRoute exact path='/home/other/chart' component={ChartDemo}/>


          <Redirect exact from='/' to='/home'/>
        </Switch>
      </div>
    )
  }
}

export default ContentMain