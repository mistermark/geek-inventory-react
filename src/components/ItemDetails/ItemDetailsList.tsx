type ItemDetailsListProps = {
    children: React.ReactElement
}

export const ItemDetailsList = ({children}: ItemDetailsListProps) => {
  return (
    <div className="border-t border-gray-200">
      <dl>
        {children}
      </dl>
    </div>
  );
};
