const DesignContainer = ({ title, children }) => {
  return (
    <div>
      <div
        className='relative rounded-lg py-14 px-4 md:px-14 mx-0'
        style={{
          backgroundColor: '#2D2D30',
          borderRadius: '8px',
        }}
      >
        <div
          className='flex justify-center items-center mb-6'
          style={{
            height: 48,
            marginTop: -32,
          }}
        >
          <span className='font-black lg:text-6xl sm:text-4xl mt-6'>
            {title}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
};

export default DesignContainer;
