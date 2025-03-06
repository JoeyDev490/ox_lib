import { Checkbox, createStyles } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'rgb(200, 0, 0, 0.7)',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.7)',
    border: 'none',
    '&:checked': { backgroundColor: 'rgb(150, 0, 0, 0.8)', borderColor: theme.colors.dark[2] },
  },
  inner: {
    '> svg > path': {
      fill: 'rgb(255, 255, 255)',
    },
  },
}));

const CustomCheckbox: React.FC<{ checked: boolean }> = ({ checked }) => {
  const { classes } = useStyles();
  return (
    <Checkbox
      checked={checked}
      size="md"
      classNames={{ root: classes.root, input: classes.input, inner: classes.inner }}
    />
  );
};

export default CustomCheckbox;
