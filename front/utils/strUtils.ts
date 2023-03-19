export const createImageURL=(url:string|null|undefined)=>{
    if(url){
        return `http://localhost:8000/media/${url}`
    }
    return null

}