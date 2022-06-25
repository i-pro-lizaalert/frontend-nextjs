import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Router from 'next/router'
import {useEffect} from 'react'

export default function Home() {
  useEffect(() => {
    const {pathname} = Router
    if(pathname == '/' ){
      Router.push('/login')
    }
  });
  return (
    <div></div>
  )
}
