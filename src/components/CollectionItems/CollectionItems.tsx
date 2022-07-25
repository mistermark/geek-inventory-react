import { Collection } from "../../types"
import { CollectionItemLego } from "./CollectionItemLego"
import { CollectionItemNendoroid } from "./CollectionItemNendoroid"
import { CollectionItemVideoGame } from "./CollectionItemVideoGame"

type CollectionItemsProps = {
    collection: Collection;
    selected: Function;
}

export const CollectionItems = ({collection, selected}: CollectionItemsProps) => {
    return (
        <>
            {collection.type === 'lego' ?
            <CollectionItemLego items={collection.items.filter(item => item.type === 'lego')} selected={selected} />
            : null}
            {collection.type === 'nendoroid' ?
            <CollectionItemNendoroid items={collection.items.filter(item => item.type === 'nendoroid')} selected={selected} />
            : null}
            {collection.type === 'videogame' ?
            <CollectionItemVideoGame items={collection.items.filter(item => item.type === 'videogame')} selected={selected} />
            : null}
        </>
    )
}