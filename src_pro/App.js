/*
 * @Description: 应用的根组件
 * @Version: 1.0
 * @Autor: saya
 * @Date: 2020-04-22 15:22:18
 * @LastEditors: saya
 * @LastEditTime: 2020-04-22 17:24:44
 */

import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/login/login'
import Admin from  './pages/admin/admin'

export default class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Switch> {/* 只匹配其中一个 */}
          <Route path='/login' component={Login}></Route>
          <Route path='/' component={Admin}></Route>
        </Switch>
      </BrowserRouter>
    )
  }
}