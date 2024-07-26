import React, { useState } from 'react';
import { useForm } from '@mantine/form';
import {
  TextInput,
  Radio,
  NumberInput,
  Group,
  Button,
  Container,
  Paper,
  Title,
  Stack,
  Text,
  Alert,
  Modal,
} from '@mantine/core';
import axios from 'axios';
import { faker } from '@faker-js/faker';

const W4Form = () => {
  const [scenario, setScenario] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [isScenarioGenerated, setIsScenarioGenerated] = useState(false);
  const [userResponseJson, setUserResponseJson] = useState(null);
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [modalOpened, setModalOpened] = useState(false);

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zip: '',
      ssn: '',
      filingStatus: '',
      multipleJobsOption: '',
      qualifyingChildren: 0,
      otherDependents: 0,
      otherIncome: 0,
      deductions: 0,
      extraWithholding: 0,
    },
  });

  // Calculate total credits
  const totalCredits =
    form.values.qualifyingChildren * 2000 + form.values.otherDependents * 500;

  const generateScenario = () => {
    const newScenario = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      address: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.stateAbbr(),
      zip: faker.address.zipCode(),
      ssn: faker.datatype.number({ min: 100000000, max: 999999999 }).toString(),
      filingStatus: faker.helpers.arrayElement(['single', 'married', 'headOfHousehold']),
      multipleJobsOption: faker.helpers.arrayElement(['estimator', 'worksheet', 'twoJobs']),
      qualifyingChildren: faker.datatype.number({ min: 0, max: 5 }),
      otherDependents: faker.datatype.number({ min: 0, max: 3 }),
      otherIncome: faker.datatype.number({ min: 0, max: 10000 }),
      deductions: faker.datatype.number({ min: 0, max: 20000 }),
      extraWithholding: faker.datatype.number({ min: 0, max: 500 }),
    };

    setScenario(newScenario);
    setIsScenarioGenerated(true);
    setLoading(true);

    generateStory(newScenario);
  };

  const handleSubmit = async (values) => {
    setUserResponseJson(values);

    if (!isScenarioGenerated) {
      setVerificationResult({
        status: 'error',
        message: 'Please generate a scenario first.',
      });
      return;
    }

    const scenarioMatch = Object.keys(scenario).every(
      (key) => scenario[key] === values[key]
    );

    if (scenarioMatch) {
      setVerificationResult({
        status: 'success',
        message: 'Submitted answers match the generated scenario!',
      });
    } else {
      setVerificationResult({
        status: 'error',
        message: 'Submitted answers do not match the generated scenario.',
      });
      setAttempts(attempts + 1);

      if (attempts + 1 >= 3) {
        setModalOpened(true);
      }
    }
  };

  const generateStory = async (formData) => {
    const APIBody = {
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Given the following form data, create a concise and realistic scenario or story based on the information provided. Make sure to mention every piece of the data explicitly written out at least once in your response, including the SSN."
        },
        {
          role: "user",
          content: JSON.stringify(formData),
        },
      ],
      temperature: 1,
      max_tokens: 500,
    };

    try {
      const response = await axios.post("https://api.openai.com/v1/chat/completions", APIBody, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPEN_AI_API_KEY}`,
        },
      });

      const storyResult = response.data.choices[0].message.content.trim();
      setStory(storyResult);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="xl">
      {story && (
        <Alert
          mt={20}
          title="Generated Story"
          color="blue"
        >
          {story}
        </Alert>
      )}
      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <Title order={2} align="center" mb={20}>
          W-4 Employee’s Withholding Certificate
        </Title>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Title order={4} mt={20}>
            Step 1: Enter Personal Information
          </Title>
          <Group grow>
            <TextInput
              label="First name and middle initial"
              placeholder="First name"
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label="Last name"
              placeholder="Last name"
              {...form.getInputProps('lastName')}
            />
          </Group>
          <TextInput
            label="Address"
            placeholder="Address"
            mt={20}
            {...form.getInputProps('address')}
          />
          <Group grow>
            <TextInput
              label="City or town"
              placeholder="City"
              {...form.getInputProps('city')}
            />
            <TextInput
              label="State"
              placeholder="State"
              {...form.getInputProps('state')}
            />
            <TextInput
              label="ZIP code"
              placeholder="ZIP code"
              {...form.getInputProps('zip')}
            />
          </Group>
          <TextInput
            label="Social security number"
            placeholder="SSN"
            mt={20}
            {...form.getInputProps('ssn')}
          />
          <Title order={4} mt={20}>
            Step 1(c): Filing Status
          </Title>
          <Radio.Group {...form.getInputProps('filingStatus')}>
            <Stack mt={10}>
              <Radio value="single" label="Single or Married filing separately" />
              <Radio value="married" label="Married filing jointly or Qualifying surviving spouse" />
              <Radio
                value="headOfHousehold"
                label="Head of household (Check only if you’re unmarried and pay more than half the costs of keeping up a home for yourself and a qualifying individual.)"
              />
            </Stack>
          </Radio.Group>

          <Title order={4} mt={20}>
            Step 2: Multiple Jobs or Spouse Works
          </Title>
          <Text mt={10}>
            Complete this step if you (1) hold more than one job at a time, or (2) are married filing jointly and your spouse also works. The correct amount of withholding depends on income earned from all of these jobs.
          </Text>
          <Text mt={10}>
            <b>Do only one of the following.</b>
          </Text>
          <Radio.Group {...form.getInputProps('multipleJobsOption')}>
            <Stack mt={10}>
              <Radio
                value="estimator"
                label="(a) Use the estimator at www.irs.gov/W4App for most accurate withholding for this step (and Steps 3–4). If you or your spouse have self-employment income, use this option."
              />
              <Radio
                value="worksheet"
                label="(b) Use the Multiple Jobs Worksheet on page 3 and enter the result in Step 4(c) below."
              />
              <Radio
                value="twoJobs"
                label="(c) If there are only two jobs total, you may check this box. Do the same on Form W-4 for the other job. This option is generally more accurate than (b) if pay at the lower paying job is more than half the pay at the higher paying job. Otherwise, (b) is more accurate."
              />
            </Stack>
          </Radio.Group>
          <Text mt={10}>
            Complete Steps 3–4(b) on Form W-4 for only ONE of these jobs. Leave those steps blank for the other jobs. (Your withholding will be most accurate if you complete Steps 3–4(b) on the Form W-4 for the highest paying job.)
          </Text>

          <Title order={4} mt={20}>
            Step 3: Claim Dependent and Other Credits
          </Title>
          <Text mt={10}>
            If your total income will be $200,000 or less ($400,000 or less if married filing jointly):
          </Text>
          <NumberInput
            label="Multiply the number of qualifying children under age 17 by $2,000"
            placeholder="0"
            mt={10}
            {...form.getInputProps('qualifyingChildren')}
          />
          <NumberInput
            label="Multiply the number of other dependents by $500"
            placeholder="0"
            mt={10}
            {...form.getInputProps('otherDependents')}
          />
          <NumberInput
            label="Add the amounts above for qualifying children and other dependents. You may add to this the amount of any other credits. Enter the total here"
            placeholder="0"
            mt={10}
            value={totalCredits}
            readOnly
          />

          <Title order={4} mt={20}>
            Step 4 (optional): Other Adjustments
          </Title>
          <NumberInput
            label="Other income (not from jobs)"
            placeholder="0"
            mt={10}
            {...form.getInputProps('otherIncome')}
          />
          <NumberInput
            label="Deductions"
            placeholder="0"
            mt={10}
            {...form.getInputProps('deductions')}
          />
          <NumberInput
            label="Extra withholding"
            placeholder="0"
            mt={10}
            {...form.getInputProps('extraWithholding')}
          />

          <Title order={4} mt={20}>
            Step 5: Sign Here
          </Title>
          <Group grow mt={10}>
            <Button type="submit">Submit</Button>
          </Group>
        </form>
        <Button onClick={generateScenario} mt={20} color="blue" disabled={loading}>
          {loading ? 'Generating Scenario...' : 'Generate Scenario'}
        </Button>
        {verificationResult && (
          <Alert
            mt={20}
            title={verificationResult.status === 'success' ? 'Success' : 'Error'}
            color={verificationResult.status === 'success' ? 'green' : 'red'}
          >
            {verificationResult.message}
          </Alert>
        )}
      </Paper>
      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Correct Values"
      >
        <Text>First Name: {scenario?.firstName}</Text>
        <Text>Last Name: {scenario?.lastName}</Text>
        <Text>Address: {scenario?.address}</Text>
        <Text>City: {scenario?.city}</Text>
        <Text>State: {scenario?.state}</Text>
        <Text>ZIP: {scenario?.zip}</Text>
        <Text>SSN: {scenario?.ssn}</Text>
        <Text>Filing Status: {scenario?.filingStatus}</Text>
        <Text>Multiple Jobs Option: {scenario?.multipleJobsOption}</Text>
        <Text>Qualifying Children: {scenario?.qualifyingChildren}</Text>
        <Text>Other Dependents: {scenario?.otherDependents}</Text>
        <Text>Other Income: {scenario?.otherIncome}</Text>
        <Text>Deductions: {scenario?.deductions}</Text>
        <Text>Extra Withholding: {scenario?.extraWithholding}</Text>
      </Modal>
    </Container>
  );
};

export default W4Form;
