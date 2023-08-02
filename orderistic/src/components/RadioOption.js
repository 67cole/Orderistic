import React from "react";

function RadioOption({ customisation, list, setList, custList, handleCustList }) {
  const subheadingStyle = {
    fontSize: "13px",
    color: "grey",
  };
  const [oneItem, setOneItem] = React.useState({});
  function handleClick(element) {
    let tempList = [...list];
    if (oneItem) {
      for (let i = 0; i < tempList.length; i++) {
        if (tempList[i].id === oneItem.id) {
          tempList.splice(i, 1);
        }
      }
    }
    tempList.push(element);
    setList(tempList);
    setOneItem(element);
    
    let tempCustList = [...custList];
    let included = false;
    for (let cust of tempCustList) {
      if (cust.id === customisation.id) {
        included = true;
      }
    }
    if (!included) {
      tempCustList = [...custList, customisation];
      handleCustList(tempCustList)
    }
    
  }
  return(
    <>
    <div style={subheadingStyle}>Choose 1 item</div>
      <div>
        {customisation.options.map((element, index) => (
          <div
            key={index}
            style={{ borderBottom: "1px solid #dfdfdf" }}
          >
            <label
              htmlFor={element.id}
              name={customisation.name}
              style={{
                width: "93%",
                paddingBottom: "10px",
                paddingTop: "10px",
                paddingLeft: "1px",
                fontSize: "14px",
              }}
            >
              {element.option}
            </label>
            <input
              type="radio"
              id={element.id}
              name={customisation.name}
              onChange={() => handleClick(element)}
              style={{
                accentColor: "black",
                verticalAlign: "middle",
                width: "17px",
                height: "17px",
              }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default RadioOption;