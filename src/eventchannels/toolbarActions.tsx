import { eventbus } from '../shared/EventBus';

const toolbarActionsEventChannel = eventbus<{
    filterTypeUpdated: (payload?: any) => void
}>()

export default toolbarActionsEventChannel;