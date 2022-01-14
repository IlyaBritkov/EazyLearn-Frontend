import React from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  childrenStyle?: React.CSSProperties;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
    const {
        children, value, index, childrenStyle, ...other
    } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <div style={childrenStyle}>{ children }</div>
            )}
        </div>
    );
};

TabPanel.defaultProps = {
    children: undefined,
    style: undefined,
    childrenStyle: undefined,
};

export default TabPanel;