import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
    },
    scales: {
        yAxis: {
            display: false
        }
    }
};

const labels = ['1 week'];

export const data = {
    labels,
    datasets: [
        {
            label: 'Day 1',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: '#ECCDF6',
        },
        {
            label: 'Day 2',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: '#ECCDF6',
        },
        {
            label: 'Day 3',
            data: labels.map(() => faker.datatype.number({ min: 0, max: 1000 })),
            backgroundColor: '#C7ADED',
        },
    ],
};


function StepHabit() {
    const loggedInUser = localStorage.getItem("user");

    return (
        <div>
            <div className="mt-[100px] ml-[32px] font-bold text-[20px]">Steps Tracker
            </div>
            {
                !loggedInUser && 
                <button
                type="button"
                class="inline-flex absolute z-50 items-center ml-[550px] bg-[#fa9324] text-white border-2 font-bold border-transparent py-3 px-8 focus:outline-none hover:bg-white hover:text-[#fa9324] hover:border-2 hover:border-[#fa9324] text-base mt-4 md:mt-0  rounded-full"  
                >
                {"Register First"}
              </button>
            }
        
        <div className='flex ml-[32px] gap-[20px] mt-[30px]'>
        <div className="w-[400px] h-[344px] bg-white rounded-[4px] drop-shadow-[0px_6px_18px_#E7E3EE] overflow-hidden">
            <div className="flex justify-between items-center mt-[16px] ml-[30px] mr-[20px]">
                <h5 className="text-[14px] font-CardFontBold leading-none text-[#192A3E] font-medium">Frequency</h5>
            </div>
            <div className="w-full mt-[20px] mb-[16px] h-0.5 bg-[#EBEFF2] p-0 m-0" />
            <div className="flow-root cursor-pointer pt-[120px] w-[300px] ml-[35px]">
                <Bar options={options} data={data} />
            </div>
        </div>
        <div className="w-[400px] h-[344px] bg-white rounded-[4px] drop-shadow-[0px_6px_18px_#E7E3EE] overflow-hidden ">
            <div className="flex justify-between items-center mt-[16px] ml-[30px] mr-[20px]">
                <h5 className="text-[14px] font-CardFontBold leading-none text-[#192A3E] font-medium">Tokens Earned</h5>
            </div>
            <div className="w-full mt-[20px] h-0.5 bg-[#EBEFF2] p-0 m-0" />
            <div className="flow-root cursor-pointer pt-[120px] w-[300px] ml-[145px] font-bold text-[60px] ">
                50
            </div>
        </div>
        <div className="w-[400px] h-[344px] bg-white rounded-[4px] drop-shadow-[0px_6px_18px_#E7E3EE] overflow-hidden ">
            <div className="flex justify-between items-center mt-[16px] ml-[30px] mr-[20px]">
                <h5 className="text-[14px] font-CardFontBold leading-none text-[#192A3E] font-medium">Prograss So Far</h5>
            </div>
            <div className="w-full mt-[20px] h-0.5 bg-[#EBEFF2] p-0 m-0" />
            <div className="flow-root cursor-pointer pt-[120px] w-[300px] ml-[145px] font-bold text-[60px] ">
                2 Km
            </div>
        </div>
        </div>
        </div>
    )
}

export default StepHabit