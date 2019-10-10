; (function (doc) {
  class Rolling {
    constructor(opt, callBack) {
      this.WrapperBoxes = opt.el;  // 外层盒子
      this.CallBackFuntion = callBack;  // 回调函数
      this.TargetNumber = this.$ConvertDigital(opt.target); // 最终目标的数字
      this.TargetLength = String(this.TargetNumber).length; // 目标数的位数
      this.AnimationDelay = opt.delay !== undefined ? opt.delay : 300;  // 延时多久执行回调函数
      this.AnimationDuration = opt.duration !== undefined ? opt.duration : 2000; // 动画持续时间
      this.AnimationDirection = opt.direction !== undefined ? opt.direction : 'random'; // 数字滚动的形式
      this.MATERIALPIC = 'data:image/png;base64,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';
      this.CSSSTYLE = `${this.WrapperBoxes}{font-size:0}span.rolling-number{display:inline-block;margin-top:2px;width:18px;height:20px;background:url(${this.MATERIALPIC}) no-repeat;background-position:0 0;transition:${this.AnimationDuration ? .1 : 0}s ease-out}`;
      this.ERRORMSG = {
        CallBackInvalid: '请传入有效的回调函数！',
        UnusableElements: '请选择可被正确挂载的元素！',
        TargetNumberEmpty: '请输入目标数字，如果不确定，可传入与结果位数相同的字符串！',
        TargetNumberInvalid: '请输入合法的值，允许传入的值为 {String}[0-9] 暂不支持小数！',
      };

      // 自定义变量
      this.defaultBaseNumber = 0;
      this.timeoutTimer = null; // 延时器
      this.interTimer = null;  // 计时器
      this.initPluginOptions();
    }
    
    // 初始化插件配置 [插入CSS 插入元素]
    initPluginOptions() {
      let lens = this.TargetLength;
      this.insertCSSTagInHead();
      this.insertNumberInBody(lens);
    }

    // 检查必备参数完整性
    checkParamsIntegrity(CheckValue) {
      let mountElement = this.$SelectElement(this.WrapperBoxes)[0];
      let isCallBackEffective = typeof (this.CallBackFuntion) === 'function';

      if (!mountElement) throw Error(this.ERRORMSG.UnusableElements);
      if (!CheckValue) throw Error(this.ERRORMSG.TargetNumberEmpty);
      if (CheckValue == 'NaN') throw Error(this.ERRORMSG.TargetNumberInvalid);
      if (!isCallBackEffective) throw Error(this.ERRORMSG.CallBackInvalid);
    }

    // 将 CSS 样式插入 head 标签中
    insertCSSTagInHead() {
      const CSSTag = doc.createElement('style'),
        headFirstChild = doc.head.firstChild;

      CSSTag.type = 'text/css';
      CSSTag.innerHTML = this.CSSSTYLE;
      doc.head.insertBefore(CSSTag, headFirstChild);
    }

    // 将数字插入到 目标标签中
    insertNumberInBody(ElementLength) {
      let componentWrap = this.$SelectElement(this.WrapperBoxes)[0],
        componentList = this.$CreateNumberElement(ElementLength),
        DocumentFragment = doc.createDocumentFragment();

      componentWrap.innerHTML = '';
      componentList.innerHTML = '';
      componentList.forEach(elem => DocumentFragment.appendChild(elem));
      componentWrap.append(DocumentFragment);
    }

    // 将数字插入到 目标标签中
    insertNumberInBody(ElementLength) {
      let componentWrap = this.$SelectElement(this.WrapperBoxes)[0],
        componentList = this.$CreateNumberElement(ElementLength),
        cacheDocumentFragment = doc.createDocumentFragment();

      componentWrap.innerHTML = '';
      componentList.innerHTML = '';
      componentList.forEach(elem => cacheDocumentFragment.appendChild(elem));
      componentWrap.append(cacheDocumentFragment);
    }

    // 重新开始滚动 并跳转至原值或者新值
    start(newNumber = this.TargetNumber) {
      let strinfifyNewNumber = this.$ConvertDigital(newNumber);
      
      this.checkParamsIntegrity(strinfifyNewNumber);

      // 如果后面设置的数字与初始化数字的位数不一样时重新生成元素
      if (strinfifyNewNumber.length !== this.TargetLength) {
        let newNumberLength = strinfifyNewNumber.length;
        this.insertNumberInBody(newNumberLength);
      }

      // 开始滚动动画
      this.startAnimation(strinfifyNewNumber);
    }

    // 开始滚动动画
    startAnimation(newNumber) {
      let componentList = this.$SelectElement('span.rolling-number'),
        currentElementList = componentList.length,
        componentItem = null, // 缓存的元素
        randomNumber = 0;

      // 开始轮播动画
      this.interTimer = setInterval(() => {
        for (let i = 0; i < currentElementList; i++) {

          componentItem = componentList[i].style;
          randomNumber = this.$RollingMethods(this.AnimationDirection);

          componentItem.cssText = `background-position: 0 ${randomNumber * -30}px;`;
        }
      }, 100);

      // 多长时间以后停止动画
      this.timeoutTimer = setTimeout(() => {
        // 清除定时器
        this.$ClearTimers();
        // 在结束滚动以后把数值滚动到目标值 并延时执行回调函数
        this.rollingToTarget(componentList, newNumber);
      }, this.AnimationDuration);
    }

    // 把数字滚动到目标设定的值
    rollingToTarget(nodeArray, numbers) {
      let nodeArrayLength = nodeArray.length,
        rollingNumberItem = null,
        callBackTimer = null;

      // 把数字滚动到目标数字
      for (let i = 0; i < nodeArrayLength; i++) {
        rollingNumberItem = nodeArray[i].style;
        rollingNumberItem.cssText = `background-position: 0 ${numbers[i] * -30}px;`
      }

      // 等到动画结束以后再执行回调函数
      callBackTimer = setTimeout(() => {
        let PARAMS = numbers || TargetNumber;
        clearTimeout(callBackTimer);
        callBackTimer = null;

        this.CallBackFuntion(PARAMS);
      }, this.AnimationDelay);
    }

    // 返回选择的元素
    $SelectElement(elem) {
      return doc.querySelectorAll(elem);
    }

    // 把字符数字转换成合法数
    $ConvertDigital(number){
      return String(Math.floor(number));
    }

    // 动画滚动的方式
    $RollingMethods(type) {
      switch (type) {
        case 'up':
          return this.$RestoreNumbers('up');
        case 'down':
          return this.$RestoreNumbers('down');
        case 'random':
          return Math.floor(Math.random() * 9);
        default:
          return Math.floor(Math.random() * 9);
      }
    }

    // 清除定时器
    $ClearTimers() {
      clearInterval(this.timeoutTimer);
      clearInterval(this.interTimer);
      this.timeoutTimer = null;
      this.interTimer = null;
    }

    // 如果超过上限则恢复为上限值
    $RestoreNumbers(type) {
      if (type === 'up') {
        return this.defaultBaseNumber > 9 ? this.defaultBaseNumber = 0 : this.defaultBaseNumber++;
      } else if (type === 'down') {
        return this.defaultBaseNumber < 0 ? this.defaultBaseNumber = 9 : this.defaultBaseNumber--;
      }
    }

    // 创建目标数长度的元素数组
    $CreateNumberElement(ElementLength) {
      let component = null,
        componentArr = [];

      for (let i = 0; i < ElementLength; i++) {
        component = doc.createElement('span');
        component.className = 'rolling-number';
        componentArr.push(component);
      }

      return componentArr;
    }
  }
  window.Rolling = Rolling;
}(document));