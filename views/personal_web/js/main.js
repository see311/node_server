$('#home').css('height', window.innerHeight);
$('#home>.content').css('margin-top', (-parseInt($('#home>.content').css('height')) / 2)); //自适应垂直居中
$('#navbar>li').click(function (e) {
    e.preventDefault();
    if (window.innerWidth <= 768) { //排除大屏下的导航栏bug
        $('button.navbar-toggle').click();
    }
    $('body').animate({
        scrollTop: $($(this).children('a').attr('href')).offset().top - 50
    }, function () {
        if ($(this).hasClass('active')) { //写在动画执行完毕后执行，防止与滚动监听冲突
            return;
        } else {
            $(this).addClass('active').siblings('.active').removeClass('active');
        }
    });
});
$(window).scroll(function () {
    if ($(this).scrollTop() < ($('#skills').offset().top - 500)) {
        $('#navbar>li>a[href="#home"]').parent('li').addClass('active').siblings('.active').removeClass('active');
    }
    if ($(this).scrollTop() >= ($('#skills').offset().top - 500)) {
        $('#navbar>li>a[href="#skills"]').parent('li').addClass('active').siblings('.active').removeClass('active');
        if (!$('#skills .movable').hasClass('moveright')) { //仅触发一次定时器
            var i = 0;
            var timer = setInterval(function () {
                $($('#skills .movable')[i]).addClass('moveright');
                i++;
                if (i >= $('#skills .movable').length) {
                    clearInterval(timer);
                    timer = null;
                }
            }, 300)
        }
    }
    if ($(this).scrollTop() >= ($('#works').offset().top - 500)) {
        $('#navbar>li>a[href="#works"]').parent('li').addClass('active').siblings('.active').removeClass('active');
        if (!$('#works .pro').hasClass('moveleft')) {
            var j = 0;
            var timer = setInterval(function () {
                $($('#works .pro')[j]).addClass('moveleft');
                j++;
                if (j >= $('#works .pro').length) {
                    clearInterval(timer);
                    timer = null;
                }
            }, 300)
        }
    }
    if ($(this).scrollTop() >= ($('#message').offset().top - 500)) {
        $('#navbar>li>a[href="#message"]').parent('li').addClass('active').siblings('.active').removeClass('active');
    }
});

// angular.module('MSG', ['ng']).controller('MSGBord', ['$scope', '$http', function ($scope, $http) {
//     $scope.loading = '加载中...';
//     $scope.msgs = [];
//     $scope.i = 0;

//     function getMsg(i) {
//         $http.get('getmsg.php?pageNum=' + i).success(function (msgs) {
//             if (msgs) {
//                 $scope.loading = '加载更多...';
//                 $scope.msgs = $scope.msgs.concat(msgs.data);
//             } else {
//                 $scope.loading = '没有啦';
//             }
//         })
//     }
//     getMsg(0);
//     $scope.getMSG = function (i) {
//         i++;
//         $scope.loading = '加载中...';
//         $scope.i++;
//         getMsg(i);
//     };
//     $scope.submit = function () {
//         var nickname = $scope.nickname;
//         var content = $scope.content;

//         if (!nickname || !content) {
//             $scope.hasContent = true;
//         } else {
//             $scope.hasContent = false;
//             $http.post('addmsg.php', {
//                 nickname: nickname,
//                 content: content
//             }).success(function (data) {
//                 if (data == 'success') {
//                     $scope.content = '';
//                     var msg = {
//                         nickname: nickname,
//                         content: content,
//                         date: new Date().getTime() / 1000
//                     };
//                     $scope.msgs.unshift(msg);
//                     $scope.$watch($scope.msgs, function () {
//                         $('dl:first-child').addClass('show');
//                     })
//                 }
//             })
//         }
//     }
// }])