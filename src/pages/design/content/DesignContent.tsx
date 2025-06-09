import DesignCanvas from './components/designCanvas/DesignCanvas';

const Design = () => {
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <div className="flex-1 relative w-full h-full">
        <DesignCanvas />
      </div>
    </div>
  );
};

export default Design;
