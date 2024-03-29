import {FBIcon, GithubIcon} from "./icons"

export const SITE_NAME = "年年有魚"
export const SITE_TITLE = `${SITE_NAME} - 來看魚啊`
export const SITE_DESCRIPTION = `${SITE_NAME}是一個熱愛推廣台灣原生魚類/水族/環境的組織，希望大家一起來認識台灣魚類，推動台灣溪河海洋生態永續！🐟`
export const ORGANIZATION = "水生生態文化"
export const EMAIL = "fromwatertw@gmail.com" //"taiwanfishfish@gmail.com"
export const SUBSCRIPTION_URL = "http://eepurl.com/iMaab-/"

export const P5_PLAYGROUND_ID = "P5-playground"
export const HEADER_HEIGHT = 64
export const TOC_WIDTH = 40

// TODO: 魚傳媒/魚博館/魚美館
export const ROUTES = [
  {
    title: "影音",
    path: "/videos"
  },
  {
    title: "專題",
    path: "/topics"
  },
  {
    title: "文章",
    path: "/posts"
  },
  {
    title: "魚地圖",
    path: "/map"
  },
  {
    title: "數位保種(3D)",
    path: "/models"
  },
  {
    title: "關於我們",
    path: "/about"
  }
]

export const ROUTE_HEADER = ROUTES.slice(0, 5)
export const ROUTE_VIDEO = ROUTES[0]
export const ROUTE_TOPIC = ROUTES[1]
export const ROUTE_POST = ROUTES[2]
export const ROUTE_ABOUT = ROUTES[5]

export const SOCIAL_MEDIA = [
  {
    icon: FBIcon,
    url: "https://www.facebook.com/profile.php?id=100094751035273"
  },
  /*
  {
    icon: IGIcon,
    url: '',
  },
  */
  {
    icon: GithubIcon,
    url: "https://github.com/duidae/taiwan-fish-fish-fe"
  }
]

export enum Direction {
  LEFT = "left",
  RIGHT = "right"
}
