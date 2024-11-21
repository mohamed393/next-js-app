import { FaDatabase } from "react-icons/fa6";
import  styles  from './noData.module.css';

interface TitleProps {
    title: string
}
const NoDataFound = ( {title} : TitleProps) => {
    return (
        <div className="flex items-center justify-center  ">
            <div
                className="m-auto p-5 rounded-lg my-1 shadow-lg border-2 border-gray-400 hover:bg-slate-200 w-full text-center">
                <FaDatabase className={`${styles.faDataBase} block mx-auto`}/>
                <h3 className="block text-xl font-bold text-gray-900 line-clamp-1">No {title} Found</h3>
            </div>
        </div>
    )
}

export default NoDataFound
