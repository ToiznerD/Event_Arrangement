import Layout from '../components/layout';
import  Draggable  from 'react-draggable';
import  roundTable  from '../assets/roundTable.png';
import Image from 'next/image';

const HomePage = () => {

    const handleMouseDown = (event) => {
        event.preventDefault()
    };
    
  return (
      <Layout w="1000px">
          <Draggable grid={[25, 25]} scale={1}
        >
             <Image src={roundTable} defaultPosition={{x: 0, y: 0}}
        position={null} onStart={handleMouseDown} alt="pic" style={{ width: '100px', height: '100px' }}/>
          </Draggable>
      </Layout>
  );
};

export default HomePage;
