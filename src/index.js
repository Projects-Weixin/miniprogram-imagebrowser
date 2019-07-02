// pages/components/photobrowser/photobrowser.js

var callback = function() {}

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    pics: { //导航栏标题
      type: Array,
      value: [], //默认
      observer: function(newVal, oldVal, changedPath) {
        if (!newVal) {
          let obj = {};
          obj[changedPath[0]] = oldVal;
          this.setData(obj);
        }
      }
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    width: wx.getSystemInfoSync().screenWidth,
    height: wx.getSystemInfoSync().screenHeight,
    isPhotoBrowserHidden: false,
    isActionSheetHidden: true,
    cur: 0, //不使用current字段是因为：通过current修改swipe当前项会导致重复setdata异常（小程序已知bug）
    pics: [{
      filePath: '',
      isQuestion: '0',
    }],
    // 图片预览地址
    imageUrl: '',
    // 是否是正在图片预览
    isPreview: false,
    // 只是图片预览（IMAGE类型）,不是图片浏览器（WORD，PPT，PDF类型）
    isImage: false,
    hideMarkBtn: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    onImageChange: function(e) {
      // console.log('change:', e)
    },

    onImageScale: function(e) {
      // console.log('scale:', e)
    },

    /**
     * 屏幕旋转，窗口尺寸变化
     */
    onResize: function(res) {
      console.log('onResize', res)
      this.setData({
        width: res.size.windowWidth,
        height: res.size.windowHeight
      })
    },

    //图片选项目录
    showActionSheet: function() {
      this.setData({
        isActionSheetHidden: false,
      })
    },

    hideActionSheet: function() {
      this.setData({
        isActionSheetHidden: true,
      })
    },

    actionSheetClick: function(e) {
      this.setData({
        isActionSheetHidden: true,
        cur: parseInt(e.currentTarget.dataset.current),
      })
    },

    // 不懂事件
    unstudiedClick: function() {
      var i = this.data.cur
      var pic = this.data.pics[i]
      pic.isQuestion = pic.isQuestion == '0' ? '1' : '0'
      this.data.pics[i] = pic
      this.setData({
        pics: this.data.pics
      })
      callback(pic)
    },

    // 图片翻页事件
    bindchange: function(e) {
      // 先把图片选择目录 隐藏
      if (!this.data.isActionSheetHidden) {
        this.setData({
          isActionSheetHidden: true
        })
      }

      this.setData({
        cur: e.detail.current,
      })
    },

    // 图片加载事件,可获取图片宽高
    eventhandle: function(e) {},

    // 显示/隐藏 图片浏览器
    photoBrowserClick: function(e) {
      if(this.data.pics.length == 0) {
        return
      }
      var pic = this.data.pics[this.data.cur]
      wx.previewImage({
        urls: [pic.filePath],
      })
      return
      // 不使用自己做的图片预览
      /*
      this.setData({
        imageUrl: pic.filePath,
        isPreview: true,
        isActionSheetHidden: true
      })
      */
    },

    /**
     * 预览图片点击
     */
    previewClick: function() {
      // 图片类型，不需要隐藏
      if (this.data.isImage) {
        return
      }
      this.setData({
        isPreview: false
      })
    },

    /**
     * 设置图片浏览器数据
     */
    setPics: function(e, handler) {
      callback = handler
      this.setData({
        pics: e
      })
    },

    /**
     * 设置
     */
    setImage: function (e) {
      this.setData({
        imageUrl: e,
        isImage: true,
        isPreview: true
      })
    },

    /**
     * 是否显示不懂按钮(默认显示)
     */
    hideMarkBtn: function(e) {
      this.setData({
        hideMarkBtn: e
      })
    }
  }
})