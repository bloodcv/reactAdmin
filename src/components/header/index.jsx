import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';

import './index.less';
import weatherPng from './imgs/weather.png';
import LinkButton from '../link-button';
import { reqWeather } from '../../api/index';
import menuList from '../../config/menuConfig';
import { formatDate } from '../../utils/dateUtils';
// import memoryUtils from '../../utils/memoryUtils';
// import storageUtils from '../../utils/storageUtils';
import { logout } from '../../redux/actions';

class Header extends Component {
  state = {
    city: '',
    weather: '',
    currentTime: '',
  };

  getCurrentTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({ currentTime: formatDate(Date.now()) });
    }, 1000);
  };

  getWeather = async () => {
    const { city, weather } = await reqWeather('上海');
    this.setState({ city, weather });
  };

  getTitle = () => {
    let title = '';
    const path = this.props.location.pathname;
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(
          cItem => path.indexOf(cItem.key) === 0
        );
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };

  logOut = () => {
    Modal.confirm({
      title: '确定退出?',
      icon: <ExclamationCircleOutlined />,
      onOk: () => {
        // memoryUtils.user = {};
        // storageUtils.removeUser();
        // this.props.history.replace('/login');
        // message.success('退出成功');
        this.props.logout();
      },
    });
  };

  componentDidMount() {
    this.getCurrentTime();
    this.getWeather();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { city, weather, currentTime } = this.state;

    // const title = this.getTitle();
    const title = this.props.headTitle;

    // const user = memoryUtils.user;
    const user = this.props.user;

    return (
      <header>
        <div className='header-top'>
          <span>欢迎，{user.username}</span>
          <LinkButton onClick={this.logOut}>退出</LinkButton>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src={weatherPng} alt='天气信息' />
            <span>
              {city}-{weather}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

export default connect(
  state => ({ headTitle: state.headTitle, user: state.user }),
  {logout}
)(withRouter(Header));
