import * as BoxIcons from "react-icons/bi";
import Icon from "./Icon";

type IconName = keyof typeof BoxIcons;

type EmptyStateProps = {
    icon: IconName;
    label: string;
}

export const EmptyState = ({icon, label}: EmptyStateProps) => {
    return (
        <div className="flex flex-col justify-center items-center h-80">
            <Icon icon={icon} className="h-8 w-8 text-gray-600" />
            <p className="font-medium text-gray-600">{label}</p>
        </div>
    )
}