(function(){
    window.onerror = function(message,source,lineno,colno,error){
        //this is for logging errors, error received as an object
        sendError({
            type:"JS_Error",
            message,
            source,
            lineno,
            colno,
            stack:error?.stack || "No stack trace",
        });
    };

})();

//creating an iifie because we want to start reading errors as soon as we enter our web page
//trying to majorly read three types of errors and warnings:
// 1.errors
// 2.