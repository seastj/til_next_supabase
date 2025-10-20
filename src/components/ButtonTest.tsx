import { Button } from './ui/button';

const ButtonTest = () => {
  return (
    <div>
      <Button>Click Me</Button>
      <Button variant='outline'>Click Me</Button>
      <Button variant='destructive'>Click Me</Button>
      <Button variant='secondary'>Click Me</Button>
      <Button variant='ghost'>Click Me</Button>
      <Button variant='link'>Click Me</Button>
    </div>
  );
};

export default ButtonTest;
