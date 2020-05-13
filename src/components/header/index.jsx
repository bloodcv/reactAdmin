import React, { Component } from "react";

import "./index.less";
import weather from './imgs/weather.png';

export default class Header extends Component {
  render() {
    return (
      <header>
        <div className='header-top'>
          <span>欢迎，admin</span>
          <a href="#!">退出</a>
        </div>
        <div className='header-bottom'>
          <div className="header-bottom-left">
            首页
          </div>
          <div className="header-bottom-right">
            <span>2020-05-12 13:38:56</span>
            <img src={weather} alt="晴"/>
            <span>晴</span>
          </div>
        </div>
      </header>
    );
  }
}
