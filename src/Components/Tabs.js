
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
 
export default function BasicTabs(props) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className='Tabs'>
                <Tabs value={value} onChange={handleChange} className='py-3' aria-label="basic tabs example">
                    <Tab label={props.tab1} />
                    <Tab label={props.tab2} />
                    <Tab label={props.tab3} />
                    <Tab label={props.tab4} />
                    <Tab label={props.tab5} />
                    <Tab label={props.tab6} />
                    <Tab label={props.tab7} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    {props.tab1Details}
                </TabPanel>
                <TabPanel value={value} index={1}>
                    {props.tab2}
                </TabPanel>
                <TabPanel value={value} index={2}>
                    {props.tab3}
                </TabPanel>
                <TabPanel value={value} index={3}>
                    {props.tab4}
                </TabPanel>
                <TabPanel value={value} index={4}>
                    {props.tab5}
                </TabPanel>
                <TabPanel value={value} index={5}>
                    {props.tab6}
                </TabPanel>
                <TabPanel value={value} index={6}>
                    {props.tab7}
                </TabPanel>
            </div>
        </>
    );
}