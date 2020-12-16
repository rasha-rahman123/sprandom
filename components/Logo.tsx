import React from 'react'
import {NextPage} from 'next'
import { Box, Text } from 'rebass';

interface LogoProps {
text: String;
}

export const Logo: NextPage<LogoProps> = ({text="Spotify Music Finder"}) => {
        return (<Box
        as={'a'}
        href="/"
            sx={{
              height: "25%",
              width: "100%",
              padding: "6px",
              display: "flex",
              flexDirection: "row",
              alignItems: 'center'
            }}
          >
            <Box
              sx={{
                width: 100,
                p: 3,
                bg: "lighterBg",
                alignItems: "center",
                textAlign: "center",
                justifyContent: "center",
                borderRadius: 16,
              }}
            >
              <Text
                sx={{ alignSelf: "center",fontWeight: "700" }}
              >
                SMF
              </Text>
            </Box>
            <Box sx={{ml: 3}}>
    
              <Text sx={{fontWeight: '700', fontSize: 32}}>{text}</Text>
            </Box>
          </Box>);
}

export default Logo;