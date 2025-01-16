import { createFileRoute } from '@tanstack/react-router'

import { Box, Container, Text } from "@chakra-ui/react"


// import useAuth, { isLoggedIn } from "../hooks/useAuth"
import WithSubnavigation from "../components/Common/WithSubnavigation"

export const Route = createFileRoute('/')({
  component: WelcomePage
})

function WelcomePage() {
  console.log("root home page")
  // const { user: currentUser } = useAuth()
  // console.log("root home page isLoggedIn --> ", isLoggedIn)
  // console.log("root home page user --> ", currentUser)

  return (
    <>
      <Container maxW="full">
      <WithSubnavigation />
        <Box pt={12} m={4}>
          {/* <Text fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text> */}
          <Text>Welcome to the root Home page of mnsAI </Text>
        </Box>
      </Container>
    </>
  )
}