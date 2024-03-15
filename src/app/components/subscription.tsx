import Link from "next/link"
import {SUBSCRIPTION_URL} from "@/app/constant"

export const SubscribeBtn = () => {
  return (
    <Link href={SUBSCRIPTION_URL} target="_blank" rel="noopener noreferrer">
      訂閱
    </Link>
  )
}

// TODO: create mailchimp subscription form
export const SubscribeForm = () => {
  return null
}
