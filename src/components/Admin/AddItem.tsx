import { CollectionItemForm } from "./CollectionItemForm"

export const AddItem = () => {
    const onItemAdded = () => {
        console.dir("Item added!");
    }
    return (
        <CollectionItemForm onItemAdded={onItemAdded} />
    )
}