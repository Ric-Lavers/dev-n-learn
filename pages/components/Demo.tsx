//@ts-nocheck

import React, { useState, useCallback, useMemo, memo, useContext } from "react"
/**
 * demostrate some uses of useState, and memoisation, and introduce the react profiler
 */

const getLocalTime = () => new Date().toLocaleTimeString()

const Context = React.createContext({
  title: "Parent",
})

export const Demo = () => {
  const [list, s_list] = useState([1, 2, 3])
  const [title, s_title] = useState("Parent")

  const add = useCallback(() => {
    s_list((prevList) => [...prevList, prevList.length + 1])
  }, [s_list])

  const reset = useCallback(
    function () {
      s_list([])
    },
    [s_list]
  )

  const currentTime = useMemo(getLocalTime, [])
  //

  // new Date().toLocaleTimeString(), [])

  return (
    <Context.Provider value={{ title, list }}>
      <Header />
      <input
        onChange={({ target: { value } }) => s_title(value)}
        value={title}
      />

      <h2>{title}</h2>
      <SideBarData />
      <Parent list={list} add={add} reset={reset} currentTime={currentTime} />
      <Footer />
    </Context.Provider>
  )
}

const Header = memo(() => {
  return (
    <header style={{ border: "1px solid pink", width: "100%" }}>Header</header>
  )
})

const Footer = memo(() => {
  return (
    <footer style={{ border: "1px solid orange", width: "100%" }}>
      Footer
    </footer>
  )
})
const SideBar = memo(({ title }) => {
  console.log("rendering side bar")
  return (
    <aside style={{ border: "1px solid lime", height: "50vh" }}>
      SideBar - {title}
    </aside>
  )
})

const withTitleData = (Component) => () => {
  const { title } = useContext(Context)

  return <Component {...{ title }} />
}

const SideBarData = withTitleData(SideBar)

const Parent: React.FC<{ title: string }> = memo(
  ({ children, list, add, reset, currentTime }) => {
    const { title } = useContext(Context)
    return (
      <div style={{ padding: 4, border: "1px solid orange" }}>
        <button onClick={add}>add</button>
        <button onClick={reset}>reset</button>
        <p>{title}</p>
        <div style={{ padding: 4, border: "1px solid lime" }}>
          {list.map((itm) => (
            <Child />
          ))}
        </div>
        <date>{currentTime}</date>
      </div>
    )
  }
  // (oldProps, newProps) => {
  //   return true
  //   console.log({ oldProps, newProps })
  //   return false
  // }
)

const Child: React.FC = () => {
  return (
    <div style={{ padding: 4, border: "1px solid pink" }}>
      <h2>Child</h2>
    </div>
  )
}
