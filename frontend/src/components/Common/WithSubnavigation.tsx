'use client'

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useDisclosure,
  Image,
  Link as ChakraLink
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'

import { isLoggedIn } from "../../hooks/useAuth"
import {Link as RouterLink} from '@tanstack/react-router'
import UserMenu from './UserMenu'
import Logo from "/assets/images/mnsAI_2.png"

export default function WithSubnavigation() {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Box 
    // css={{
    // "& *": {
    //   border: "2px solid",
    //   borderColor: "blue.500",
    // },
    // }}
    >
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}
        //  w="60"
        //   maxW="full"
          px={4}
          mr={{ base: 0, xl: 12 }}
          >
          {/* <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            Logo
          </Text> */}
          <ChakraLink as={RouterLink} to="/">
          <Image
            src={Logo}
            alt="mnsAI logo"
            width={140}
            height={50}
            // height="auto"
            // maxW="2xs"
            alignSelf="center"
            // mb={4}
          />          
          </ChakraLink>
          <Flex display={{ base: 'none', md: 'flex' }} ml={10}
          w="full"
          alignItems="center"
          // justifyContent="space-between"
          justify="center"
          px={4}
          >
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>
          {isLoggedIn() ? (<UserMenu />) : (<><Button as={'a'} fontSize={'sm'} color={'ui.main'} 
          fontWeight={600} 
          //variant={'link'} 
          href={'/login'}
          _hover={{
            //bg: 'pink.300',
            bg: "#00766C",
            color:'white'
        }}>
            Sign In
          </Button><Button
            as={'a'}
            display={{ base: 'none', md: 'inline-flex' }}
            fontSize={'sm'}
            fontWeight={600}
            color={'ui.main'} 
            //color={'white'}
            //bg={'pink.400'}
            //bg={"ui.main"}
            href={'/signup'}
            _hover={{
              //bg: 'pink.300',
              bg: "#00766C",
              color:'white'
            }}>
              Sign Up
            </Button></>)}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = () => {
  //const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkColor = useColorModeValue('ui.main', 'gray.200')
  const linkHoverColor = useColorModeValue("#00766C", 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}>
                {navItem.label}
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                color={linkColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            //_groupHover={{ color: 'pink.400' }}
            _groupHover={{ color: "#00766C" }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          {/* <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} /> */}
          <Icon color={"ui.main"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Product',
    children: [
      {
        label: 'Dashboard',
        subLabel: 'Trending Design to inspire you',
        href: "/Dashboard",
      },
      {
        label: 'Items',
        subLabel: 'Up-and-coming Designers',
        href: '/items',
      },
    ],
  },
  {
    label: 'Solutions',
    children: [
      {
        label: 'User Settings',
        subLabel: 'Find your dream design job',
        href: '/settings',
      },
      {
        label: 'Data Extraction',
        subLabel: 'An exclusive list for contract work',
        href: '/Extractor',
      },
    ],
  },
  {
    label: 'Respurces',
    href: '#',
  },
  {
    label: 'Pricing',
    href: '#',
  },
]