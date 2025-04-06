window.addEventListener("message",(event)=>{
    if(!event.source===window){
        return ;
    }
    const data = event.data;
    if(data && typeof(data)==="object" && data.type){
        chrome.runtime.sendMessage({
            from:"content",
            type:data.type,
            message:data.message,
            source:data.source,
            lineno:data.lineno,
            colno:data.colno,
            stack:data.stack,
            url:data.url || null
        });
    }
})