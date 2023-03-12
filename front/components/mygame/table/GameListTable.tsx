import * as React from 'react'
import Image from 'next/image';
import { AiOutlineMore } from "react-icons/ai"
import { useOnClickOutside } from 'usehooks-ts'
import { dateToString } from "@utils/dateUtil"
import MessageCard from '@components/common/cards/messageCard/MessageCard';
import Dropdown from '@components/common/dropdown/Dropdown';


type Game = {
    title: string
    image?: string
    date: Date | null
}

type TableProps = {
    gameList: Game[] | null
}

const GameListTable: React.FC<TableProps> = (props) => {


    return (
        <div className="flex flex-col overflow-visible">
            <div className="sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                            <tr>
                                <th scope="col" className="px-6 py-4"></th>
                                <th scope="col" className="px-6 py-4"></th>
                                <th scope="col" className="px-6 py-4">作品名</th>
                                <th scope="col" className="px-6 py-4">日付</th>
                                <th scope="col" className="px-6 py-4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.gameList && props.gameList.map((element, index) => (
                                <TableRow
                                    index={index + 1}
                                    image={element.image}
                                    title={element.title}
                                    date={element.date} />
                            ))}
                        </tbody>
                    </table>
                    {!props.gameList &&
                        <MessageCard
                            className="mx-auto my-12 w-3/5"
                            message="まだ遊んだ作品がありません" />
                    }

                </div>
            </div>
        </div>
    )
}

export default GameListTable

type TableRowProps = {
    index: number
    image?: string
    title: string
    date: Date | null
}
const TableRow: React.FC<TableRowProps> = ({ index, image, title, date }) => {
    return (
        <tr className="border-b dark:border-neutral-500">
            <td className="whitespace-nowrap px-6 py-4 font-medium">{index}</td>
            <td className="whitespace-nowrap px-6 py-4 font-medium">
                {image && <Image layout='fill' src={image} alt={image} />}
            </td>
            <td className="whitespace-nowrap px-6 py-4">{title}</td>
            <td className="whitespace-nowrap px-6 py-4">{dateToString(date)}</td>
            <td className="whitespace-nowrap px-6 py-4"><OptionsMenuDropdown id={String(index)} /></td>
        </tr>
    )
}

type OptionsMenuDropdownProps = {
    id: string
}
const OptionsMenuDropdown: React.FC<OptionsMenuDropdownProps> = ({ id }) => {
    const ref = React.useRef(null)
    const [isVisible, setIsVisible] = React.useState<boolean>(false)
    const menu = (url: string) => {
        return [{ text: "詳細", url: `detail/${url}` }]
    }

    const handleMenuClick = () => {
        setIsVisible(!isVisible);
    };
    const cloneDoropDonw = () => {
        setIsVisible(false)
    }
    useOnClickOutside(ref, cloneDoropDonw)

    return (
        <div ref={ref} className="relative">
            <AiOutlineMore
                onClick={handleMenuClick}
                id="options-menu"
            />

            {isVisible && (
                <Dropdown id={id} isVisible={isVisible} menu={menu(id)} />
            )}
        </div>
    )
}