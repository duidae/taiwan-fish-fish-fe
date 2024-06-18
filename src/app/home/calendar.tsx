import {HEADER_HEIGHT, TOC_WIDTH} from "@/app/constant"

const paddingTop = 24

export const Calendar = () => {
  return (
    <div
      className="max-w-screen-2xl max-h-screen w-full h-screen flex flex-col justify-center items-center pb-10"
      style={{paddingTop: `${HEADER_HEIGHT + paddingTop}px`, paddingRight: `${TOC_WIDTH}px`, paddingLeft: `${TOC_WIDTH}px`}}
    >
      <div className="flex flex-row items-center gap-2">
        <h1>活動日曆</h1>
      </div>
      <iframe
        src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=Asia%2FTaipei&bgcolor=%23ffffff&src=ZnJvbXdhdGVydHdAZ21haWwuY29t&src=emgtdHcudGFpd2FuI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%23039BE5&color=%23F09300"
        style={{width: "100%", height: "100%"}}
      ></iframe>
    </div>
  )
}
