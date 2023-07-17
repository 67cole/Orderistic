import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function QuantityOption({ customisation, maxOptionNum }) {
  const [chosenOptions, setChosenOptions] = React.useState({});
  const [quantities, setQuantities] = React.useState([]);
  const [chosenOptionNum, setChosenOptionNum] = React.useState(0);

  React.useEffect(() => {
    let chosenOptionDict = {};
    let tempQuantities = [];
    for (let i = 0; i < customisation.options.length; i++) {
      let tempDict = {};
      tempDict.quantity = 0;
      tempDict.option = customisation.options[i];
      chosenOptionDict[i] = tempDict;
      tempQuantities.push(0);
    }
    setQuantities(tempQuantities);
    setChosenOptions(chosenOptionDict);
  }, [customisation])

  function addQuantity(index) {
    let tempOptions = {...chosenOptions};
    tempOptions[index].quantity += 1;
    setChosenOptionNum(chosenOptionNum + 1);
    setChosenOptions(tempOptions);
    
    let tempQuantities = [...quantities];
    tempQuantities[index] += 1;
    setQuantities(tempQuantities);
  }
  function subtractQuantity(index) {
    let tempOptions = {...chosenOptions};
    tempOptions[index].quantity -= 1;
    setChosenOptionNum(chosenOptionNum - 1);
    setChosenOptions(tempOptions);

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
      {customisation.options.map((element, index) => (
        <div key={index} style={{borderBottom: "1px solid #dfdfdf", padding: "20px 10px 20px 5px", display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <span>{element}</span>
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
            <Button variant="light" style={buttonStyle} onClick={() => addQuantity(index)} disabled={chosenOptionNum === maxOptionNum}>+</Button>
          </ButtonGroup>
        </div>
      ))}
    </>
  )
}

export default QuantityOption;