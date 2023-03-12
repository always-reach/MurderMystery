import * as React from 'react'

type Menu = {
    text: string
    url: string
}
type DropdownProps = {
    id: string
    isVisible: boolean
    menu: Menu[]
}

const Dropdown: React.FC<DropdownProps> = (props) => {

    const className = `${!props.isVisible ? "hidden" : ""} z-10 absolute right-0 w-56 mt-2  bg-white rounded-md shadow-lg`

    return (
        <div id={`dropdown_${props.id}`} className={className}>
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                {props.menu.map((element, index) => (
                    <li key={index}>
                        <a href={element.url} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{element.text}</a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Dropdown


