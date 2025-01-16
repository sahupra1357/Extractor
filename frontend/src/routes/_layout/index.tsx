import { Box, Container, Text } from "@chakra-ui/react"
import { createFileRoute } from "@tanstack/react-router"

import useAuth from "../../hooks/useAuth"

export const Route = createFileRoute("/_layout/")({
  component: HomePage,
})

function HomePage() {
  console.log("Dashboard")
  const { user: currentUser } = useAuth()

  return (
    <>
      <Container maxW="full">
        <Box pt={12} m={4}>
          <Text fontSize="2xl">
            Hi, {currentUser?.full_name || currentUser?.email} 👋🏼
          </Text>
          <Text>Welcome to the Home page of mnsAI</Text>
        </Box>
      </Container>
    </>
  )
}
