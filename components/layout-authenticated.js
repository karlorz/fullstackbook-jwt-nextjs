import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import styles from '../styles/layout.module.css'

export default function LayoutAuthenticated(props) {
  const [profile, setProfile] = useState()
  const router = useRouter()

  useEffect(() => {
    fetchProfile()
  }, [])

  async function fetchProfile() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/demo-controller`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
      },
      cache: 'no-store', // Add this line to disable caching
    })
    if (res.ok) {
      // const json = await res.json()
      // setProfile(json)
      const json = await res.text();
      setProfile({ username: json });
    } else {
      router.push("/signin")
    }
  }

  function logout() {
    localStorage.removeItem("token")
    router.push("/")
  }

  return (
    <div className={styles.layout}>
      <div className={styles.nav}>
        <p>Signed in as: {profile && profile.username}</p>
        <p><button onClick={logout}>Log out</button></p>
      </div>
      {props.children}
    </div>
  )
}