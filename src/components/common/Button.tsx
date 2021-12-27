import React from 'react';
import {
    Button as btn, ButtonProps, IconButton as IconBtn, IconButtonProps
} from '@mui/material';
import { styled } from '@mui/material/styles';
import theme from '../../theme';

export type Props = ButtonProps & IconButtonProps & {
    Icon?: string,
    startIcon?: string,
    endIcon?: string,
    IconStyles?: React.CSSProperties,
    IconStartStyles?: React.CSSProperties,
    IconEndStyles?: React.CSSProperties,
};

const MuiButton = styled(btn)({
    [theme.breakpoints.down('sm')]: {
        width: 270,
    },
    [theme.breakpoints.up('sm')]: {
        width: 430,
    },
});

const IconButton = styled(IconBtn)({
    // styles if neccessary
    padding: 5,
});

const Button = ({
    color,
    size,
    variant,
    Icon,
    IconStyles,
    startIcon,
    IconStartStyles,
    endIcon,
    IconEndStyles,
    className,
    children,
    ...extra
}: Props) => {
    if (Icon) {
        return (
            <IconButton {...extra}>
                <img
                    src={Icon} style={{
                        ...IconStyles, pointerEvents: 'none', minWidth: 23, minHeight: 23,
                    }} alt=""
                />
            </IconButton>
        );
    }
    return (
        <MuiButton
            size={size ?? 'small'}
            variant={variant ?? 'contained'}
            color={color ?? 'primary'}
            startIcon={<img src={startIcon} style={IconStartStyles} alt="" />}
            endIcon={<img src={endIcon} style={IconEndStyles} alt="" />}
            {...extra}
        >
            {children}
        </MuiButton>
    );
};
Button.defaultProps = {
    Icon: undefined,
    startIcon: undefined,
    endIcon: undefined,
    IconStyles: undefined,
    IconStartStyles: undefined,
    IconEndStyles: undefined,
};
export default Button;
