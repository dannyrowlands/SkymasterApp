export const handleCellClick = (id, modelName, field, item, e) => {
    e.stopPropagation()
    console.log('CLICKED ' + modelName + ' :: ID-' + id + ' FIELD-' + field + ' VALUE-' + item)

}

export const handleClick = (id, modelName, e) => {
    e.stopPropagation()
    console.log('CLICKED ' + modelName + ' :: ',id)
}

export const toggleEdit = (isEditable, setIsEditable) => {
    setIsEditable(!isEditable)
    console.log('isEditable::',isEditable)
}

