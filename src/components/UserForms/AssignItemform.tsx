import { useState } from "react";
import { Condition } from "../../shared/Condition";
import SelectItemType from "../Admin/SelectItemType";
import { CatalogItemList } from "../CatalogItems/CatalogItemList";

const AssignItemForm = () => {
    const [selectedItemType, setSelectedItemType] = useState('');
    const handleTypeSelected = (typeValue: string) => {
        setSelectedItemType(typeValue)
    }
    return (
        <div>
            <div className="pb-4 flex justify-between">
                <h2 className="text-lg font-medium text-gray-900">Add to your Inventory</h2>
            </div>
            <fieldset>
                <section className="mb-5">
            <SelectItemType onTypeSelected={handleTypeSelected} />
                </section>
            </fieldset>
            <Condition when={selectedItemType} is="lego">
                <div className="relative">
                    <CatalogItemList type="lego" />
                </div>
            </Condition>
            <Condition when={selectedItemType} is="videogame">
                <div className="relative">
                    <CatalogItemList type="videogame" />
                </div>
            </Condition>
        </div>
    )
}

export default AssignItemForm;