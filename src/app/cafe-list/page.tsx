import React from 'react';
import CafeCard from "@/components/cafe-list/CafeCard";

const CafeList = () => {
    return (
        <div className={'w-full mt-12 flex flex-col gap-12'}>
            {/*베스트3*/}
            <section className={'flex flex-col gap-4'}>
                <div className={'flex gap-8 items-center'}>
                    <div className={'text-[20px] font-bold'}>
                        이번 주 Best 3
                    </div>
                    <div className={'text-[14px] text-[#939393]'}>
                        이번 주 사람들이 즐겨 찾은 Best 3는?
                    </div>
                </div>
                <div className={'inline-flex items-center gap-4 overflow-x-auto'}>
                    <CafeCard></CafeCard>
                    <CafeCard></CafeCard>
                    <CafeCard></CafeCard>
                </div>
            </section>
            {/*일반*/}
            <section className={'flex flex-wrap items-center gap-4'}>
                <CafeCard></CafeCard>
                <CafeCard></CafeCard>
                <CafeCard></CafeCard>
                <CafeCard></CafeCard>
                <CafeCard></CafeCard>
                <CafeCard></CafeCard>
                <CafeCard></CafeCard>
                <CafeCard></CafeCard>
                <CafeCard></CafeCard>
            </section>
        </div>
    );
};

export default CafeList;