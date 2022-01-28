import React, { useRef } from 'react';
import { styled } from '@mui/styles';
import Modal from 'react-modal';
import Button, { Props as ButtonProps } from './Button';
import theme from '../../theme';

type Props = ButtonProps & {
    children: React.ReactNode | React.ReactNodeArray;
    onUnMount?: any;
};

const Dropdown = ({
    children, Icon, IconWrapperStyles, IconStyles, onUnMount,
}: Props) => {
    const popupRef = useRef(null);
    const [isOpen, setIsOpen] = React.useState(false);
    const [coords, setCoords] = React.useState({
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    });
    const [offsets, setOffsets] = React.useState({
        top: 0, left: 0,
    });
    const [cornerStyle, setCornerStyle] = React.useState('10px');

    const styles = {
        Popup: {
            overlay: {
                backgroundColor: 'transparent',
            },
            content: {
                zIndex: 9999,
                border: 'none',
                inset: 'unset',
                padding: 0,
                maxWidth: 620,
                background: 'rgba(252, 202, 194, 0.7)',
                backdropFilter: 'blur(20px)',
                borderRadius: cornerStyle,
                top: offsets.top,
                left: offsets.left,
                display: 'flex',
                flexDirection: 'column' as const,
            },
        },
    };

    const handleOpen = (e: any) => {
        const { height, width } = window.screen;
        const {
            top, left, right, bottom,
        } = coords;

        const offsetLeft = width - left < left
            ? left - e.contentEl.offsetWidth : right;
        const offsetTop = height - top + e.contentEl.offsetHeight < top
            ? top - e.contentEl.offsetHeight : bottom;

        setOffsets({
            top: offsetTop,
            left: offsetLeft,
        });

        const horizontal = width - left < left ? 'right' : 'left';
        const vertical = height - top + e.contentEl.offsetHeight < top ? 'bottom' : 'top';

        if (horizontal === 'left' && vertical === 'top') {
            setCornerStyle('0 10px 10px 10px');
        }
        if (horizontal === 'right' && vertical === 'top') {
            setCornerStyle('10px 0 10px 10px');
        }
        if (horizontal === 'left' && vertical === 'bottom') {
            setCornerStyle('10px 10px 10px 0');
        }
        if (horizontal === 'right' && vertical === 'bottom') {
            setCornerStyle('10px 10px 0 10px');
        }
    };
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsOpen(true);
        const {
            top, left, bottom, right,
        } = event.currentTarget.getBoundingClientRect();
        setCoords({
            top, left, bottom, right,
        });
    };

    const handleClose = () => {
        setIsOpen(false);
        onUnMount();
    };

    return (
        <>
            <Button
                Icon={Icon}
                IconWrapperStyles={IconWrapperStyles}
                IconStyles={IconStyles}
                onClick={handleClick}
            />
            <Modal
                ariaHideApp={false}
                ref={popupRef}
                isOpen={isOpen}
                onAfterOpen={handleOpen}
                onRequestClose={handleClose}
                portalClassName="popup-portal"
                className="popup-content"
                style={styles.Popup}
            >
                <div>{children}</div>
            </Modal>
        </>
    );
};

Dropdown.defaultProps = {
    onUnMount: () => {},
};

export default Dropdown;