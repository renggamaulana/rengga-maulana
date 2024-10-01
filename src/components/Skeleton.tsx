

export default function Skeleton() {

    return (
        Array(5).fill(0).map((el, index) => (
            <div key={index}>
              <div className='flex flex-row bg-white shadow-lg border-r-4 w-[20rem] items-center gap-2 p-2 rounded'>
                  <div className='rounded-full bg-gray-300 w-[4.5rem] h-[4.5rem] animate-pulse'></div>
                  <div className='flex flex-col gap-2 w-9/12'>
                    <span className='w-11/12 bg-gray-300 h-2 rounded-full animate-pulse'></span>
                    <span className='w-9/12 bg-gray-300 h-2 rounded-full animate-pulse'></span>
                  </div>
              </div>
          </div>
          ))
      )
}