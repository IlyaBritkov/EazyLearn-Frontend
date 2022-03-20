import React from 'react';
import { Typography } from '@mui/material';
import { styled } from '@mui/styles';
import theme from '../../theme';
import isMobile from '../../utils/isMobile';

const HR = styled('div')({
    width: '100%',
    height: 1,
    background: theme.palette.primary.dark,
});

const ResultPage: React.FC <any> = ({ unknown, known }) => {
    const styles = {
        resultPage: {
            display: 'flex',
            flexDirection: 'column' as const,
            alignItems: 'center',
            width: isMobile ? 300 : 500,
            padding: isMobile ? '20px 15px' : '20px 50px',
            textAlign: 'center' as const,
            gap: 15,
            border: `1px solid ${theme.palette.primary.dark}`,
            borderRadius: 10,
        },
        typo: {
            color: theme.palette.primary.dark,
            fontWeight: 500,
            textDecoration: 'none',
            fontSize: isMobile ? 16 : 20,
        },
    };
    return (
        <div style={styles.resultPage}>
            <Typography
                variant="h1" style={styles.typo}
            >Все выбранные карточки повторены
            </Typography>
            <HR />
            <div>
                <Typography style={{ fontSize: isMobile ? 14 : 16 }}>
                    Количество неизученных карточек:&nbsp;
                    <span style={{ color: theme.palette.primary.main }}>
                        {unknown}
                    </span>
                </Typography>
                <Typography style={{ fontSize: isMobile ? 14 : 16 }}>
                    Количество изученных карточек:&nbsp;
                    <span style={{ color: theme.palette.primary.main }}>
                        {known}
                    </span>
                </Typography>
            </div>
        </div>
    );
};

export default ResultPage;