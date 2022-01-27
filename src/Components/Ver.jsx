import React from 'react';

function Ver({is}) {
    const how= is;
    // prompt(is)
    if(how===true){
        return <div>Verificado</div>
    }else{
        return <div>No verificado</div>;
    }
  
}

export default Ver;
