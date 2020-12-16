import React, { useContext } from "react";
import { NextPage } from "next";
import { Box, Text } from "rebass";
import { authContext } from "../services/auth";

interface SignOutModuleProps {}

export const SignOutModule: NextPage<SignOutModuleProps> = ({}) => {
    const {signout} = useContext(authContext)
  return (
    <Box>
      <Text onClick={() => signout}>Sign Out?</Text>
    </Box>
  );
};

export default SignOutModule;
