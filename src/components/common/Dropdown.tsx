import React from 'react';
import { Popover as popover } from '@mui/material';
import { styled } from '@mui/styles';
import Button, { Props as ButtonProps } from './Button';

type Props = ButtonProps & {
    children: React.ReactNode | React.ReactNodeArray;
    onUnMount?: any;
};
interface OriginInterface {
    anchorOrigin?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'right';
    },
    transformOrigin?: {
        vertical: 'top' | 'bottom';
        horizontal: 'left' | 'right';
    },
}

const Dropdown = ({
    children, Icon, IconWrapperStyles, IconStyles, onUnMount,
}: Props) => {
    const Origin: OriginInterface = {
        anchorOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
        transformOrigin: {
            vertical: 'top',
            horizontal: 'left',
        },
    };

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [origin, setOrigin] = React.useState(Origin);
    const [cornerStyle, setCornerStyle] = React.useState({
        borderRadius: '10px',
    });

    const Popover = styled(popover)({
        '& .MuiPopover-paper': {
            borderRadius: cornerStyle.borderRadius,
        },
    });

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
        const { left, top } = event.currentTarget.getBoundingClientRect();
        const { height, width } = window.screen;
        const horizontal = width - left < left ? 'right' : 'left';
        const vertical = height - top < top ? 'bottom' : 'top';
        setOrigin({
            anchorOrigin: {
                vertical: height - top < top ? 'top' : 'bottom',
                horizontal: width - left < left ? 'left' : 'right',
            },
            transformOrigin: {
                vertical: height - top < top ? 'bottom' : 'top',
                horizontal: width - left < left ? 'right' : 'left',
            },
        });
        if (horizontal === 'left' && vertical === 'top') {
            setCornerStyle({
                borderRadius: '0 10px 10px 10px',
            });
        }
        if (horizontal === 'right' && vertical === 'top') {
            setCornerStyle({
                borderRadius: '10px 0 10px 10px',
            });
        }
        if (horizontal === 'left' && vertical === 'bottom') {
            setCornerStyle({
                borderRadius: '10px 10px 10px 0',
            });
        }
        if (horizontal === 'right' && vertical === 'bottom') {
            setCornerStyle({
                borderRadius: '10px 10px 0 10px',
            });
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
        onUnMount();
    };
    const isOpen = Boolean(anchorEl);

    return (
        <>
            <Button
                Icon={Icon}
                IconWrapperStyles={IconWrapperStyles}
                IconStyles={IconStyles}
                onClick={handleClick}
            />
            <Popover
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                {...origin}
            >
                {children}
            </Popover>
        </>
    );
};

Dropdown.defaultProps = {
    onUnMount: () => {},
};

export default Dropdown;