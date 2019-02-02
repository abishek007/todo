import React from "react"
import "./styles.css"

const renderInput = ({input, meta, placeholder, onKeyPress}) => {
	return (
  <div className={
		[
			meta.error && meta.touched ? "error-field" : "",
			meta.active ? "actived-feild" : ""
		].join("")
		}
	>
	  <input
			placeholder={placeholder}
			onKeyPress={onKeyPress}
			{...input}
		/>
	  {meta.touched && meta.error && <p className="error">{meta.error}</p>}
	</div>
	)
}

export default renderInput