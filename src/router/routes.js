//引入组件

import Home from '@/pages/Home'
import Search from '@/pages/Sreach'
import MusicLib from '@/pages/MusicLib'

export default [{
        //主页
        path: '/home',
        component: Home,
    },
    {
        //搜索
        path: '/search/:keyword?',
        component: Search,
        meta: {
            isShowSearch: true,
        }
    },
    {
        //音乐库
        path: '/musiclib',
        component: MusicLib,
    },
    {
        //我的歌单
        path: '/myorder',
        component: () =>
            import ('@/pages/MyOrder')
    },
    {
        //喜欢的音乐
        path: '/lovemusic',
        component: () =>
            import ('@/pages/LoveMusic')
    },
    {
        //歌单详情页
        path: '/playlistinfo',
        component: () =>
            import ('@/pages/PlayListsInfo')
    },
    {
        //全屏歌词页
        path: '/fullscreen',
        component: () =>
            import ('@/pages/FullScreen')
    }, {
        path: '/',
        redirect: '/home',
    },
]