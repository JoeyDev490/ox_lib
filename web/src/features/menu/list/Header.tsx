import { Box, createStyles, Text } from '@mantine/core';
import React from 'react';

const useStyles = createStyles(() => ({
  container: {
    position: 'relative',
    textAlign: 'center',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    backgroundColor: 'rgb(0, 0, 0, 0.7)',
    height: 120,
    width: 384,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgb(255, 0, 0)',
    fontWeight: 500,
    fontFamily: 'Poppins',
    overflow: 'hidden', 
  },
  image: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '96%',
    height: '90%', 
    objectFit: 'cover',
    transform: 'translate(-50%, -50%)',
    borderRadius: '5px',
    zIndex: 1,
  },
  heading: {
    position: 'relative',
    zIndex: 2,
    fontSize: 24,
    textTransform: 'uppercase',
    fontWeight: 500,
  },
}));

const Header: React.FC<{ title: string }> = ({ title }) => {
  const { classes } = useStyles();

  return (
    <Box className={classes.container}>
      <img src="https://r2.fivemanage.com/eJuQaZlWXYvPBKVnrGAQq/images/Banner1.png" alt="header" className={classes.image} />
      <Text className={classes.heading}>{title}</Text>
    </Box>
  );
};

export default React.memo(Header);
