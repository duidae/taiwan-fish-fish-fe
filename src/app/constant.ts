import {FBIcon, GithubIcon} from "@/app/assets/icons"

export const SITE_NAME = "台灣阿魚" // "水生" "年年有魚"
export const SITE_TITLE = `${SITE_NAME} - 來看魚啊`
export const SITE_URL = "https://taiwan-fish-fish-fe.vercel.app/"
export const SITE_DESCRIPTION = `${SITE_NAME}是一個熱愛推廣台灣原生魚類/水族/環境的組織，希望大家一起來認識台灣魚類，推動台灣溪河海洋生態永續！🐟`
export const ORGANIZATION = "水生生態文化"
export const EMAIL = "fromwatertw@gmail.com"
export const COPYRIGHT = "Copyright © 2024"
export const SUBSCRIPTION_URL = "http://eepurl.com/iMaab-/"

export const P5_PLAYGROUND_ID = "P5-playground"
export const HEADER_HEIGHT = 64
export const TOC_WIDTH = 40
export const BACK_TO_TOP_ELEMENT_ID = "back-to-top"

// TODO: 魚傳媒/魚博館/魚美館
export const ROUTE_VIDEO = {
  title: "影音",
  path: "/videos"
}
export const ROUTE_TOPIC = {
  title: "專題",
  path: "/topics"
}
export const ROUTE_POST = {
  title: "文章",
  path: "/posts"
}
export const ROUTE_ABOUT = {
  title: `關於${SITE_NAME}`,
  path: "/about"
}
export const ROUTES = [
  {
    title: "台灣原生魚類3D圖鑑",
    path: "/models"
  },
  {
    title: "溪流與魚",
    path: "/map"
  },
  {
    title: "相關專案",
    children: [
      {
        title: "31屆臺大藝術季",
        path: "https://ntu-art-festival-31-cloudflare.duidae.workers.dev/",
        external: true
      },
      {
        title: "張萬傳網路美術館",
        path: "https://ann161778.wixsite.com/chang-wan-chuan", //"https://www.wan-chuan-chang.com/",
        external: true
      }
    ]
  }
  // ROUTE_ABOUT
]

export const ROUTE_HEADER = ROUTES.slice(0, 4)

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

export const DEFAULT_IMAGE_ASPECT_RATIO = "16/9"

export const Z_INDEX = {
  MIDDLE: "z-10",
  UPPER: "z-25",
  TOP: "z-50"
}

export const Style = {
  DURATION: 300
}

export const Color = {
  THEME: "blue-100",
  HOVER: "blue-200",
  BACKGROUND: "slate-200"
}
