import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './index.less';
import weatherPng from './imgs/weather.png';
import { reqWeather } from '../../api/index';
import menuList from '../../config/menuConfig';
import { getDateAllStr } from '../../utils/dateUtils';

class Header extends Component {
  state = {
    city: '',
    weather: '',
    currentTime: '',
  };

  getCurrentTime = () => {
    setInterval(() => {
      this.setState({ currentTime: getDateAllStr(Date.now()) });
    }, 1000);
  };

  getWeather = async () => {
    const { city, weather } = await reqWeather('上海');
    this.setState({ city, weather });
  };

  getTitle = () => {
    const path = this.props.location.pathname;
    // menuList.forEach(item)
  };

  componentDidMount() {
    this.getCurrentTime();
    this.getWeather();
  }

  render() {
    const { city, weather, currentTime } = this.state;

    return (
      <header>
        <div className='header-top'>
          <span>欢迎，admin</span>
          <a href='#!'>退出</a>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>首页</div>
          <div className='header-bottom-right'>
            <span>{currentTime}</span>
            <img src={weatherPng} alt='晴' />
            <span>
              {city}-{weather}
            </span>
          </div>
        </div>
      </header>
    );
  }
}

export default withRouter(Header);
