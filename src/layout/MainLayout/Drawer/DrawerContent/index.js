// project import
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { Button, Center } from '@mantine/core';
import { useNavigate } from 'react-router-dom';

// ==============================|| DRAWER CONTENT ||============================== //
// const DrawerContent = () => (

// );

function DrawerContent() {
    let navigate = useNavigate();
    return (
        <>
            <SimpleBar
                sx={{
                    '& .simplebar-content': {
                        display: 'flex',
                        flexDirection: 'column'
                    },
                    height: '100%'
                }}
            >
                <Navigation />
            </SimpleBar>
            {/* <Center>
                <Button style={{ width: '75%' }} onClick={() => navigate('/3d')} variant="light" color="violet" mb={15}>
                    Switch to 3D View
                </Button>
            </Center> */}
        </>
    );
}

export default DrawerContent;
