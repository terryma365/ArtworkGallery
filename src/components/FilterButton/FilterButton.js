import React from "react";
import './FilterButton.css'

const FilterButton = (props) => {
  const { name, id } = props.category
  // const [isActive, setIsActive] = useState(false)

  const onCheckBoxChange = () => {
    props.setCurrentCategories(id)
    // setIsActive(!isActive)
  }

  return (
    <>
      <div className="category-item">
        <div className="btn-group-toggle" data-toggle="buttons">
          <label className="btn btn-secondary active">
            <input type="checkbox" onChange={onCheckBoxChange} />{name.toUpperCase()}
            {/* {
              isActive ? <button>X</button> : null
            } */}
          </label>
        </div>
      </div>
    </>
  )
}

export default FilterButton