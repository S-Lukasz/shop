import Image from 'next/image'
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faCoffee } from '@fortawesome/free-solid-svg-icons'

interface Page 
{
  name: string;
  path: string;
}

export default function Header() {
  
  const PAGES:Page[] = [
    {
      name:"Menu",
      path:"/"
    },
    {
      name:"About",
      path:"/about"
    },
    {
      name:"Cart",
      path:"/cart"
    }
  ]

  return (
    
    <main className="flex-col">
      <div className="bg-black flex pt-5"></div>

      <div className="flex">

        <div className="bg-white text-center h-16 flex items-center">

          <div className="flex items-center divide-gray-300 text-center divide-x-2 text-2xl font-bold ">
            {
              PAGES.map((result) => <Link className=' px-10 ' href={result.path}>
                <p className="transform hover:scale-110 motion-reduce:transform-none text-gray-700 hover:text-black ease-out transition-all duration-300 ">{result.name}</p>
              </Link>)
            }
          </div>

        </div>  
        
        <div className="flex ml-auto mr-10 ">
          <div className="flex border-l-2 border-gray-300 my-4 mr-8">
              
          </div>

          <div className="flex m-auto w-6 h-6 transform hover:scale-110 motion-reduce:transform-none text-gray-700 hover:text-black ease-out transition-all duration-300 ">
              <FontAwesomeIcon icon={faCartShopping} />
            </div>
        </div>
{/* 
        <div className="flex mr-10 my-auto ml-auto w-6 h-6">
            <FontAwesomeIcon icon={faCartShopping} />
        </div> */}

       

      </div>
        
    </main>
  )
}
