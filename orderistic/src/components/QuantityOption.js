import React from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';

function QuantityOption({ customisation, list, setList }) {
  const subheadingStyle = {
    fontSize: "13px",
    color: "grey",
  };
  const [chosenOptions, setChosenOptions] = React.useState([]);
  const [quantities, setQuantities] = React.useState([]);
  const [chosenOptionNum, setChosenOptionNum] = React.useState(0);

  React.useEffect(() => {
    let chosenOptionList = [];
    let tempQuantities = [];
    for (let i = 0; i < customisation.options.length; i++) {
      chosenOptionList.push(customisation.options[i]);
      tempQuantities.push(0);
    }
    setQuantities(tempQuantities);
    setChosenOptions(chosenOptionList);
  }, [customisation])

  function addQuantity(index) {
    let newCustomisations = [...list, chosenOptions[index]]
    setList(newCustomisations);
    setChosenOptionNum(chosenOptionNum + 1);
    let tempQuantities = [...quantities];
    tempQuantities[index] += 1;
    setQuantities(tempQuantities);
  }
  function subtractQuantity(index) {
    let newCustomisations = [...list]
    for (let i = 0; i < newCustomisations.length; i++) {
      if (newCustomisations[i].id === chosenOptions[index].id) {
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