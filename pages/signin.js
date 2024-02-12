import { useRouter } from "next/router"
import { useState } from "react"
import Layout from "../components/layout"
import styles from "../styles/styles.module.css"

export default function SignIn() {
  const router = useRouter()

  const [state, setState] = useState({
    email: "",
    password: ""
  })

  function handleChange(e) {
    const copy = { ...state }
    copy[e.target.name] = e.target.value
    setState(copy)
  }

  async function handleSubmit() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/authenticate`, {
      method: "POST",
      body: JSON.stringify(state),
      headers: {
        "Content-Type": "application/json"
      }
    })
    if (res.ok) {
      const json = await res.json()
      localStorage.setItem("token", json.access_token)
      router.push("/user")
      console.log("token: ", json.access_token)
    } else {
      alert("Bad credentials")
    }
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign In</h1>
        <div className={styles.form}>
          <input className={styles.input} type="text" name="email" placeholder="email" value={state.email} onChange={handleChange} autoComplete="off" />
          <input className={styles.input} type="password" name="password" placeholder="password" value={state.password} onChange={handleChange} />
          <button className={styles.btn} onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </Layout>
  )
}