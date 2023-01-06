import Head from 'next/head'
import { selectAuthState } from "../store/authSlice";
import { useEffect } from 'react';
import { checkLogin, setAuthState } from '../store/authSlice';
import { useSelector , useDispatch } from "react-redux"
import Main from '../components/main';
import LoginPage  from "../components/login"

export default function Home() {

  const authState = useSelector(selectAuthState)
  const dispatch = useDispatch()

  useEffect(() =>{

    const fetchStatus = async () =>{
      const res =  await checkLogin() 
      if (res.data?.status === true){
        dispatch(setAuthState(true)) 
      }
    }

    fetchStatus()
  })
  

  return (
    <>
      <Head>
        <title>HR SYSTEM</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="">
        {authState 
        ? <Main/> 
        : <LoginPage/>}
      </main>
    </>
  )
}

