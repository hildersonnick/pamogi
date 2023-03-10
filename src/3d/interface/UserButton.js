import { UnstyledButton, UnstyledButtonProps, Group, Avatar, Text, createStyles, Button, Center, Stack } from '@mantine/core';
// import { IconChevronRight } from "@tabler/icons";
import { useNavigate } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
    user: {
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
        color: theme.colorScheme === 'dark' ? theme.black : theme.black,

        '&:hover': {
            backgroundColor: theme.colorScheme === 'dark' ? 'rgba(47, 17, 56,0.1)' : 'rgba(47, 17, 56,0.1)'
        }
    }
}));

export function UserButton({ image, name, email, icon, ...others }) {
    const { classes } = useStyles();
    let navigate = useNavigate();

    return (
        <>
            {/* <Center> */}
            <Stack spacing={'xs'} align="center">
                <UnstyledButton className={classes.user} {...others}>
                    <Group>
                        <Avatar src={image} radius="xl" />

                        <div style={{ flex: 1 }}>
                            <Text color={'#2F1138'} size="sm" weight={500}>
                                {name}
                            </Text>

                            <Text color="black" size="xs">
                                {email}
                            </Text>
                        </div>

                        {/* {icon || <IconChevronRight size={14} stroke={1.5} />} */}
                    </Group>
                </UnstyledButton>
                <Button variant="light" color="violet" style={{ width: '80%' }} onClick={() => navigate('/')}>
                    Switch to Dashboard View
                </Button>
            </Stack>
            {/* </Center> */}
        </>
    );
}
