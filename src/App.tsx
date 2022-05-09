import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './App.css'
import Side from '@components/Side'
import Cloud from '@components/Cloud'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Post from '@/pages/Post'

const ZeroRoutes = () => {
  const location = useLocation()
  return (
    <SwitchTransition mode="out-in">
      <CSSTransition
        key={location.pathname}
        classNames="fade-in"
        appear
        in
        addEndListener={(node, done) => node.addEventListener('transitionend', done, false)}
      >
        <Routes location={location}>
          <Route path={'/'} element={<Home />} />
          <Route path={'/about'} element={<About />} />
          <Route path={'/post/:num'} element={<Post />} />
        </Routes>
      </CSSTransition>
    </SwitchTransition>
  )
}

const App = () => {
  return (
    <div className="app">
      <Cloud />
      <Side />
      <ZeroRoutes />
    </div>
  )
}
export default App
