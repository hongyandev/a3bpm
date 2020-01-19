define(['vue','photoswipe','photoswipe-ui', 'objectAssign'], function (Vue, PhotoSwipe, UI, objectAssign) {
    return Vue.extend({
        name: 'Previewer',
        template: `<!-- Root element of PhotoSwipe. Must have class pswp. -->
          <div class="pswp vux-previewer" tabindex="-1" role="dialog" aria-hidden="true">
            <!-- Background of PhotoSwipe.
                 It's a separate element as animating opacity is faster than rgba(). -->
            <div class="pswp__bg"></div>
            <!-- Slides wrapper with overflow:hidden. -->
            <div class="pswp__scroll-wrap">
              <!-- Container that holds slides.
                PhotoSwipe keeps only 3 of them in the DOM to save memory.
                Don't modify these 3 pswp__item elements, data is added later on. -->
              <div class="pswp__container">
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
                <div class="pswp__item"></div>
              </div>
              <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
              <div class="pswp__ui pswp__ui--hidden">
                <div class="pswp__top-bar">
                  <!--  Controls are self-explanatory. Order can be changed. -->
                  <div class="pswp__counter"></div>
                  <slot name="button-after"></slot>
                  <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>
                  <button class="pswp__button pswp__button--share" title="Share"></button>
                  <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button>
                  <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>
                  <slot name="button-before"></slot>
                  <!-- Preloader demo http://codepen.io/dimsemenov/pen/yyBWoR -->
                  <!-- element will get class pswp__preloader--active when preloader is running -->
                  <div class="pswp__preloader">
                    <div class="pswp__preloader__icn">
                      <div class="pswp__preloader__cut">
                        <div class="pswp__preloader__donut"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
                  <div class="pswp__share-tooltip"></div>
                </div>
                <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button>
                <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button>
                <div class="pswp__caption">
                  <div class="pswp__caption__center"></div>
                </div>
              </div>
            </div>
          </div>`,
        computed: {
            imgs: function () {
                return this.list.map(one => {
                    if (!one.msrc) {
                        one.msrc = one.src
                    }
                    if (typeof one.w === 'undefined') {
                        one.w = 0
                        one.h = 0
                    }
                    return one
                })
            }
        },
        watch: {
            imgs: function (newVal, oldVal) {
                if (!this.photoswipe) {
                    return
                }
                if (newVal.length && newVal.length - oldVal.length === -1) {
                    var index = this.photoswipe.getCurrentIndex()
                    this.photoswipe.invalidateCurrItems()
                    this.photoswipe.items.splice(index, 1)
                    var goToIndex = index
                    if (goToIndex > this.photoswipe.items.length - 1) {
                        goToIndex = 0
                    }
                    this.photoswipe.goTo(goToIndex)
                    this.photoswipe.updateSize(true)
                    this.photoswipe.ui.update()
                } else if (!newVal.length) {
                    this.close()
                }
            }
        },
        methods: {
            init: function (index) {
                var self = this
                var showItem = this.imgs[index]
                if (!showItem.w || !showItem.h || showItem.w < 5 || showItem.h < 5) {
                    var img = new Image()
                    img.onload = function () {
                        showItem.w = this.width
                        showItem.h = this.height
                        self.doInit(index)
                    }
                    img.src = showItem.src
                } else {
                    this.doInit(index)
                }
            },
            doInit: function (index) {
                var self = this
                var options = objectAssign({
                    history: false,
                    shareEl: false,
                    tapToClose: true,
                    index: index
                }, this.options)
                this.photoswipe = new PhotoSwipe(this.$el, UI, this.imgs, options)

                this.photoswipe.listen('gettingData', function (index, item) {
                    if (!item.w || !item.h || item.w < 1 || item.h < 1) {
                        var img = new Image()
                        img.onload = function () {
                            item.w = this.width
                            item.h = this.height
                            self.photoswipe.updateSize(true)
                        }
                        img.src = item.src
                    }
                })

                this.photoswipe.init()
                this.photoswipe.listen('close', function () {
                    self.$emit('on-close')
                })
                this.photoswipe.listen('afterChange', function (a, b) {
                    self.$emit('on-index-change', {
                        currentIndex: self.photoswipe.getCurrentIndex()
                    })
                })
            },
            show: function (index) {
                this.init(index)
            },
            getCurrentIndex: function () {
                if (this.photoswipe) {
                    return this.photoswipe.getCurrentIndex()
                }
            },
            close: function () {
                this.photoswipe && this.photoswipe.close()
            },
            goTo: function (index) {
                this.photoswipe && this.photoswipe.goTo(index)
            },
            prev: function () {
                this.photoswipe && this.photoswipe.prev()
            },
            next: function () {
                this.photoswipe && this.photoswipe.next()
            }
        },
        props: {
            list: {
                type: Array,
                required: true
            },
            index: {
                type: Number,
                default: 0
            },
            options: {
                type: Object,
                default () {
                    return {}
                }
            }
        }
    })
})