import React from 'react';
import './App.css';
import ScreeningViewer from './lib/ScreeningViewer';


import _74 from './lib/datasample/74_saccade.json';
import _80 from './lib/datasample/80_pursuit.json';
import _53 from './lib/datasample/53_antisaccade.json';

function App() {

  const dataArr = React.useMemo(()=>{
    let da =[_74,_80,_53];
    for(let i = 0 ; i<da.length; i++){
      let newraw= da[i];
      if(newraw){
        // console.log("newraw",newraw);
        let gazeData = newraw.gazeData;
  
        let gazeProperty =  newraw.gazeProperty;
        let newgazeData=[];
        for(let i = 0 ; i <gazeData.length; i++){
  
          let data = gazeData[i];
          let newdata=[];
          // console.log(data);
          for(let j = 0 ; j <data.length; j++){
            let oneEye = data[j];
            // console.log("oneEye",oneEye);
            let newEye ={};
            for(let k = 0; k<gazeProperty.length; k++){
                newEye[gazeProperty[k]] = oneEye[k];
            }
            // console.log(newEye);
            newdata.push(newEye);
          }
          newgazeData.push(newdata);
        }
        
        newraw.taskArr = newgazeData;
        // console.log("데이터",newraw);
      }
    }

    // console.log(da);
    return da;
  },[]);

  const [showViewer,set_showViewer] = React.useState(true);

  return (
    <div className="App">

      샘플데이터는 74_saccade,80_pursuit,53_antisaccade 을 넣어봄
      <button onClick={()=>set_showViewer(true)}>open</button>
      {showViewer===true&&
        <ScreeningViewer dataArr={dataArr} 
          onClose={()=>set_showViewer(false)}
        />      
      }

     
    </div>);

}

export default App;
