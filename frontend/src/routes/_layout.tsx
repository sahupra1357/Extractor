import { Spinner } from "@chakra-ui/react"
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router"

import useAuth, { isLoggedIn } from "../hooks/useAuth"
import WithSubnavigation from "../components/Common/WithSubnavigation"

export const Route = createFileRoute("/_layout")({
  component: Layout,
  beforeLoad: async () => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
      })
    }
  },
})

function Layout() {
  console.log("Layout")
  const { isLoading } = useAuth()

  return (
    <>
    <WithSubnavigation />
    {isLoading ? (
      <Spinner size="xl" color="ui.main" />
    ) : (
    <Outlet />
    )}
    </>
    // <Flex maxW="large" h="auto" position="relative" >
    //   <Sidebar />
    //   {isLoading ? (
    //     <Flex justify="center" align="center" height="100vh" width="full">
    //       <Spinner size="xl" color="ui.main" />
    //     </Flex>
    //   ) : (
    //     <Outlet />
    //   )}
    //   <UserMenu />
    // </Flex>
  )
}
