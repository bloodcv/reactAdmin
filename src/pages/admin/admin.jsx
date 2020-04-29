/*
 *后台管理的路由组件
 */

import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import memoryUtils from "../../utils/memoryUtils";

export default class Admin extends Component {
  render() {
    const user = memoryUtils.user;
    if (!user || !user._id) {
      return <Redirect to='/login'></Redirect>;
    }

    return (
      <div>
        <h2>
          hello <strong>{memoryUtils.user.username}</strong>
        </h2>
      </div>
    );
  }
}
