'use client'
import dynamic from "next/dynamic";
const BookNetwork = dynamic(
  () => import("./BookNetwork"),
  { ssr: false }
)

export default function Home() {
  return <BookNetwork />
}
