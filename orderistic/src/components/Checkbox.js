import React from "react";

function Checkbox({ customisation, list, setList, custList, handleCustList }) {
  const subheadingStyle = {
    fontSize: "13px",
    color: "grey",
  };
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
    let tempChosenNum = 0;
    if (checkBool === true) {
      tempChosenNum = chosenNum + 1;
      setChosenNum(chosenNum + 1);
      tempChecked[index] = true; 
      let newCustomisations = [...list, options[index]];
      setList(newCustomisations);

      if (tempChosenNum === 1) {
        let tempCustList = [...custList, customisation];
        handleCustList(tempCustList);
      }
    }
    else {
      tempChosenNum = chosenNum - 1;
      setChosenNum(chosenNum - 1);
      tempChecked[index] = false;
      let newCustomisations = [...list];
      for (let i = 0; i < newCustomisations.length; i++) {
        if (newCustomisations[i].id === options[index].id) {
          newCustomisations.splice(i, 1);
        }
      }
      setList(newCustomisations);
    }
    setChecked(tempChecked);

    if (tempChosenNum === 0) {
      let tempCustList = [...custList];
      for (let i = 0; i < tempCustList.length; i++) {
        if (tempCustList[i].id === customisation.id) {
          tempCustList.splice(i, 1);
        }
      }
      handleCustList(tempCustList);
    }
  }
  return(
    <>
      <div style={subheadingStyle}>
        Choose up to {customisation.optionNum}{" "}
        {customisation.optionNum === 1 ? (
          <>item</>
        ) : (
          <>items</>
        )}
      </div>
      {customisation.options.map((element, index) => (
        <div key={index} style={{borderBottom: "1px solid #dfdfdf"}}>
          <label htmlFor={element.id} name={customisation.name} style={{ width:"93%", paddingBottom: "10px", paddingTop: "10px", paddingLeft: "1px", fontSize: "14px" }}>{element.option}</label>
          <input type="checkbox" id={element.id} name={customisation.name} onClick={e => handleClick(e.target.checked, index)} disabled={(!checked[index] && chosenNum === customisation.optionNum)} style={{ accentColor: "black", verticalAlign: "middle", width: "17px", height: "17px"}}/>
        </div>
      ))}
    </>
  )
}

export default Checkbox;