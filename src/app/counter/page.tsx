import Controler from '@/components/counter/Controler';
import Viewer from '@/components/counter/Viewer';

function CounterPage() {
  return (
    <div>
      <h1 className='text 2xl font-bold'>Counter</h1>
      <Viewer />
      <Controler />
    </div>
  );
}

export default CounterPage;
