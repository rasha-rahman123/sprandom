import React, { useState } from 'react'
import {NextPage} from 'next'
import Router from 'next/router'
import firebase from 'firebase/app'
import 'firebase/auth';
import {useAuth, useProvideAuth} from '../services/auth'
import Layout from '../components/Layout';
import { Box, Card, Text, Button } from 'rebass';
import {Label,Input} from '@rebass/forms'
import Logo from '../components/Logo';



const provider = new firebase.auth.GoogleAuthProvider();

interface joinProps {

}

export const join: NextPage<joinProps> = ({}) => {
       const auth = useProvideAuth();
       const [email, setEmail] = useState();
       const [pass, setPass] = useState();
       const signIn = (email, pass) => {
           auth.signin(email,pass)
           .then(() => {
               Router.push('/')
           })
           .catch(err => {
               console.log(err.message)
           })
       }
        return (
         <Layout>
                <Box sx={{bg: 'yellowText'}}>
                <Logo text={'Sign In'}/>
         
                </Box>
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                <Box as={"form"} onSubmit={(e) => {
                    e.preventDefault();
                    signIn(email, pass);
                }} sx={{marginTop: 5}}>
                <Text color="orangeText" sx={{fontWeight: 600}}>Please Sign In</Text>
                <Box sx={{mt: 2}} ><Label>Username</Label> <Box sx={{bg: 'background', borderRadius: 20, mt: 10}}><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></Box></Box>
                <Box sx={{my: 2}} ><Label>Password</Label> <Box sx={{bg: 'background', borderRadius: 20, mt: 10}}><Input type="password" value={pass} onChange={(e) => setPass(e.target.value)} /></Box></Box>
                <Box><Button sx={{cursor: 'pointer'}} type="submit">Sign In</Button></Box>
                <Box><Text as="a" href="/signup" sx={{color: 'whitesmoke', opacity: 0.5, mt: 4, ":hover":{opacity: 1}}}>Click here to sign up instead</Text></Box>
                <Box><Text as="a" href="/find" sx={{color: 'orangeText', opacity: 0.8, m: 4, ":hover":{opacity: 1}}}>Click here to just use the generator without saving tracks.</Text></Box>
                </Box>
               
                </Box>
            </Layout>
        );
}

export default join;