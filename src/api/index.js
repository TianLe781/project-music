import requests from './ajax';
// 获取Banner图片
export const reqBanner = () => requests({ url: '/banner', method: 'get' });
// 获取热门歌单
export const reqSongListHot = () => requests({ url: '/top/playlist?limit=6', method: 'get' });
// 获取精品歌单
export const reqSongListBoutique = () => requests({ url: '/top/playlist/highquality?limit=6', method: 'get' });
//获取歌单详情
export const reqSongListInfo = (id) => requests({ url: `/playlist/detail?id=${id}`, method: 'get' });
//获取歌单里的歌曲
export const reqSongs = (id) => requests({ url: `/playlist/track/all?id=${id}&limit=20`, method: 'get' });
//获取歌曲url
export const reqSongUrl = (id) => requests({ url: `/song/url?id=${id}`, method: 'get' });
//获取音乐是否可用
export const reqCheck = (id) => requests({ url: `/check/music?id=${id}`, method: 'get' });
//获取歌曲详情
export const reqSongInfo = (ids) => requests({ url: `/song/detail?ids=${ids}`, method: 'get' });
//获取歌曲歌词
export const reqSongLyric = (id) => requests({ url: `/lyric?id=${id}`, method: 'get' });