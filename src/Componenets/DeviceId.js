import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function DeviceId() {
  const [buttonText, setButtonText] = useState('Verify Me');
  const [accesstoken, setAccesstoken] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAccesstoken(e.target.value)
  }

  const handleSubmit = () => {
    setButtonText('Checking.........');
    fetch('https://api.fitbit.com/1/user/-/activities/steps/date/today/1w.json', {
        method: "GET",
        headers: {"Authorization": "Bearer " + accesstoken}
      })
      .then(res => {
        localStorage.setItem('accessToken', accesstoken);
        setButtonText("Verified");
        navigate('/stepTracker')
      }) 
      .catch(err => {
        console.log(err);
        setButtonText(" Error on Verifiction");
      })
  }

    
  return (
    <div class="flex flex-col items-center justify-center font-GorditaMedium py-24 px-5">         
    <div class="bg-white shadow-lg rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16 card">
        <p tabindex="0" class="focus:outline-none text-2xl font-GorditaBold  leading-6 text-gray-800">Verify Your FitBit Device</p>
        <p tabindex="0" class="focus:outline-none text-sm mt-4 leading-none text-gray-500">Dont know how ? <a href="javascript:void(0)" class="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm leading-none  text-gray-800 cursor-pointer">See Here</a></p>
        <div className='mt-[25px]'>
            <label class="text-sm leading-none text-gray-800">
                Provide Your Fitbit Acess Token
            </label>
            <input  class="bg-gray-200 border rounded  text-xs leading-none text-gray-800 py-3 w-full pl-3 mt-2" onClick={handleChange}/>
        </div>
        <div class="mt-8">
            <button role="button" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-[#fa9324] border rounded hover:bg-white hover:text-[#fa9324] hover:border-[#fa9324] hover:border-2 py-4 w-full" onClick={handleSubmit}>{buttonText}</button>
        </div>
    </div>
</div>
  )
}

export default DeviceId