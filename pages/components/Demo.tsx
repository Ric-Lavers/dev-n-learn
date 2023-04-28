//@ts-nocheck

import React, { useState, memo } from "react"
/**
 * demostrate some uses of useState, and memoisation, and introduce the react profiler
 */

export const Demo = () => {
  const [list, s_list] = useState([1, 2, 3])
  const [title, s_title] = useState("Parent")

  const add = () => {
    s_list([...list, list.length + 1])
  }
  const reset = () => {
    s_list([])
  }

  return (
    <>
      <input
        onChange={({ target: { value } }) => s_title(value)}
        value={title}
      />
      <button onClick={add}>add</button>
      <button onClick={reset}>reset</button>

      <Parent list={list} />
    </>
  )
}

const Parent: React.FC<{ title: string }> = memo(
  ({ children, title, list }) => {
    return (
      <div style={{ padding: 4, border: "1px solid orange" }}>
        <h2>{title}</h2>
        <div style={{ padding: 4, border: "1px solid lime" }}>
          {list.map((itm) => (
            <Child />
          ))}
        </div>
      </div>
    )
  },
  (oldProps, newProps) => {
    return true
    console.log({ oldProps, newProps })
    return false
  }
)

const Child: React.FC = () => {
  return (
    <div style={{ padding: 4, border: "1px solid pink" }}>
      <h2>Child</h2>
    </div>
  )
}
