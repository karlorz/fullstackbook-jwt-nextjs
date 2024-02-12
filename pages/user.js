import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import LayoutAuthenticated from "../components/layout-authenticated"
import styles from "../styles/styles.module.css"

export default function User() {
  const [content, setContent] = useState(null)
  const router = useRouter()

  useEffect(() => {
    fetchContent()
  }, [])


  async function fetchContent() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/demo-controller`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      cache: 'no-store', // Add this line to disable caching
    })
    console.log("load token: ", localStorage.getItem("token"))
    if (res.ok) {
      const text = await res.text()
      setContent(text)
    }
  }

  return (
    <LayoutAuthenticated>
      <div className={styles.container}>
        <h1 className={styles.title}>User</h1>
        {content && (
          <p>{content}</p>
        )}
      </div>
    </LayoutAuthenticated>
  )
}