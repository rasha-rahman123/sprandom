import React from 'react'
import {NextPage} from 'next'
import Layout from '../components/Layout';
import { Box, Text } from 'rebass';

interface topProps {

}

export const top: NextPage<topProps> = ({}) => {
        return    <Layout>
        <Box>
            <Text color="yellowText" fontSize={60}>Coming Soon</Text>
        </Box>
    </Layout>;
}

export default top;