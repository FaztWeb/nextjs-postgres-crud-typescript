import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { Button } from 'semantic-ui-react'

const Home: NextPage = () => {
  return (
    <div>
      <Button>
        Hello World
      </Button>
    </div>
  )
}

export default Home
