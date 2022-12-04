import React from 'react';


function Home(props) {
    return (
        <div class="container mx-auto flex flex-col items-center mt-[150px]">
            <div class="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
                <h1 class="sm:text-4xl text-6xl mb-4 mt-[40px] font-bold text-gray-900 font-GorditaBold">We build,
                    <div>Your Story of <span className='rounded border-b-4 border-[#fa9324]'>Sucess .</span></div>
                </h1>
                <div class="flex justify-center">
                    <button onClick={props.log} class="transition ease-in-out delay-150  rounded-full hover:-translate-y-1 hover:scale-110 duration-300 tracking-wider inline-flex items-center bg-[#fa9324] text-white border-2 border-transparent py-3 px-8 focus:outline-none hover:bg-white hover:text-[#fa9324] hover:border-2 hover:border-[#fa9324] text-base mt-4 md:mt-0">Get Started
                        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="4" class="w-4 h-4 ml-1" viewBox="0 0 24 24">
                            <path d="M5 12h14M12 5l7 7-7 7"></path>
                        </svg>
                    </button>
                </div>
            </div>
            <div className='z-50 bg-gradient-to-top from-orange-500 to-yellow-300 '>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fill-opacity="1" d="M0,288L80,245.3C160,203,320,117,480,122.7C640,128,800,224,960,224C1120,224,1280,128,1360,80L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
                <div>
                </div>
            </div>
            <section class="text-gray-700 border-t border-gray-200 mt-[80px]">
            <div class="container px-5 py-12 mx-auto mt-">
                <div class="lg:grid lg:grid-cols-5 text-xl font-bold mt-7 lg:2 grid grid-cols-2 gap-x-32 gap-y-3 lg:px-20 ">
                    <div>Valist</div>
                    <div>Shardeum</div>
                    <div>Covalant</div>
                    <div>Push Protocol</div>
                    <div>Biconomy</div>
                </div>
            </div>
          </section>
        </div>
    )
}

export default Home


{/* <div className=''>
<div className='bg-gradient-to-t from-orange-500 to-yellow-300 mt-[300px]'>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="white" fill-opacity="1" d="M0,288L80,245.3C160,203,320,117,480,122.7C640,128,800,224,960,224C1120,224,1280,128,1360,80L1440,32L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path></svg>
</div>
<div>

</div>
</div> */}