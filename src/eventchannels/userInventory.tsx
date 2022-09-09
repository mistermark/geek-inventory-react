import { eventbus } from '../shared/EventBus';

const userInventoryEventChannel = eventbus<{
    onInventoryUpdated: () => void,
    onInventoryItemRemoved: (payload?: any) => void
}>()

export default userInventoryEventChannel;