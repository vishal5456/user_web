export default function useClickOutside (handler,myRef,myUseEffect){

  let domNode = myRef();

  myUseEffect(()=>{

    let dropdownHandler = ((event)=>{
      if(domNode.current){
      if(!domNode.current.contains(event.target)){
      handler();
      }
    }
    });

    document.addEventListener("click",dropdownHandler);
    return ()=>{
      document.removeEventListener("click",dropdownHandler)
    }

  })

return domNode;


}