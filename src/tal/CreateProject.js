import {
    TextInput,
    PasswordInput,
    Checkbox,
    Anchor,
    Paper,
    Title,
    Text,
    Container,
    Group,
    Button,
    Stepper,
    Center,
    Stack,
    MultiSelect
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CreateProject() {
    const [value, setValue] = useState();
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const handleButtonClick = () => {
        if (active === 3) {
            // Finish button was clicked
            // Navigate to the dashboard
            navigate('/');
        } else {
            // Next step button was clicked
            nextStep();
        }
    };

    return (
        <Container my={40}>
            <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
                Create a New Project
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                This is the start of something great!
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                <Stepper active={active} onStepClick={setActive} breakpoint="sm" color="grape">
                    <Stepper.Step label="Project Details" description="Input basic information">
                        <Stack mt={25} mb={25} spacing="xl">
                            <TextInput label="Project Name" placeholder="Project One" />
                            <TextInput label="What" placeholder="Describe the project" />
                            <TextInput label="Why" placeholder="What are the motivations for this project?" />
                            <TextInput label="How" placeholder="How will the project be achieved?" />
                            <TextInput label="Goals" placeholder="What are the measurable goals of the project?" />
                            <TextInput label="Budget" placeholder="What is the overall budget?" />
                        </Stack>

                        {/* <Button variant="light" color="grape" fullWidth mt="xl">
                    Sign in
                </Button> */}
                    </Stepper.Step>
                    <Stepper.Step label="Dates" description="Select date range">
                        <Group position="center">
                            <DatePicker type="range" value={value} onChange={setValue} />
                        </Group>
                    </Stepper.Step>
                    <Stepper.Step label="Departments/Tasks" description="Compartamentalize!">
                        <MultiSelect
                            label="Departments"
                            data={data}
                            placeholder="Create departments"
                            searchable
                            creatable
                            getCreateLabel={(query) => `+ Add ${query}`}
                            onCreate={(query) => {
                                const item = { value: query, label: query };
                                setData((current) => [...current, item]);
                                return item;
                            }}
                        />
                    </Stepper.Step>
                    <Stepper.Completed>
                        <Center>
                            <Title mt={30} mb={30} sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
                                Project created!
                            </Title>
                        </Center>
                    </Stepper.Completed>
                </Stepper>

                <Group position="center" mt="xl">
                    {active !== 3 && (
                        <Button variant="default" onClick={prevStep}>
                            Back
                        </Button>
                    )}

                    <Button variant="light" color="grape" onClick={handleButtonClick}>
                        {active === 2 ? 'Finish' : active === 3 ? 'Go to Dashboard' : 'Next step'}
                    </Button>
                </Group>
            </Paper>
        </Container>
    );
}
// Create a project (what)
// Define together a clear description (what, why, who, how and goals)
// Define together the big work packages of the project (departments)
// The project owner decides which departments he/she makes private, public or only for experts + on which work packages suggestions are enabled or disabled
// The project owner adds on the departments where suggestions have enabled a reward per validated suggestion (POGI points)
// Define together your next steps by slicing them down to executable tasks as small as possible by using topics, subtopics, sub subtopics and tasks
// Be able to archive a topic, subtopic, sub subtopic or task
// Put rewards on the tasks (money, POGI or own tokens (xPOGI))
// Put rewards on referrals to tasks
// Communicate about tasks and topics in comments to only project owner - project owner to only the contributor who has put the topic / task
// Before assigning a task to someone, put together an end date for it
// Give authority to other people to validate suggestions of topics and tasks and validate the results of tasks (=project manager)
// Add a budget for a project manager: time based and/or result based rewards
// Add referral reward to find a project manager
// See the status of tasks: open, urgent, in progress, in review, completed and exceeded end date
