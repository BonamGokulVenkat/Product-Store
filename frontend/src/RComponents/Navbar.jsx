import { Button, Container, Flex, HStack, Text ,} from '@chakra-ui/react'
import { useColorMode, useColorModeValue } from "@/components/ui/color-mode"
import React from 'react'
import { Link } from 'react-router-dom'
import { CiSquarePlus } from "react-icons/ci";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

function Navbar() {
    const { toggleColorMode } = useColorMode();
  return (
    <>
        <Container  maxW={"1140px"} px={4} bg={useColorModeValue("gray.100","gray.900")}>
            <Flex
                 h={16}
                 alignItems={"center"}
                 justifyContent={"space-between"}
                 flexDir={{
                     base: "column",
                     sm: "row",
                 }}           
            >
                <Text 
                    fontSize={{ base: "22", sm: "28" }}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    textAlign={"center"}
                    bgGradient={"linear(to-r, cyan.400, blue.500)"}
                    //bgClip={"text"}
                >
                    <Link to={"/"}>Product Store</Link>
                </Text>
                <HStack spacing={2} alignItems={"center"}>
                    <Link to={"/create"}>
                        <Button><CiSquarePlus fontSize={20}/></Button>
                    </Link>
                    <Button onClick={toggleColorMode}>
						{useColorModeValue === "light" ? <IoMoon /> : <LuSun size='20' />}
					</Button>
                </HStack>
            </Flex>
        </Container>
    </>
  )
}

export default Navbar