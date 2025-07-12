function EmptyPage({className="" , message = ""}){
return(
    <div className={`${className} flex [flex-flow:row_wrap] justify-center items-center p-3`}>
        
        <span>{message}</span>
    </div>
)
}
export default EmptyPage