import React from 'react'
import { Alert } from 'reactstrap'
import { useSelector } from 'react-redux'
import './HomePage.css'
import Login from './Login'
import { ReactComponent as SvgSocial } from '../images/undraw_social_share_algy.svg'

const Notification = ({ notify }) => {
  if (!notify.msg || notify.type !== ('auth-homepage' || 'blog')) return null

  return (
    <Alert id="notify-homepage" color={notify.color}>
      {notify.msg}
    </Alert>
  )
}

export default function HomePage() {
  const notify = useSelector((state) => state.notify)
  return (
    <div>
      <h3 id="homepage-title">Welcome to BlogList</h3>
      <div id="homepage-content">
        <Notification {...{ notify }} />
        <SvgSocial id="svg-social" />
        <h5 id="homepage-text">
          A place to share and rate blogs and articles with your friends!
        </h5>
        <Login id="auth-container" />
      </div>
    </div>
  )
}
