import React from "react";

function Checkbox({ customisation, maxOptionNum }) {
  const [chosenNum, setChosenNum] = React.useState(0);
  const [checked, setChecked] = React.useState([]);
  const [options, setOptions] = React.useState([]);

  React.useEffect(() => {
    let tempList = [];
    let newChecked = [];
    for (let i = 0; i < customisation.options.length; i++) {
      newChecked.push(false);
      tempList.push(customisation.options[i]);
    }
    setOptions(tempList);
    setChecked(newChecked);
  }, [customisation])
  function handleClick(checkBool, index) {
    let tempChecked = [...checked];
    console.log(tempChecked);
    if (checkBool === true) {
      setChosenNum(chosenNum + 1);
      tempChecked[index] = true; 
    }
    else {
      setChosenNum(chosenNum - 1);
      tempChecked[index] = false; 
    }
    setChecked(tempChecked);
  }
  return(
    <>
      {customisation.options.map((element, index) => (
        <div key={index} style={{borderBottom: "1px solid #dfdfdf"}}>
          <label htmlFor={index} name={customisation.name} style={{ width:"93%", paddingBottom: "10px", paddingTop: "10px", paddingLeft: "1px", fontSize: "14px" }}>{element}</label>
          <input type="checkbox" id={index} name={customisation.name} onClick={e => handleClick(e.target.checked, index)} disabled={(!checked[index] && chosenNum === maxOptionNum)} style={{ accentColor: "black", verticalAlign: "middle", width: "17px", height: "17px"}}/>
        </div>
      ))}
    </>
  )
}

export default Checkbox;