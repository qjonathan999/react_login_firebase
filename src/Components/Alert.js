export function Alert({mensaje}) {
    return(
        <div className="bg-red-400 text-red-700 text-center relative mb-2 p-3" role="alert">
            <p className="sm:inline block font-bold text-white">Error!</p>
            <p className="font-bold">{mensaje}</p>
        </div>
    )        
}