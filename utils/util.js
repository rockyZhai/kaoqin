function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

let imgUrls = {
      shuiguo:[
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/apple.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/pear.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/apricot.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/banana.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/carambola.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/cherry.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/coconut.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/grape.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/grapefruit.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/hamimelon.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/hawthorn.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/jujube.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/kiwifruit.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/lemon.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/loquat.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/mango.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/mangosteen.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/olive.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/peach.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/persimmon.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/pineapple.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/plum.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/pomegranate.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/strawberry.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuiguo/watermelon.jpg',
      ],
      shuzi:[
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/1.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/2.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/3.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/4.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/5.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/6.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/7.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/8.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/9.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/10.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/11.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/12.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/13.jpg',
        'http://images-1251567240.cosgz.myqcloud.com/shuzi/14.jpg',
      ]
    };

module.exports = {
  formatTime: formatTime,
  imgUrls:imgUrls
}
