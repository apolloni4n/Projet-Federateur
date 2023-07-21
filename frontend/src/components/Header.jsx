import {Link} from 'react-router-dom';

import logoapp from '../images/logoapp.png'

export default function Header({
    heading,
}){
    return(
        <div className="mb-10">
            <div className="flex justify-center">
            <img className="h-24 w-25" src={logoapp}  alt="LOGO" />
            </div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                {heading}
            </h2>
            
        </div>
    )
}