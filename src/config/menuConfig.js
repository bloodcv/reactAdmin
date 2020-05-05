/*
 * @Description: 菜单路由
 * @Version: 1.0
 * @Autor: saya
 * @Date: 2020-05-05 17:59:29
 * @LastEditors: saya
 * @LastEditTime: 2020-05-05 19:07:32
 */

 const menuList = [
   {
    title: '首页',
    key: '/home',
    icon: 'PieChartOutlined'
   }, {
    title: '商品',
    key: '/products',
    icon: 'PieChartOutlined',
    children: [
      {
        title: '品类管理',
        key: '/category',
        icon: 'PieChartOutlined'
      }, {
        title: '商品管理',
        key: '/product',
        icon: 'PieChartOutlined'
      }
    ]
   }, {
    title: '用户管理',
    key: '/user',
    icon: 'PieChartOutlined'
   }, {
    title: '角色管理',
    key: '/role',
    icon: 'PieChartOutlined'
   }, {
    title: '图形图表',
    key: '/charts',
    icon: 'PieChartOutlined',
    children: [
      {
        title: '柱形图',
        key: '/bar',
        icon: 'PieChartOutlined'
      }, {
        title: '折线图',
        key: '/line',
        icon: 'PieChartOutlined'
      }, {
        title: '饼图',
        key: '/pie',
        icon: 'PieChartOutlined'
      }
    ]
   }
 ]

 export default menuList
