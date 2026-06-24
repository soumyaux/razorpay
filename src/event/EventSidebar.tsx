import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Divider,
  Link,
  Text,
  HashIcon,
} from '@razorpay/blade/components'
import banner from '../assets/banner.jpg'
import edgeLogo from '../assets/razorpay-logo.jpeg'
import saurabh from '../assets/saurabh.avif'
import premika from '../assets/premika.avif'
import ankit from '../assets/ankit.avif'

const hosts = [
  { name: 'Saurabh Soni', img: saurabh },
  { name: 'Premika Manikandan', img: premika },
  { name: 'Ankit Punia', img: ankit },
]
const goingNames = ['Ashutosh Jha', 'S Ankit Gupta', 'Rahul Verma', 'Neha Singh', 'Karan Mehta']

export function EventSidebar() {
  return (
    <Box display="flex" flexDirection="column" gap="spacing.6">
      {/* Cover */}
      <Box borderRadius="large" overflow="hidden" width="100%" elevation="lowRaised">
        <img src={banner} alt="AI x Design Meetup" style={{ width: '100%', display: 'block' }} />
      </Box>

      {/* Presented by */}
      <Box display="flex" flexDirection="column" gap="spacing.3">
        <Text size="small" color="surface.text.gray.muted">
          Presented by
        </Text>
        <Box display="flex" alignItems="center" gap="spacing.3">
          <Avatar size="small" variant="square" src={edgeLogo} name="Razorpay Edge" />
          <Text weight="semibold" color="surface.text.gray.normal">
            Razorpay Edge — AI Builders Community
          </Text>
        </Box>
        <Text size="small" color="surface.text.gray.muted" truncateAfterLines={3}>
          Razorpay Edge is a curated community for product managers, builders, and designers shaping
          the future of AI. We bring together people building at the frontier.
        </Text>
      </Box>

      <Divider />

      {/* Hosted by */}
      <Box display="flex" flexDirection="column" gap="spacing.4">
        <Text size="small" color="surface.text.gray.muted">
          Hosted By
        </Text>
        {hosts.map((host) => (
          <Box key={host.name} display="flex" alignItems="center" gap="spacing.3">
            <Avatar size="small" name={host.name} src={host.img} />
            <Text color="surface.text.gray.normal">{host.name}</Text>
          </Box>
        ))}
      </Box>

      {/* Going */}
      <Box display="flex" flexDirection="column" gap="spacing.3">
        <Text size="small" color="surface.text.gray.muted">
          64 Going
        </Text>
        <AvatarGroup size="small">
          {goingNames.map((name) => (
            <Avatar
              key={name}
              name={name}
              src={`https://i.pravatar.cc/120?u=${encodeURIComponent(name)}`}
            />
          ))}
        </AvatarGroup>
        <Text size="small" color="surface.text.gray.subtle">
          Ashutosh Jha, S Ankit Gupta and 62 others
        </Text>
      </Box>

      <Divider />

      {/* Meta links + tag */}
      <Box display="flex" flexDirection="column" gap="spacing.3" alignItems="flex-start">
        <Link href="#" color="neutral">
          Contact the Host
        </Link>
        <Link href="#" color="neutral">
          Report Event
        </Link>
        <Box marginTop="spacing.2">
          <Badge icon={HashIcon} color="neutral">
            AI
          </Badge>
        </Box>
      </Box>
    </Box>
  )
}
