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



})();

//creating an iifie because we want to start reading errors as soon as we enter our web page
//trying to majorly read three types of errors and warnings:
// 1.errors
// 2.