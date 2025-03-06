import { useNuiEvent } from '../../hooks/useNuiEvent';
import { toast, Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactMarkdown from 'react-markdown';
import { Avatar, createStyles, Group, Stack, Box, Text, keyframes, Sx } from '@mantine/core';
import React from 'react';
import type { NotificationProps } from '../../typings';

const useStyles = createStyles((theme) => ({
  container: {
    width: 300,
    height: 'fit-content',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: theme.colors.dark[0],
    padding: 12,
    borderRadius: '5px',
    fontFamily: 'Poppins',
    boxShadow: 'rgba(0, 0, 0, 0.6) 0px 5px 15px',
  },
  container2: {
    width: 277,
    height: 4,
    borderRadius: theme.radius.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
    marginTop: '0.8vh',
  },
  title: {
    fontWeight: 600,
    lineHeight: 'normal',
  },
  description: {
    fontSize: 12,
    color: 'rgb(255, 255, 255)',
    fontFamily: 'Poppins',
    lineHeight: 'normal',
  },
  descriptionOnly: {
    fontSize: 14,
    color: 'rgb(255, 255, 255)',
    fontFamily: 'Poppins',
    lineHeight: 'normal',
  },
  bar: {
    height: '100%',
    backgroundColor: 'rgb(200, 0, 0)',
  },
}));

// I hate this
const enterAnimationTop = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(-30px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
});

const enterAnimationBottom = keyframes({
  from: {
    opacity: 0,
    transform: 'translateY(30px)',
  },
  to: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
});

const exitAnimationTop = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
});

const exitAnimationRight = keyframes({
  from: {
    opacity: 1,
    transform: 'translateX(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateX(100%)',
  },
});

const exitAnimationLeft = keyframes({
  from: {
    opacity: 1,
    transform: 'translateX(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateX(-100%)',
  },
});

const exitAnimationBottom = keyframes({
  from: {
    opacity: 1,
    transform: 'translateY(0px)',
  },
  to: {
    opacity: 0,
    transform: 'translateY(100%)',
  },
});

const Notifications: React.FC = () => {
  const { classes } = useStyles();

  useNuiEvent<NotificationProps>('notify', (data) => {
    if (!data.title && !data.description) return;
    // Backwards compat with old notifications
    let position = data.position;
    switch (position) {
      case 'top':
        position = 'top-center';
        break;
      case 'bottom':
        position = 'bottom-center';
        break;
    }
    if (!data.icon) {
      switch (data.type) {
        case 'error':
          data.icon = 'circle-xmark';
          break;
        case 'success':
          data.icon = 'circle-check';
          break;
        case 'warning':
          data.icon = 'circle-exclamation';
          break;
        default:
          data.icon = 'circle-info';
          break;
      }
    }
    toast.custom(
      (t) => (
        <Box
          sx={{
            animation: t.visible
              ? `${position?.includes('bottom') ? enterAnimationBottom : enterAnimationTop} 0.2s ease-out forwards`
              : `${
                  position?.includes('right')
                    ? exitAnimationRight
                    : position?.includes('left')
                    ? exitAnimationLeft
                    : position === 'top-center'
                    ? exitAnimationTop
                    : position
                    ? exitAnimationBottom
                    : exitAnimationRight
                } 0.4s ease-in forwards`,
            ...data.style,
          }}
          className={`${classes.container}`}
        >
          <Group noWrap spacing={12}>
            {data.icon && (
              <>
                {!data.iconColor ? (
                  <Avatar
                    color={
                      data.type === 'error'
                        ? 'red'
                        : data.type === 'success'
                        ? 'teal'
                        : data.type === 'warning'
                        ? 'yellow'
                        : 'blue'
                    }
                    radius="xl"
                    size={32}
                  >
                    <FontAwesomeIcon icon={data.icon} fixedWidth size="lg" />
                  </Avatar>
                ) : (
                  <FontAwesomeIcon icon={data.icon} style={{ color: data.iconColor }} fixedWidth size="lg" />
                )}
              </>
            )}
            <Stack spacing={0}>
              {data.title && <Text className={classes.title}>{data.title}</Text>}
              {data.description && (
                <ReactMarkdown className={`${!data.title ? classes.descriptionOnly : classes.description} description`}>
                  {data.description}
                </ReactMarkdown>
              )}
            </Stack>
          </Group>

          <Box className={classes.container2}>
            <Box
              className={classes.bar}
              sx={{
                animation: 'progress-bar linear',
                animationDuration: `${data.duration || 3000}ms`,
              }}
            >
            </Box>
          </Box>
        </Box>
      ),
      {
        id: data.id?.toString(),
        duration: 3000,
        position: position || 'top-right',
      }
    );
  });

  return <Toaster />;
};

export default Notifications;
