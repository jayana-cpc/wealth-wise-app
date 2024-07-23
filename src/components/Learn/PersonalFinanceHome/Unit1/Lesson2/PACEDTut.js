import { useState } from 'react';
import {
  Container,
  TextInput,
  Button,
  Group,
  Title,
  NumberInput,
  List,
  ListItem,
  Alert,
  Text,
  Loader,
} from '@mantine/core';
import { IconInfoCircle, IconCheck } from '@tabler/icons-react';

const apiKey = process.env.NEXT_PUBLIC_OPEN_AI_API_KEY;

export function PACEDModel() {
  const [step, setStep] = useState(1);
  const [problem, setProblem] = useState('');
  const [alternatives, setAlternatives] = useState(['']);
  const [criteria, setCriteria] = useState(['']);
  const [evaluations, setEvaluations] = useState({});
  const [decision, setDecision] = useState('');
  const [aiAlternatives, setAIAlternatives] = useState([]);
  const [aiCriteria, setAICriteria] = useState([]);
  const [aiScores, setAIScores] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [requestButtonDisabled, setRequestButtonDisabled] = useState(false);

  const handleNextStep = () => {
    if (step === 1 && problem.trim() === '') {
      setAlertMessage('Please define the problem before proceeding.');
      return;
    }

    if (step === 2 && alternatives.every((alt) => alt.trim() === '')) {
      setAlertMessage('Please provide at least one alternative before proceeding.');
      return;
    }

    if (step === 3 && criteria.every((crit) => crit.trim() === '')) {
      setAlertMessage('Please provide at least one criteria before proceeding.');
      return;
    }

    setAlertMessage(''); // Clear any existing alert message
    setInfoMessage('');  // Clear any existing info message
    setRequestButtonDisabled(false); // Enable request button for next step
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setAlertMessage(''); // Clear any existing alert message
    setInfoMessage('');  // Clear any existing info message
    setRequestButtonDisabled(false); // Enable request button for previous step
    setStep(step - 1);
  };

  const handleInputChange = (index, value, type) => {
    if (type === 'alternative') {
      const newAlternatives = [...alternatives];
      newAlternatives[index] = value;
      setAlternatives(newAlternatives);
    } else if (type === 'criteria') {
      const newCriteria = [...criteria];
      newCriteria[index] = value;
      setCriteria(newCriteria);
    }
  };

  const handleEvaluationChange = (alternative, criteria, value) => {
    const newEvaluations = { ...evaluations };
    if (!newEvaluations[alternative]) {
      newEvaluations[alternative] = {};
    }
    newEvaluations[alternative][criteria] = value;
    setEvaluations(newEvaluations);
  };

  const handleDecision = () => {
    const scores = {};
    criteria.forEach((crit) => {
      alternatives.forEach((alt) => {
        if (!scores[alt]) scores[alt] = 0;
        scores[alt] += Number(evaluations[alt]?.[crit] || 0);
      });
    });

    const bestAlternative = Object.keys(scores).reduce((a, b) => (scores[a] > scores[b] ? a : b));
    setDecision(bestAlternative);
    setStep(5); // Move to the decision step
  };

  const handleAutoPopulate = () => {
    setProblem('I need to choose the best credit card for my needs.');
  };

  const handleNeedAlternatives = async () => {
    setLoading(true);
    setRequestButtonDisabled(true);
    setInfoMessage(''); // Clear any existing info message

    const APIBody = {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Provide 3 potential options for the following dilemma. For example, if the problem is. "I need to choose the best credit card for my needs." Provide 3 different credit card options. Do not provide explanation or description. Only list out options.',
        },
        {
          role: 'user',
          content: problem,
        },
      ],
      temperature: 1,
      max_tokens: 50,
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey,
        },
        body: JSON.stringify(APIBody),
      });

      const result = await response.json();
      const aiResponse = result.choices[0].message.content.trim();
      setAIAlternatives(aiResponse.split('\n').filter((alt) => alt.trim() !== ''));
      setInfoMessage(`Alternatives: ${aiResponse}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      setInfoMessage('There was an error fetching alternatives. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNeedCriteria = async () => {
    setLoading(true);
    setRequestButtonDisabled(true);
    setInfoMessage(''); // Clear any existing info message

    const APIBody = {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Provide criteria to evaluate the following problem. For example, if the problem is. "I need to choose the best credit card for my needs." Provide criteria to evaluate different credit card options. Do not provide explanation or description. Only list out criteria.',
        },
        {
          role: 'user',
          content: problem,
        },
      ],
      temperature: 1,
      max_tokens: 50,
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey,
        },
        body: JSON.stringify(APIBody),
      });

      const result = await response.json();
      const aiResponse = result.choices[0].message.content.trim();
      setAICriteria(aiResponse.split('\n').filter((crit) => crit.trim() !== ''));
      setInfoMessage(`Criteria: ${aiResponse}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      setInfoMessage('There was an error fetching criteria. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleNeedScores = async () => {
    setLoading(true);
    setRequestButtonDisabled(true);
    setInfoMessage(''); // Clear any existing info message

    const APIBody = {
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            'Evaluate the following alternatives based on these criteria. Provide scores between 1 and 10 for each alternative against each criteria. Format the response into an organized list.',
        },
        {
          role: 'user',
          content: `Problem: ${problem}\nAlternatives: ${alternatives.join(', ')}\nCriteria: ${criteria.join(', ')}`,
        },
      ],
      temperature: 1,
      max_tokens: 500,
    };

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + apiKey,
        },
        body: JSON.stringify(APIBody),
      });

      const result = await response.json();
      const aiResponse = result.choices[0].message.content.trim();
      const parsedResponse = aiResponse.split('\n').reduce((acc, line) => {
        const [alt, ...scores] = line.split(': ');
        const scoreValues = scores.join(': ').split(', ').reduce((scoreAcc, score) => {
          const [crit, value] = score.split(' ');
          scoreAcc[crit] = parseInt(value, 10);
          return scoreAcc;
        }, {});
        acc[alt] = scoreValues;
        return acc;
      }, {});
      setAIScores(parsedResponse);
      setInfoMessage(`Score Evaluations: ${aiResponse}`);
    } catch (error) {
      console.error('Error fetching data:', error);
      setInfoMessage('There was an error fetching score evaluations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="sm">
      {alertMessage && (
        <Alert
          icon={<IconInfoCircle />}
          title="Required Input"
          color="blue"
          withCloseButton
          onClose={() => setAlertMessage('')}
          mt="md"
        >
          {alertMessage}
        </Alert>
      )}
      {infoMessage && (
        <Alert
          icon={<IconCheck />}
          title="Information"
          color="green"
          withCloseButton
          onClose={() => setInfoMessage('')}
          mt="md"
        >
          {infoMessage}
        </Alert>
      )}
      {loading && (
        <Alert icon={<Loader size="sm" />} title="Loading" color="blue" mt="md">
          Please wait while we fetch the data.
        </Alert>
      )}
      {step === 1 && (
        <div>
          <Title order={2}>Step 1: Define the Problem</Title>
          <TextInput
            label="Problem"
            placeholder="Describe the problem or decision"
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            mt="md"
          />
          <Group position="right" mt="md">
            <Button onClick={handleAutoPopulate}>Auto Populate</Button>
            <Button onClick={handleNextStep}>Next</Button>
          </Group>
        </div>
      )}
      {step === 2 && (
        <div>
          <Title order={2}>Step 2: Identify Alternatives</Title>
          <List mt="md" spacing="xs">
            {alternatives.map((alt, index) => (
              <ListItem key={index}>
                <TextInput
                  value={alt}
                  onChange={(e) => handleInputChange(index, e.target.value, 'alternative')}
                  placeholder={`Alternative ${index + 1}`}
                />
              </ListItem>
            ))}
          </List>
          <Group mt="md">
            <Button onClick={() => setAlternatives([...alternatives, ''])}>Add Alternative</Button>
            <Button onClick={handleNeedAlternatives} ml="sm" disabled={requestButtonDisabled}>
              Need Alternatives
            </Button>
          </Group>
          <Group position="apart" mt="md">
            <Button onClick={handlePreviousStep}>Back</Button>
            <Button onClick={handleNextStep}>Next</Button>
          </Group>
        </div>
      )}
      {step === 3 && (
        <div>
          <Title order={2}>Step 3: Establish Criteria</Title>
          <List mt="md" spacing="xs">
            {criteria.map((crit, index) => (
              <ListItem key={index}>
                <TextInput
                  value={crit}
                  onChange={(e) => handleInputChange(index, e.target.value, 'criteria')}
                  placeholder={`Criteria ${index + 1}`}
                />
              </ListItem>
            ))}
          </List>
          <Group mt="md">
            <Button onClick={() => setCriteria([...criteria, ''])}>Add Criteria</Button>
            <Button onClick={handleNeedCriteria} ml="sm" disabled={requestButtonDisabled}>
              Need Criteria
            </Button>
          </Group>
          <Group position="apart" mt="md">
            <Button onClick={handlePreviousStep}>Back</Button>
            <Button onClick={handleNextStep}>Next</Button>
          </Group>
        </div>
      )}
      {step === 4 && (
        <div>
          <Title order={2}>Step 4: Evaluate Alternatives</Title>
          {alternatives.map((alt) => (
            <div key={alt}>
              <Title order={3}>{alt}</Title>
              {criteria.map((crit) => (
                <div key={crit}>
                  <label>{crit}</label>
                  <NumberInput
                    value={evaluations[alt]?.[crit] || ''}
                    onChange={(value) => handleEvaluationChange(alt, crit, value)}
                    placeholder={`Score for ${crit}`}
                    mt="xs"
                  />
                </div>
              ))}
            </div>
          ))}
          <Group mt="md">
            <Button onClick={handleNeedScores} ml="sm" disabled={requestButtonDisabled}>
              Need Score Evaluations
            </Button>
          </Group>
          <Group position="apart" mt="md">
            <Button onClick={handlePreviousStep}>Back</Button>
            <Button onClick={handleDecision}>Decide</Button>
          </Group>
        </div>
      )}
      {step === 5 && (
        <div>
          <Title order={2}>Step 5: Make the Decision</Title>
          <p>Based on your evaluation, the best alternative is:</p>
          <Title order={3}>{decision}</Title>
          <Group position="center" mt="md">
            <Button onClick={() => setStep(1)}>Start Over</Button>
          </Group>
        </div>
      )}
    </Container>
  );
}
