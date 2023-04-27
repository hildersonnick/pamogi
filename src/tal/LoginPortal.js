import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    Center,
    Container
} from '@mantine/core';
import PocketBase from 'pocketbase';

export default function LoginPortal() {
    const pb = new PocketBase('https://pamogi.pockethost.io');

    const [type, toggle] = useToggle(['login', 'register']);
    const form = useForm({
        initialValues: {
            email: '',
            firstName: '',
            lastName: '',
            password: ''
        },

        validate: {
            email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null)
        }
    });
    const login = async () => {
        try {
            // Authenticate user with email and password
            const authData = await pb.collection('users').authWithPassword(form.values.email, form.values.password);

            // You can now do something with the authenticated user, like storing the user token in local storage
            localStorage.setItem('userToken', authData.token);

            // Redirect the user to the dashboard page
            window.location.href = '/';

            return authData;
        } catch (error) {
            return { error: error.message };
        }
    };

    //   create account function
    const createAccount = async () => {
        console.log('Creating account...');
        try {
            const data = {
                email: form.values.email,
                firstName: form.values.firstName,
                lastName: form.values.lastName,
                password: form.values.password,
                passwordConfirm: form.values.password,
                terms: form.values.terms
            };

            // // Create a new user account with the provided data
            // const user = await pb.auth.createUserWithEmailAndPassword(data.email, data.password);

            // // Log in the newly created user account
            // console.log(pb);

            const record = await pb.collection('users').create(data);
            // const authData = await pb.auth.signInWithEmailAndPassword(data.email, data.password);
            await login();

            return record;
        } catch (error) {
            console.log('Error:', error.message);
            return { error: error.message };
        }
    };

    return (
        <Container size={420} my={100}>
            <Paper radius="md" p="xl" withBorder>
                <Text mb={15} size="lg" weight={500}>
                    Welcome to Pamogi, {type} with
                </Text>

                {/* <Divider label="Or continue with email" labelPosition="center" my="lg" /> */}

                <form
                    onSubmit={form.onSubmit(() => {
                        // Check the current form type
                        if (type === 'register') {
                            createAccount();
                        } else {
                            login();
                        }
                    })}
                >
                    <Stack>
                        {type === 'register' && (
                            <>
                                <TextInput
                                    label="First Name"
                                    placeholder="Your first name"
                                    value={form.values.firstName}
                                    onChange={(event) => form.setFieldValue('firstName', event.currentTarget.value)}
                                    radius="md"
                                />
                                <TextInput
                                    label="Last Name"
                                    placeholder="Your last name"
                                    value={form.values.lastName}
                                    onChange={(event) => form.setFieldValue('lastName', event.currentTarget.value)}
                                    radius="md"
                                />
                            </>
                        )}

                        <TextInput
                            required
                            label="Email"
                            placeholder="hello@mantine.dev"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Password should include at least 6 characters'}
                            radius="md"
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    <Group position="apart" mt="xl">
                        <Anchor component="button" type="button" color="dimmed" onClick={() => toggle()} size="xs">
                            {type === 'register' ? 'Already have an account? Login' : "Don't have an account? Register"}
                        </Anchor>
                        <Button color="grape" variant="light" type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </form>
            </Paper>
        </Container>
    );
}
