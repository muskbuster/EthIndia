import React from 'react';

import Qualified from './Utilites/Qualified1.svg';
import Free from './Utilites/free1.svg';
import Edit from './Utilites/Edit.png';
import deadlines from './Utilites/deadlines1.svg';
import speedy from './Utilites/Speedy1.svg';
import Plagrisim from './Utilites/icons2.png';

function Card({image, headline, para}) {
    return (
        <div class="md:w-1/3 rounded-md group shadow-lg">
            <div class="flex bg-white p-8 sm:p-12 flex-col text-left h-full">
                <div class="flex items-center mb-3">
                    <div class="w-12 h-12 mr-3 inline-flex items-center justify-center rounded-full bg-gray-100 text-white flex-shrink-0">
                    <img class = 'w-8 h-8 group-hover:w-12 ease-in-out duration-500 group-hover:h-12 hover:transition-transform' alt={image} src={image}></img>
                    </div>
                    <h2 class="text-gray-900 text-lg title-font font-GorditaMedium">{headline}</h2>
                </div>
                <div class="">
                    <p class="leading-relaxed text-base">{para}</p>
                </div>
                <button role="button" class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full">Redeem for 20 Pro Token</button>
            </div>
        </div>
    )
}

function Redeem() {
  return (
    <>
    <section class="text-gray-700 py-12 mt-[40px]">
        <div class="container px-5 mx-auto">
            <div class="flex flex-wrap gap-[12px] justify-between">
                <Card image={Qualified} headline="Amazon Voucher" />
                <Card image={Free} headline="Amazon Voucher" />
                <Card image={deadlines} headline="Amazon Voucher" />
                <Card image={Edit} headline="Amazon Voucher"/>
                <Card image={speedy} headline="Amazon Voucher" />
                <Card image={Plagrisim} headline="Amazon Voucher" />
            </div>
        </div>
    </section>
    </>
  )
}

export default Redeem