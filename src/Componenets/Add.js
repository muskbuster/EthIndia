import React from 'react'

function Add() {
    return (
        <div class="flex flex-col items-center justify-center font-GorditaMedium py-24 px-5">
            <div class="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mt-16 card">
                <p tabindex="0" class="focus:outline-none text-2xl font-GorditaBold  leading-6 text-gray-800">Add Your Habit</p>
                <div>
                    <label id="email" class="text-sm leading-none text-gray-800 mt-4">
                        Habit Name
                    </label>
                    <input class="bg-gray-200 border rounded  text-xs leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                </div>
                <div class="mt-6  w-full">
                    <label for="pass" class="text-sm  leading-none text-gray-800">
                        How you will validate Idea?
                    </label>
                    <div class="relative flex items-center justify-center">
                        <input class="bg-gray-200 border rounded  text-xs leading-none text-gray-800 py-3 w-full pl-3 mt-2" />
                    </div>
                Qualified Team Of Professionals</div>
                <div class="mt-8">
                    <button role="button" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">Create my account</button>
                </div>
            </div>
        </div>
    )
}

export default Add