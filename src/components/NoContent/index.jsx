import { SignalSlashIcon } from "@heroicons/react/24/outline"

function NoContent({className = "" , message = "" }) {
    return <div className={`${className} flex flex-col items-center justify-center w-full h-full`}>
        <SignalSlashIcon className="w-10 h-10" />
        <span>{message}</span>
    </div>
}
export default NoContent