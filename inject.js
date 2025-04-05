(function(){
    window.onerror = function(message,source,lineno,colno,error){
        //this is for logging errors, error received as an object
        sendError({
            type:"javascript error",
            message,
            source,
            lineno,
            colno,
            stack:error?.stack || "No stack trace",
        });
    };

    window.onunhandledrejection = function(event){
        sendError({
            type:"unhandled rejection, this is for promise try and catch",
            message:event.reason?.message || event.reason,
            stack: event.error?.stack || "No stack trace"
        })
    };


    ["error","warn","log"].forEach((method)=>{
        const method = console[method];
        console[method] = function(...args){
            sendError({
                type:`Console:${method}`,
                // we need to send all our error messages as strings
                message:args.map(arg=>(typeof arg==='object'?JSON.stringify(arg):arg)).join(" ")
            })
            method.apply(console,args);
        }
    })




})();

//creating an iifie because we want to start reading errors as soon as we enter our web page
//trying to majorly read three types of errors and warnings:
// 1.errors
// 2.promises that werent caught
// 3.catching errors,warnings and logs