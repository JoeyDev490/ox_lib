import { Box, createStyles, Text } from '@mantine/core';
import React from 'react';

const useStyles = createStyles(() => ({
  container: {
    position: 'relative', // enables absolute positioning for child elements
    textAlign: 'center',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    backgroundColor: 'rgb(0, 0, 0, 0.7)',
    height: 120,
    width: 384,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgb(255, 255, 255)',
    overflow: 'hidden', // ensure child elements don't overflow the container
  },
  image: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '96%', // slightly smaller than container width
    height: '90%', // slightly smaller than container height
    objectFit: 'cover',
    transform: 'translate(-50%, -50%)', // center the image
    borderRadius: '5px',
    zIndex: 1, // sits behind the text
  },
  heading: {
    position: 'relative', // establishes a stacking context above the image
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
      <img src="https://media.discordapp.net/attachments/1130545314890260553/1314363873318408333/1920x1080_All_Purpose_Banner_-_Atomic_RP.png?ex=67bafdff&is=67b9ac7f&hm=4a8e4b492c69f4a3c94fd216eba9d15b5ca70e364b3a58ee4edfabe614bcc991&=&format=webp&quality=lossless&width=1433&height=806" alt="header" className={classes.image} />
      <Text className={classes.heading}>{title}</Text>
    </Box>
  );
};

export default React.memo(Header);
