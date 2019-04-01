module.exports = [{
  name: '支出',
  id: 'basic',
  icon: 'th-large',
  sub: [{
    name: '固定投资',
    componentName: 'FixPay'
  }, {
    name: '月支出',
    componentName: 'MonthPay'
  }]
}, {
  name: '收入',
  id: 'form',
  icon: 'wpforms',
  sub: [{
    name: '销售额',
    componentName: 'FormRadio'
  }, {
    name: '纯收入',
    componentName: 'FormCheckbox'
  }
  ]
}]
