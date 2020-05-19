import React, { Component } from "react";

import "./index.less";
import weatherPng from "./imgs/weather.png";
import { getDateAllStr } from "../../utils/dateUtils";

export default class Header extends Component {
  state = {
    city: "",
    weather: "",
    currentTime: "",
  };

  getWeather = () => {
    setInterval(() => {
      this.setState({ currentTime: getDateAllStr(Date.now()) });
    }, 1000);
  };

  componentDidMount() {
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
