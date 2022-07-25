import { CollectionItem } from "../../types"
import { CollectionItemLego } from "./CollectionItemLego"
import { CollectionItemNendoroid } from "./CollectionItemNendoroid"
import { CollectionItemVideoGame } from "./CollectionItemVideoGame"

type CollectionItemsProps = {
    collection: CollectionItem[];
    selected: Function;
    type: string;
}

export const CollectionItems = ({collection, selected, type}: CollectionItemsProps) => {
    return (
        <>
            {type === 'lego' ?
            <CollectionItemLego items={collection.filter(item => item.type === 'lego')} selected={selected} />
            : null}
            {type === 'nendoroid' ?
            <CollectionItemNendoroid items={collection.filter(item => item.type === 'nendoroid')} selected={selected} />
            : null}
            {type === 'videogame' ?
            <CollectionItemVideoGame items={collection.filter(item => item.type === 'videogame')} selected={selected} />
            : null}
        </>
    )
}