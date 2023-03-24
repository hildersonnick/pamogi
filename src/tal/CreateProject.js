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
    MultiSelect,
    Switch,
    Select
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PocketBase from 'pocketbase';

export default function CreateProject() {
    const [active, setActive] = useState(0);
    const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
    const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));
    const navigate = useNavigate();

    const handleButtonClick = () => {
        // if (active === 3) {
        //     // Finish button was clicked
        //     // Navigate to the dashboard
        //     navigate('/');
        // } else if (active === 2) {
        addRecord();
        navigate('/');
        // nextStep();
        // } else {
        //     // Next step button was clicked
        //     nextStep();
        // }
    };
    const pb = new PocketBase('http://127.0.0.1:8090');

    const addRecord = async () => {
        try {
            const data = {
                projectName: projectName,
                description: description,
                budget: budget,
                budgetper: budgetper,
                category: category,
                tags: tags,
                location: location,
                visibility: visibility,
                email: pb.authStore.model.email
            };
            console.log(data);

            const record = await pb.collection('projects').create(data);
            return record;
        } catch (error) {
            return { error: error.message };
        }
    };
    // const [dates, setDates] = useState();
    // const [departments, setDepartments] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [budget, setBudget] = useState('');
    const [budgetper, setBudgetper] = useState('');
    const [category, setCategory] = useState();
    const [tags, setTags] = useState([]);
    const [location, setLocation] = useState('');
    const [visibility, setVisibility] = useState('');
    const [description, setDescription] = useState('');

    return (
        <Container my={40}>
            <Title align="center" sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}>
                Create a New Project
            </Title>
            <Text color="dimmed" size="sm" align="center" mt={5}>
                This is the start of something great!
            </Text>

            <Paper withBorder shadow="md" p={30} mt={30} radius="md">
                {/* <Stepper active={active} onStepClick={setActive} breakpoint="sm" color="grape">
                    <Stepper.Step label="Project Details" description="Input basic information"> */}
                <Stack mt={25} mb={25} spacing="xl">
                    <TextInput onChange={(event) => setProjectName(event.target.value)} label="Project Name" placeholder="Project One" />
                    <TextInput
                        onChange={(event) => setDescription(event.target.value)}
                        label="Description"
                        placeholder="Describe the project"
                    />
                    <TextInput
                        onChange={(event) => setBudget(event.target.value)}
                        label="Budget"
                        placeholder="What is the overall budget?"
                    />
                    <TextInput
                        onChange={(event) => setBudgetper(event.target.value)}
                        label="Budget per suggestion"
                        placeholder="How much are contributors paid?"
                    />
                    <Select
                        onChange={setCategory}
                        label="Category"
                        placeholder="Select category"
                        data={[
                            { value: 'Cateogry 1', label: 'Category 1' },
                            { value: 'Category 2', label: 'Category 2' },
                            { value: 'Category 3', label: 'Category 3' }
                        ]}
                    />

                    {/* <TextInput onChange={(event) => setTags(event.target.value)} label="Tags" placeholder="multi select below" /> */}
                    <MultiSelect
                        label="Tags"
                        data={tags}
                        placeholder="Add tags"
                        searchable
                        creatable
                        getCreateLabel={(query) => `+ Add ${query}`}
                        onCreate={(query) => {
                            const item = { value: query, label: query };
                            setTags((current) => [...current, item]);
                            return item;
                        }}
                    />

                    <TextInput onChange={(event) => setLocation(event.target.value)} label="Location" placeholder="Location of Project" />

                    <TextInput
                        onChange={(event) => setVisibility(event.target.value)}
                        label="Visibility"
                        placeholder="private or public replace with switch"
                    />
                    {/* <Switch
                        size="lg"
                        onChange={handleVisibilityChange}
                        // value="on"
                        onLabel="Public Project"
                        offLabel="Private Project"
                    /> */}
                    <Button variant="light" color="grape" onClick={handleButtonClick}>
                        Submit
                    </Button>
                </Stack>

                {/* <Button variant="light" color="grape" fullWidth mt="xl">
                    Sign in
                </Button> */}
                {/* </Stepper.Step>
                    <Stepper.Step label="Dates" description="Select date range">
                        <Group position="center">
                            <DatePicker type="range" value={dates} onChange={setDates} />
                        </Group>
                    </Stepper.Step>
                    <Stepper.Step label="Departments/Tasks" description="Compartamentalize!">
                        <MultiSelect
                            label="Departments"
                            data={departments}
                            placeholder="Create departments"
                            searchable
                            creatable
                            getCreateLabel={(query) => `+ Add ${query}`}
                            onCreate={(query) => {
                                const item = { value: query, label: query };
                                setDepartments((current) => [...current, item]);
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
                </Group> */}
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
