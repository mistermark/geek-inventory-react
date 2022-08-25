type CollectionItemDetailsListProps = {
    children: React.ReactElement
}

export const CollectionItemDetailsList = ({children}: CollectionItemDetailsListProps) => {
  return (
    <div className="border-t border-gray-200">
      <dl>
        {children}
      </dl>
    </div>
  );
};
