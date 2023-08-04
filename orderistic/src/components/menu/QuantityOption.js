import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
// Component for quantity option in food information page
function QuantityOption({ customisation, list, setList, custList, handleCustList }) {
  const subheadingStyle = {
    fontSize: "13px",
    color: "grey",
  };
  const [quantities, setQuantities] = React.useState([]);
  const [chosenOptionNum, setChosenOptionNum] = React.useState(0);
  // Initialising the quantities list to be all zeroes.
  React.useEffect(() => {
    let tempQuantities = [];
    for (let i = 0; i < customisation.options.length; i++) {
      tempQuantities.push(0);
    }
    setQuantities(tempQuantities);
  }, [customisation])
  function addQuantity(index) {
    let newCustomisations = [...list, customisation.options[index]]
    setList(newCustomisations);
    let tempChosenNum = chosenOptionNum + 1;
    setChosenOptionNum(chosenOptionNum + 1);
    let tempQuantities = [...quantities];
    tempQuantities[index] += 1;
    setQuantities(tempQuantities);
    // Adding to the list of customisations that have been filled in
    if (tempChosenNum === customisation.optionNum) {
      let tempCustList = [...custList, customisation];
      handleCustList(tempCustList);
    }
  }
  function subtractQuantity(index) {
    // Removes customisation from list of customisations that have been filled in
    if (chosenOptionNum === customisation.optionNum) {
      let tempCustList = [...custList];
      for (let i = 0; i < tempCustList.length; i++) {
        if (tempCustList[i].id === customisation.id) {
          tempCustList.splice(i, 1);
        }
      }
      handleCustList(tempCustList);
    }
    
    let newCustomisations = [...list]
    for (let i = 0; i < newCustomisations.length; i++) {
      if (newCustomisations[i].id === customisation.options[index].id) {
        newCustomisations.splice(i, 1);
      }
    }
    setList(newCustomisations);

    setChosenOptionNum(chosenOptionNum - 1);
    let tempQuantities = [...quantities];
    tempQuantities[index] -= 1;
    setQuantities(tempQuantities);
  }
  const buttonStyle = {
    backgroundColor: "#eeeeee",
    borderRadius: "20px",
    borderColor: "white",
    fontWeight: "bold",
    boxShadow: "none"
  }
  return(
    <>
      <div style={subheadingStyle}>
        Choose {customisation.optionNum} items
      </div>
      {customisation.options.map((element, index) => (
        <div key={index} style={{borderBottom: "1px solid #dfdfdf", padding: "10px 10px 10px 1px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <span style={{ fontSize: "14px"}}>{element.option}</span>
          <ButtonGroup >
            {quantities[index] > 0
              ? <>
                  <Button variant="light" style={{...buttonStyle, width: "37.31px"}} onClick={() => subtractQuantity(index)}>-</Button>
                  <div style={{ margin: "auto", paddingLeft: "10px", paddingRight: "10px" }}>
                    {quantities[index]}
                  </div>
                </> 
              : <>
                </>
            }
            <Button variant="light" style={buttonStyle} onClick={() => addQuantity(index)} disabled={chosenOptionNum === customisation.optionNum}>+</Button>
          </ButtonGroup>
        </div>
      ))}
    </>
  )
}

export default QuantityOption;