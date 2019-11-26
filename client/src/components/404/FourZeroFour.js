import React from 'react';
import {Typography, Button} from '@material-ui/core';
import {withRouter} from 'react-router-dom';
import broken from '../../assets/broken.png';

const FourZeroFour = ({history}) => {
    return (
        <div style={{width:'100vw',height:'100vh',textAlign:'center',margin:'auto',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
            <Typography style={{fontSize:22,fontWeight:'bold',padding:'8% 0'}}>Oops! Something Broke</Typography>
            <img alt="Something broke!" style={{width:'30%',height:'auto'}} src={broken}/>
            <Button onClick={()=>history.push('/')} variant="text" style={{color:'blue',marginTop:'5%',textTransform:'none'}}>
                Take me back
            </Button>
        </div>
    );
}

export default withRouter(FourZeroFour);