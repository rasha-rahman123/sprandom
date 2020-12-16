import React from "react";
import { NextPage } from "next";
import { Box, Text } from "rebass";
import Logo from "./Logo";
import { useRouter } from "next/router";
import {BsPersonSquare} from 'react-icons/bs';
import {SiCodersrank, SiGooglesearchconsole} from 'react-icons/si';
interface LayoutProps {}

export const Layout: NextPage<LayoutProps> = ({ children }) => {
  const nav = [
    { text: "Your Finds", slug: "/", icon: <BsPersonSquare /> },
    { text: "Find Music", slug: "/find", icon: <SiGooglesearchconsole /> },
    { text: "Top Rated Finds", slug: "/top", icon: <SiCodersrank /> },
  ];

  const router = useRouter();
  return (
   <Box>
       <Box p={3} width="100vw" display={['block','block','none']}>
           <Logo />
         <Text sx={{color: 'yellowText', fontSize: 55, fontWeight: '600'}}>  Sorry! Must be on a device with a width bigger than your current device. Try a computer or tablet if you are on a phone right now.</Text>
       </Box>
        <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100vw",
        alignSelf: "center",
        padding: 24,
        display: ['none','none','flex']
      }}
    >
      <Box
        sx={{
          width: "22.5%",
          margin: 10,
          padding: 38,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Logo />
        <Box
          sx={{
            height: "25%",
            width: "25vw",
            alignItems: "flex-end",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {nav.map((x, i) => (
            <Box onClick={() => router.push(x.slug)}
              sx={{
                width: "20vw",
                margin: '0 35px',
                height: "30%",
                bg: router.asPath === x.slug && "text",
                my: 2,
                borderRadius: 32,
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                textAlign: 'left',
                padding: 3,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                position: 'relative',
                cursor: 'pointer',
                boxShadow: router.asPath === x.slug && '0px 0px 3px #181B1A',
                ":hover": {
                    bg: router.asPath !== x.slug && "#0000004e"
                },
                
              }}
            >
              <Text sx={{color: router.asPath === x.slug  ? 'orangeText' : 'text', fontSize: 18,fontWeight: '500'}}><Text sx={{display: 'inline', mr: 3}}>{x.icon}</Text>{x.text}</Text>
             {router.asPath === x.slug && <>
                <Box sx={{position: 'absolute', content: '""', right: -10, top: 30, width: 25, transform: 'rotate(30deg)', height: 25, bg: 'text', zIndex: -1, boxShadow: router.asPath === x.slug && '0 0 0px 5px #181B1A'}} />

             <Box sx={{position: 'absolute', content: '""', right: '5px', top: -44, width: 30, height: 40, border: router.asPath === x.slug && 'solid 10px #3E9D6F', bg: 'background',borderRadius: '25px', zIndex: -1, boxShadow: router.asPath === x.slug && '0 0 0px 5px #3E9D6F', }} />
              <Box sx={{position: 'absolute', content: '""', right: 0, top: -20, width: 20, height: 30, bg: '#181B1A',zIndex: -2}} />
              </>}
              <Box sx={{position: 'absolute', content: '""', right: 30, top: '-4px', width: 40, border: router.asPath === x.slug && 'solid 5px #181B1A', borderRadius: '25px', zIndex: -1, boxShadow: router.asPath === x.slug && '0 0 0px 5px #181B1A'}} />

              <Box sx={{position: 'absolute', content: '""', right: 100, top: '-2px', width: 40, border: router.asPath === x.slug && 'solid 5px #181B1A', borderRadius: '25px', zIndex: -1, boxShadow: router.asPath === x.slug && '0 0 0px 5px #181B1A'}} />

              <Box sx={{position: 'absolute', content: '""', right: 170, top: '0px', width: 40, border: router.asPath === x.slug && 'solid 5px #181B1A', borderRadius: '25px', zIndex: -1, boxShadow: router.asPath === x.slug && '0 0 0px 5px #181B1A'}} />

            </Box>
            
          ))}
        </Box>
        <Box sx={{ height: "50%", width: "100%" }}></Box>
      </Box>
      <Box
        sx={{
          width: "72.5%",
          margin: 10,
          bg: "text",
          height: "calc(97.5vh - 48px)",
          borderRadius: 48,
          padding: 68,
          boxShadow: '0px 0px 3px #181B1A,0px 0px 10px #181B1A20',
          overflowX: 'hidden',
          overflowY: 'scroll'
        }}
      >
        {children}
      </Box>
    </Box>
   </Box>
  );
};

export default Layout;
