'use client'
import dynamic from "next/dynamic";

import BookTimeline from './ChronoTimeline';
// const BookTimeline = dynamic(
//   () => import("./ChronoTimeline"),
//   { ssr: false }
//)

export default function index() {
  return <BookTimeline />
}