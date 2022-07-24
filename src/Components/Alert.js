export function Alert({mensaje}) {
    return(
        <div className="text-center relative mb-2" role="alert">
            <p className="bg-red-400 font-bold p-1 text-white rounded-t">ERROR!</p>
            <p className="bg-red-100 font-bold p-2 text-red-600 text-lg rounded-b">{mensaje}</p>
        </div>
    )        
}