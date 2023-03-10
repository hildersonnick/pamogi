// material-ui
import { alpha } from '@mui/material/styles';

const CustomShadows = (theme) => ({
    button: `0 2px #0000000b`,
    text: `0 -1px 0 rgb(0 0 0 / 12%)`,
    z1: `0px 2px 8px ${alpha(theme.palette.grey[900], 0.75)}`,
    z2: `0px 2px 8px ${alpha(theme.palette.grey[900], 0.3)}`
});

export default CustomShadows;
