import Image from 'next/image'

type Prop = {
    productID: string;
    text: string;
}

export default function Quote(prop: Prop ) {
    return (
        <main className="flex mt-4">
            <div className="bg-slate-200 w 2/3 mt-5 mb-5 border border-gray-300 p-4">
                <p className=" font-semibold">Name: {"Product_"+prop.productID}</p>
                <div className="flex">
                    <img className=" flex pr-4 w-1/3 " src={"/kanye_image.PNG"} alt='proj'/>
                    <p className="flex w-80"> Description: {prop.text}</p>
                </div>
            </div>

            <div className="bg-slate-200 w-1/3 mt-5 mb-5 border border-y-gray-300 border-r-gray-300 p-4">

            </div>
        </main>
    )
}
