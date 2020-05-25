import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { message } from "antd";

import "./index.less";
import weatherPng from "./imgs/weather.png";
import { reqWeather } from "../../api/index";
import menuList from "../../config/menuConfig";
import { getDateAllStr } from "../../utils/dateUtils";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from "../../utils/storageUtils";

class Header extends Component {
  state = {
    city: "",
    weather: "",
    currentTime: "",
  };

  getCurrentTime = () => {
    this.intervalId = setInterval(() => {
      this.setState({ currentTime: getDateAllStr(Date.now()) });
    }, 1000);
  };

  getWeather = async () => {
    const { city, weather } = await reqWeather("上海");
    this.setState({ city, weather });
  };

  getTitle = () => {
    let title = "";
    const path = this.props.location.pathname;
    menuList.forEach(item => {
      if (item.key === path) {
        title = item.title;
      } else if (item.children) {
        const cItem = item.children.find(cItem => cItem.key === path);
        if (cItem) {
          title = cItem.title;
        }
      }
    });
    return title;
  };

  getUser = () => {
    this.user = memoryUtils.user.username;
  };

  logOut = () => {
    console.log(4444);
    memoryUtils.user = {};
    storageUtils.removeUser();
    this.props.history.replace("/login");
    message.success("退出成功");
  };

  componentDidMount() {
    this.getCurrentTime();
    this.getWeather();
    this.getUser();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  render() {
    const { city, weather, currentTime } = this.state;

    const title = this.getTitle();

    return (
      <header>
        <div className='header-top'>
          <span>欢迎，{this.user}</span>
          <button onClick={this.logOut}>退出</button>
        </div>
        <div className='header-bottom'>
          <div className='header-bottom-left'>{title}</div>
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
