import { useState } from "react";
import { CollectionItem } from "../types";
import { stateIcons, truncate } from "../utils";
import Icon from "./Icon";

type ListTableProps = {
    headers: string[];
    items: any[] | undefined;
    selected: Function;
    properties: string[];
}

export const ListTable = ({headers, items, properties, selected}: ListTableProps) => {
    const [selectedListItem, setSelectedListItem] = useState<CollectionItem>();
    const setSelectedItem = (selectedItem: CollectionItem) => {
        setSelectedListItem(selectedItem);
        selected(selectedItem);
    }
    return (
        <table className="max-w-full divide-y divide-gray-200 w-full">
            <thead>
                <tr className="text-sm text-gray-400 text-left">
                    {headers.map((header, index) => (
                        <th className={index === 0 ? 'p-2 w-1/12' : 'p-2'}>{ header }</th>
                    ))}
                    <th className='w-1/12'></th>
                </tr>
            </thead>
            <tbody>
            {items !== undefined ? (
                items.map((item: any) => (
                <tr key={item.id} onClick={() => setSelectedItem(item)} 
                    className={`cursor-pointer select-none text-sm text-gray-900 hover:bg-emerald-200 ${selectedListItem === item ? 'bg-emerald-100' : 'odd:bg-white even:bg-gray-50'}`}>
                    {properties.map((property: string, index: number) => (
                        
                        <td className="p-2">
                            {index === 1 || index === 2 ?
                                truncate(item[property], 28)
                                : null}
                            {index === 3 ?
                                <Icon icon={stateIcons[item.state]} className="w-5 h-5" title={item.state.charAt(0).toUpperCase() + item.state.slice(1)} />
                                : null}
                            {index === 4 || index === 0 ?
                                item[property]
                                : null}
                        </td>
                    ))}
                    <td className='flex justify-center items-center'>
                        <Icon icon="BiRightArrowAlt" className="w-4 h-4 ml-1" />
                    </td>
                </tr>
            ))
            ) : (
                <tr>
                    <td colSpan={5}>No items in list.</td>
                </tr>
            )}
            </tbody>
        </table>
    )
}