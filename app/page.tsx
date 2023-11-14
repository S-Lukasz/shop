"use client"

import { useEffect, useMemo, useState } from 'react'
import Quote from '@/components/Quote'

export default function Home() {

  const [quotes, setQuotes] = useState<any[]>([])
  const quoteItems = useMemo(() => {
    return quotes.map((result, index) => <Quote productID={index.toString()} text={result.quote}></Quote> )
  }, [quotes])

  useEffect(() => {
    const test = async () => {
      const promises = [];
      for (let index = 0; index < 8; index++) 
      {
        const response = fetch("https://api.kanye.rest");
        promises.push(response)
      }
      
      const responses = await Promise.all(promises)
      const values = responses.map((value) => value.json())
      const results = await Promise.all(values)
      
      setQuotes(results);
    }

    test();
    
  }, [])

  return (

    <div className=" flex ">
      <div className=" flex flex-col w-1/6 bg-slate-200 ">
      </div>
      <div className=" flex w-5/6 bg-slate-100 items-center">
        <div className=" flex flex-col w-5/6 ml-20" >
          {/* <p className="  text-2xl font-semibold mt-5">Our products:</p> */}
          {quoteItems}
        </div>
      </div>
    </div>
  )
}
