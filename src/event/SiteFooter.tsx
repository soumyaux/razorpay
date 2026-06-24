import {
  Box,
  Divider,
  IconButton,
  Link,
  InstagramIcon,
  TwitterIcon,
  MailIcon,
} from '@razorpay/blade/components'
import lumaLogo from '../assets/luma-logo.png'

export function SiteFooter() {
  return (
    <Box
      as="footer"
      width="100%"
      paddingX={{ base: 'spacing.5', l: 'spacing.7' }}
      paddingBottom="spacing.8"
    >
      <Box maxWidth="1180px" marginX="auto" width="100%">
        <Divider marginBottom="spacing.5" />
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          gap="spacing.5"
          flexWrap="wrap"
        >
          <Box display="flex" alignItems="center" gap="spacing.5">
            <Box width="spacing.6" height="spacing.6" borderRadius="medium" overflow="hidden">
              <img
                src={lumaLogo}
                alt="Luma"
                style={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
              />
            </Box>
            <Link href="#" color="neutral" size="small">
              Discover
            </Link>
            <Link href="#" color="neutral" size="small">
              Pricing
            </Link>
            <Link href="#" color="neutral" size="small">
              Help
            </Link>
          </Box>
          <Box display="flex" alignItems="center" gap="spacing.2">
            <IconButton
              icon={InstagramIcon}
              size="medium"
              emphasis="subtle"
              accessibilityLabel="Instagram"
              onClick={() => {}}
            />
            <IconButton
              icon={TwitterIcon}
              size="medium"
              emphasis="subtle"
              accessibilityLabel="X (Twitter)"
              onClick={() => {}}
            />
            <IconButton
              icon={MailIcon}
              size="medium"
              emphasis="subtle"
              accessibilityLabel="Email"
              onClick={() => {}}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
