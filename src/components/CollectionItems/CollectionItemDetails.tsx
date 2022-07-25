import { CollectionItem } from "../../types";
import { CollectionItemDetailsLego } from "./CollectionItemDetailsLego";
import { CollectionItemDetailsNendoroid } from "./CollectionItemDetailsNendoroid";
import { CollectionItemDetailsVideoGame } from "./CollectionItemDetailsVideoGame";

type CollectionItemDetailsProps = {
    selectedItem: CollectionItem
}

export const CollectionItemDetails = ({selectedItem}: CollectionItemDetailsProps) => {
    return (
        <>
            {selectedItem.type === 'lego' ?
            <CollectionItemDetailsLego item={selectedItem} />
            : null}
            {selectedItem.type === 'nendoroid' ?
            <CollectionItemDetailsNendoroid item={selectedItem} />
            : null}
            {selectedItem.type === 'videogame' ?
            <CollectionItemDetailsVideoGame item={selectedItem} />
            : null}
        </>
    )
}