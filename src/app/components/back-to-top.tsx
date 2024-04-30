import Link from "next/link"
import {BACK_TO_TOP_ELEMENT_ID, Style} from "@/app/constant"
import {ArrowUp} from "@/app/assets/icons"
import styles from "./back-to-top.module.css"

export const BackToTop = () => {
  return (
    <Link
      href="#"
      id={BACK_TO_TOP_ELEMENT_ID}
      style={{
        backgroundColor: "var(--theme-blue)",
        transition: `visibility ${Style.DURATION}ms, opacity ${Style.DURATION}ms linear`
      }}
      className={`${styles["back-to-top"]} fixed right-0 bottom-0 flex items-center justify-center m-4 p-3 rounded-full`}
      title="到最上面"
      aria-label="到最上面"
    >
      {ArrowUp}
    </Link>
  )
}

export default BackToTop
